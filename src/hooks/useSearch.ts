// NOTE: Search excludes archived posts to keep results aligned with public blog listings.

import Fuse, { type FuseResultMatch, type IFuseOptions } from "fuse.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Post } from "types/articles";
import type { SearchCache, SearchState } from "types/search";

// --- Constants ---

const CACHE_DURATION = 5 * 60 * 1000;
const MAX_CACHE_SIZE = 50;
const MAX_HISTORY_ITEMS = 10;
const SEARCH_HISTORY_KEY = "search_history";
const DEBOUNCE_MS = 250;
const HISTORY_COMMIT_MS = 1000;
const SCORE_THRESHOLD = 0.6;

// --- Fuse Configuration ---
// NOTE: `body` is intentionally excluded. Fuzzy-matching full article text
// with ignoreLocation is O(n*m) per post and dominates search time. Title,
// description, tags, and author cover the vast majority of search intents.

const FUSE_CONFIG: IFuseOptions<Post> = {
	keys: [
		{ name: "data.title", weight: 2.0 },
		{ name: "data.description", weight: 1.5 },
		{ name: "data.tags", weight: 1.8 },
		{ name: "data.authorName", weight: 1.2 },
		{
			name: "data.pubDate",
			weight: 1.0,
			getFn: (obj: Post) => {
				const date = new Date(obj.data.pubDate);
				const iso = date.toISOString().slice(0, 10);
				const long = date.toLocaleString("en-US", {
					month: "long",
					year: "numeric",
				});
				return `${iso} ${long}`;
			},
		},
	],
	threshold: 0.4,
	includeScore: true,
	includeMatches: true,
	useExtendedSearch: true,
	ignoreLocation: true,
	fieldNormWeight: 1.5,
	shouldSort: true,
};

// --- Search Intent Detection ---

const INTENT_PATTERNS: Record<string, RegExp> = {
	date: /^(date:|on:)?\s*(\d{4}(-\d{2})?(-\d{2})?|yesterday|today|last\s+week|last\s+month|this\s+month)/i,
	tag: /^(tag:|tags:|#)\s*\w+/i,
	author: /^(author:|by:)\s*\w+/i,
};

const PREFIX_PATTERN = /^(date:|tag:|tags:|#|author:|by:|on:)\s*/;

type SearchIntentType = "date" | "tag" | "author" | "general";

const detectSearchIntent = (query: string): SearchIntentType => {
	for (const [type, pattern] of Object.entries(INTENT_PATTERNS)) {
		if (pattern.test(query)) return type as SearchIntentType;
	}
	return "general";
};

const stripIntentPrefix = (query: string): string =>
	query.replace(PREFIX_PATTERN, "");

// --- Search Syntax Processing ---

const processSearchTerms = (query: string): string =>
	query
		.split(" ")
		.filter((term) => term.length > 0)
		.map((term) => {
			if (term.startsWith('"') && term.endsWith('"') && term.length > 2)
				return `=${term.slice(1, -1)}`;
			if (term.startsWith("-") && term.length > 1) return `!${term.slice(1)}`;
			if (term.startsWith("+") && term.length > 1) return `'${term.slice(1)}`;
			return term;
		})
		.join(" ");

// --- Relevance Scoring ---

const calculateRelevance = (
	fuseScore: number,
	pubDate: Date,
	intentType: SearchIntentType,
): number => {
	const baseScore = 1 - fuseScore;

	// Linear decay: 0.15 for brand-new posts → 0 at 5 years old
	const ageInDays = (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24);
	const freshnessBoost = Math.max(0, 0.15 * (1 - ageInDays / (5 * 365)));

	const intentBonus = intentType !== "general" ? 0.1 : 0;

	return baseScore + freshnessBoost + intentBonus;
};

// --- Cache Management (module-level, survives re-renders) ---

const searchCache = new Map<string, SearchCache>();

const getFromCache = (query: string): SearchCache | null => {
	const cached = searchCache.get(query);
	if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
		return cached;
	}
	if (cached) searchCache.delete(query);
	return null;
};

const addToCache = (
	query: string,
	searchResults: Post[],
	stats: SearchState["searchStats"],
): void => {
	// Delete first to update insertion order (LRU behavior)
	searchCache.delete(query);
	if (searchCache.size >= MAX_CACHE_SIZE) {
		const oldestKey = searchCache.keys().next().value;
		if (oldestKey !== undefined) searchCache.delete(oldestKey);
	}
	searchCache.set(query, {
		results: searchResults,
		stats,
		timestamp: Date.now(),
	});
};

// --- localStorage Helpers (with shape validation) ---

const loadSearchHistory = (): string[] => {
	try {
		const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
		if (!raw) return [];
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter((item): item is string => typeof item === "string")
			.slice(0, MAX_HISTORY_ITEMS);
	} catch {
		return [];
	}
};

const saveSearchHistory = (history: string[]): void => {
	try {
		localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
	} catch {
		// localStorage might be full or disabled
	}
};

// --- Extract matched fields from Fuse results ---

const extractMatchedFields = (
	matches: readonly FuseResultMatch[] | undefined,
): string[] => {
	if (!matches) return [];
	const fields = new Set<string>();
	for (const match of matches) {
		if (match.key) fields.add(match.key);
	}
	return Array.from(fields);
};

// --- Hook ---

const useSearch = (posts: Post[]): SearchState => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Post[]>([]);
	const [searchStats, setSearchStats] = useState<SearchState["searchStats"]>({
		totalResults: 0,
		searchTime: 0,
		relevanceScore: 0,
		matchedFields: [],
	});
	const [searchHistory, setSearchHistory] =
		useState<string[]>(loadSearchHistory);
	const historyTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	// Safety net: filter drafts/archived even if caller already did
	const filteredPosts = useMemo(
		() => posts.filter((post) => !post.data.draft && !post.data.archived),
		[posts],
	);

	const fuse = useMemo(
		() => new Fuse(filteredPosts, FUSE_CONFIG),
		[filteredPosts],
	);

	const commitToHistory = useCallback((searchQuery: string) => {
		if (!searchQuery.trim()) return;
		setSearchHistory((prev) => {
			const updated = [
				searchQuery,
				...prev.filter((q) => q !== searchQuery),
			].slice(0, MAX_HISTORY_ITEMS);
			saveSearchHistory(updated);
			return updated;
		});
	}, []);

	const clearHistory = useCallback(() => {
		setSearchHistory([]);
		saveSearchHistory([]);
	}, []);

	const performSearch = useCallback(
		(searchQuery: string) => {
			if (!searchQuery.trim()) {
				setResults([]);
				setSearchStats({
					totalResults: 0,
					searchTime: 0,
					relevanceScore: 0,
					matchedFields: [],
				});
				return;
			}

			const cached = getFromCache(searchQuery);
			if (cached) {
				setResults(cached.results);
				setSearchStats(cached.stats);
				return;
			}

			const startTime = performance.now();
			const intentType = detectSearchIntent(searchQuery);

			let processedQuery = searchQuery;
			if (intentType !== "general") {
				processedQuery = stripIntentPrefix(searchQuery);
			}
			processedQuery = processSearchTerms(processedQuery);

			const fuseResults = fuse.search(processedQuery);

			const scoredResults = fuseResults
				.filter((r) => r.score != null && r.score < SCORE_THRESHOLD)
				.map((r) => ({
					post: r.item,
					relevance: calculateRelevance(
						r.score ?? 0,
						r.item.data.pubDate,
						intentType,
					),
					matchedFields: extractMatchedFields(r.matches),
				}))
				.sort((a, b) => b.relevance - a.relevance);

			const rankedPosts = scoredResults.map((r) => r.post);
			const allMatchedFields = Array.from(
				new Set(scoredResults.flatMap((r) => r.matchedFields)),
			);
			const avgRelevance = scoredResults.length
				? scoredResults.reduce((sum, r) => sum + r.relevance, 0) /
					scoredResults.length
				: 0;

			const searchTime = Math.round(performance.now() - startTime);
			const stats: SearchState["searchStats"] = {
				totalResults: rankedPosts.length,
				searchTime,
				relevanceScore: avgRelevance,
				matchedFields: allMatchedFields,
			};

			setResults(rankedPosts);
			setSearchStats(stats);
			addToCache(searchQuery, rankedPosts, stats);
		},
		[fuse],
	);

	// Debounced search execution
	useEffect(() => {
		const id = setTimeout(() => performSearch(query), DEBOUNCE_MS);
		return () => clearTimeout(id);
	}, [query, performSearch]);

	// Delayed history commit: only saves after user stops typing for 1s
	useEffect(() => {
		clearTimeout(historyTimerRef.current);
		if (query.trim()) {
			historyTimerRef.current = setTimeout(
				() => commitToHistory(query),
				HISTORY_COMMIT_MS,
			);
		}
		return () => clearTimeout(historyTimerRef.current);
	}, [query, commitToHistory]);

	return {
		query,
		setQuery,
		results,
		searchStats,
		searchHistory,
		clearHistory,
	};
};

export default useSearch;
