import { useState, useEffect, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import type { Post } from "types/articles";

interface UseSearchResult {
  query: string;
  setQuery: (value: string) => void;
  results: Post[];
  searchStats: {
    totalResults: number;
    searchTime: number;
    relevanceScore: number;
    matchedFields: string[];
  };
  searchHistory: string[];
  clearHistory: () => void;
}

// Cache for search results
const searchCache = new Map<
  string,
  {
    results: Post[];
    stats: UseSearchResult["searchStats"];
    timestamp: number;
  }
>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_HISTORY_ITEMS = 10;
const SEARCH_HISTORY_KEY = "search_history";

// Load search history from localStorage
const loadSearchHistory = (): string[] => {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

// Save search history to localStorage
const saveSearchHistory = (history: string[]) => {
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Handle storage errors silently
  }
};

// Enhanced relevance calculation
const calculateRelevance = (
  result: { score?: number; item: Post },
  searchIntent: ReturnType<typeof detectSearchIntent>
) => {
  const baseScore = 1 - (result.score || 0);
  const intentBonus = searchIntent.type !== "general" ? 0.2 : 0;
  const freshness =
    (Date.now() - new Date(result.item.data.pubDate).getTime()) /
    (1000 * 60 * 60 * 24 * 365);
  const freshnessBoost = Math.min(0.2, 1 / (1 + freshness)); // Boost newer content

  return baseScore + intentBonus + freshnessBoost;
};

// Unified search configuration with field-specific weights and thresholds
const UNIFIED_SEARCH_CONFIG = {
  keys: [
    {
      name: "data.title",
      weight: 2.0, // Highest priority
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

// Helper function to detect search intent
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

const useSearch = (posts: Post[]): UseSearchResult => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Post[]>([]);
  const [searchStats, setSearchStats] = useState({
    totalResults: 0,
    searchTime: 0,
    relevanceScore: 0,
    matchedFields: [] as string[],
  });
  const [searchHistory, setSearchHistory] = useState<string[]>(() =>
    loadSearchHistory()
  );

  // Clear search history
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    saveSearchHistory([]);
  }, []);

  // Update search history
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

  // Check cache for existing results
  const checkCache = useCallback((searchQuery: string) => {
    const cached = searchCache.get(searchQuery);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached;
    }
    return null;
  }, []);

  // Update cache with new results
  const updateCache = useCallback(
    (
      searchQuery: string,
      results: Post[],
      stats: UseSearchResult["searchStats"]
    ) => {
      searchCache.set(searchQuery, {
        results,
        stats,
        timestamp: Date.now(),
      });
    },
    []
  );

  // Memoize filtered posts
  const filteredPosts = useMemo(
    () => posts.filter((post) => !post.data.draft),
    [posts]
  );

  // Memoize Fuse instance with unified configuration
  const fuse = useMemo(
    () => new Fuse(filteredPosts, UNIFIED_SEARCH_CONFIG),
    [filteredPosts]
  );

  // Enhanced search function
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

      // Check cache first
      const cached = checkCache(searchQuery);
      if (cached) {
        setResults(cached.results);
        setSearchStats(cached.stats);
        return;
      }

      const startTime = performance.now();
      const searchIntent = detectSearchIntent(searchQuery);

      // Process query based on detected intent
      let processedQuery = searchQuery;
      if (searchIntent.type !== "general") {
        processedQuery = searchQuery.replace(
          /^(date:|tag:|tags:|#|author:|by:|on:)\s*/,
          ""
        );
      }

      // Handle special search operators
      const terms = processedQuery.split(" ").map((term) => {
        if (term.startsWith('"') && term.endsWith('"')) {
          return `=${term.slice(1, -1)}`; // Exact match
        }
        if (term.startsWith("-")) {
          return `!${term.slice(1)}`; // Exclude term
        }
        if (term.startsWith("+")) {
          return `'${term.slice(1)}`; // Must include term
        }
        return term;
      });

      // Perform search with processed query
      const searchResults = fuse.search(terms.join(" "));

      // Enhanced results processing with better relevance scoring
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
              0
            ) / enhancedResults.length
          : 0,
        matchedFields: Array.from(
          new Set(enhancedResults.flatMap((r) => r.matchedFields))
        ),
      };

      // Update results and cache
      setResults(enhancedResults);
      setSearchStats(stats);
      updateCache(searchQuery, enhancedResults, stats);
      updateSearchHistory(searchQuery);
    },
    [checkCache, updateCache, updateSearchHistory, fuse]
  );

  // Debounced search effect
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
