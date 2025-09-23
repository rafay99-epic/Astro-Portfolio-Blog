import { useState, useEffect, useMemo, useCallback, useRef } from "react";
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

const searchCache = new Map<
  string,
  {
    results: Post[];
    stats: UseSearchResult["searchStats"];
    timestamp: number;
  }
>();

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

// Minimal Fuse config: title, authorName, pubDate only
const FUSE_CONFIG = {
  keys: [
    { name: "data.title", weight: 2.0 },
    { name: "data.authorName", weight: 1.5 },
    {
      name: "data.pubDate",
      weight: 1.0,
      getFn: (obj: Post) => {
        const d = new Date(obj.data.pubDate);
        return (
          d.toISOString().slice(0, 10) +
          " " +
          d.toLocaleDateString() +
          " " +
          d.toLocaleString("default", { month: "long", year: "numeric" })
        );
      },
    },
  ],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  shouldSort: true,
} as const;

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
    loadSearchHistory(),
  );

  const fuseRef = useRef<any>(null);

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
      stats: UseSearchResult["searchStats"],
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
    () => posts.filter((post) => !post.data.draft),
    [posts],
  );

  const initFuse = useCallback(async () => {
    if (fuseRef.current) return fuseRef.current;
    const { default: Fuse } = await import("fuse.js");
    fuseRef.current = new Fuse(filteredPosts, FUSE_CONFIG as any);
    return fuseRef.current;
  }, [filteredPosts]);

  useEffect(() => {
    const schedule = () => {
      initFuse();
    };
    if (typeof (window as any).requestIdleCallback === "function") {
      const id = (window as any).requestIdleCallback(schedule, {
        timeout: 500,
      });
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const t = setTimeout(schedule, 0);
    return () => clearTimeout(t);
  }, [initFuse]);

  const performSearch = useCallback(
    async (searchQuery: string) => {
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
      let items: Post[] = [];

      const fuse = fuseRef.current ?? (await initFuse());
      if (fuse) {
        const raw = fuse.search(searchQuery);
        items = raw.map((r: any) => r.item);
      } else {
        // Very light fallback until Fuse is ready
        const q = searchQuery.toLowerCase();
        items = filteredPosts.filter((p) => {
          const t = p.data.title?.toLowerCase() ?? "";
          const a = p.data.authorName?.toLowerCase() ?? "";
          const d = new Date(p.data.pubDate)
            .toISOString()
            .slice(0, 10)
            .toLowerCase();

          return t.includes(q) || a.includes(q) || d.includes(q);
        });
      }

      items.sort(
        (a, b) =>
          new Date(b.data.pubDate).getTime() -
          new Date(a.data.pubDate).getTime(),
      );

      const endTime = performance.now();
      const stats = {
        totalResults: items.length,
        searchTime: Math.round(endTime - startTime),
        relevanceScore: 0,
        matchedFields: [],
      };

      setResults(items);
      setSearchStats(stats);
      updateCache(searchQuery, items, stats);
      updateSearchHistory(searchQuery);
    },
    [checkCache, updateCache, updateSearchHistory, initFuse, filteredPosts],
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
