// NOTE: Search excludes archived posts to keep results aligned with public blog listings.
import { useState, useEffect, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import type { Post } from "types/articles";
import type { SearchState, SearchCache } from "types/search";

const searchCache = new Map<string, SearchCache>();

const CACHE_DURATION = 5 * 60 * 1000;
const MAX_HISTORY_ITEMS = 10;
const SEARCH_HISTORY_KEY = "search_history";

const loadSearchHistory = (): string[] => {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

const saveSearchHistory = (history: string[]) => {
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch {}
};

const calculateRelevance = (
  result: { score?: number; item: Post },
  searchIntent: ReturnType<typeof detectSearchIntent>,
) => {
  const baseScore = 1 - (result.score || 0);
  const intentBonus = searchIntent.type !== "general" ? 0.2 : 0;
  const freshness =
    (Date.now() - new Date(result.item.data.pubDate).getTime()) /
    (1000 * 60 * 60 * 24 * 365);
  const freshnessBoost = Math.min(0.2, 1 / (1 + freshness));

  return baseScore + intentBonus + freshnessBoost;
};

const UNIFIED_SEARCH_CONFIG = {
  keys: [
    {
      name: "data.title",
      weight: 2.0,
    },
    {
      name: "data.description",
      weight: 1.5,
    },
    {
      name: "data.tags",
      weight: 1.8,
    },
    {
      name: "data.authorName",
      weight: 1.2,
    },
    {
      name: "body",
      weight: 1.0,
    },
    {
      name: "data.pubDate",
      weight: 1.5,
      getFn: (obj: Post) => {
        const date = new Date(obj.data.pubDate);
        return (
          date.toLocaleDateString() +
          " " +
          date.toLocaleString("default", { month: "long", year: "numeric" })
        );
      },
    },
  ],
  threshold: 0.4,
  includeScore: true,
  useExtendedSearch: true,
  ignoreLocation: true,
  fieldNormWeight: 1.5,
  shouldSort: true,
};

const detectSearchIntent = (query: string) => {
  const patterns = {
    date: /^(date:|on:)?\s*(\d{4}(-\d{2})?(-\d{2})?|yesterday|today|last\s+week|last\s+month|this\s+month)/i,
    tag: /^(tag:|tags:|#)\s*\w+/i,
    author: /^(author:|by:)\s*\w+/i,
  };

  if (patterns.date.test(query)) {
    return { type: "date", weight: 2.0 };
  }
  if (patterns.tag.test(query)) {
    return { type: "tag", weight: 2.0 };
  }
  if (patterns.author.test(query)) {
    return { type: "author", weight: 2.0 };
  }
  return { type: "general", weight: 1.0 };
};

const useSearch = (posts: Post[]): SearchState => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Post[]>([]);
  const [searchStats, setSearchStats] = useState({
    totalResults: 0,
    searchTime: 0,
    relevanceScore: 0,
    matchedFields: [] as string[],
  });
  const [searchHistory, setSearchHistory] = useState<string[]>(() =>
    loadSearchHistory(),
  );

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    saveSearchHistory([]);
  }, []);

  const updateSearchHistory = useCallback((newQuery: string) => {
    if (!newQuery.trim()) return;

    setSearchHistory((prev) => {
      const newHistory = [
        newQuery,
        ...prev.filter((q) => q !== newQuery),
      ].slice(0, MAX_HISTORY_ITEMS);

      saveSearchHistory(newHistory);
      return newHistory;
    });
  }, []);

  const checkCache = useCallback((searchQuery: string) => {
    const cached = searchCache.get(searchQuery);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached;
    }
    return null;
  }, []);

  const updateCache = useCallback(
    (
      searchQuery: string,
      results: Post[],
      stats: SearchState["searchStats"],
    ) => {
      searchCache.set(searchQuery, {
        results,
        stats,
        timestamp: Date.now(),
      });
    },
    [],
  );

  const filteredPosts = useMemo(
    () => posts.filter((post) => !post.data.draft && !post.data.archived),
    [posts],
  );

  const fuse = useMemo(
    () => new Fuse(filteredPosts, UNIFIED_SEARCH_CONFIG),
    [filteredPosts],
  );

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

      const cached = checkCache(searchQuery);
      if (cached) {
        setResults(cached.results);
        setSearchStats(cached.stats);
        return;
      }

      const startTime = performance.now();
      const searchIntent = detectSearchIntent(searchQuery);

      let processedQuery = searchQuery;
      if (searchIntent.type !== "general") {
        processedQuery = searchQuery.replace(
          /^(date:|tag:|tags:|#|author:|by:|on:)\s*/,
          "",
        );
      }

      const terms = processedQuery.split(" ").map((term) => {
        if (term.startsWith('"') && term.endsWith('"')) {
          return `=${term.slice(1, -1)}`;
        }
        if (term.startsWith("-")) {
          return `!${term.slice(1)}`;
        }
        if (term.startsWith("+")) {
          return `'${term.slice(1)}`;
        }
        return term;
      });

      const searchResults = fuse.search(terms.join(" "));

      const enhancedResults = searchResults
        .filter((result) => result.score && result.score < 0.6)
        .map((result) => {
          const relevanceScore = calculateRelevance(result, searchIntent);
          const matchedFields = UNIFIED_SEARCH_CONFIG.keys
            .map((key) => (typeof key === "string" ? key : key.name))
            .filter((key) => {
              const value = key
                .split(".")
                .reduce((obj, k) => obj?.[k], result.item);
              return (
                value &&
                String(value)
                  .toLowerCase()
                  .includes(processedQuery.toLowerCase())
              );
            });

          return {
            ...result.item,
            relevanceScore,
            matchedFields,
          };
        })
        .sort((a, b) => (b as any).relevanceScore - (a as any).relevanceScore);

      const endTime = performance.now();
      const searchTime = endTime - startTime;

      const stats = {
        totalResults: enhancedResults.length,
        searchTime: Math.round(searchTime),
        relevanceScore: enhancedResults.length
          ? enhancedResults.reduce(
              (acc, curr) => acc + (curr as any).relevanceScore,
              0,
            ) / enhancedResults.length
          : 0,
        matchedFields: Array.from(
          new Set(enhancedResults.flatMap((r) => r.matchedFields)),
        ),
      };

      setResults(enhancedResults);
      setSearchStats(stats);
      updateCache(searchQuery, enhancedResults, stats);
      updateSearchHistory(searchQuery);
    },
    [checkCache, updateCache, updateSearchHistory, fuse],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

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
