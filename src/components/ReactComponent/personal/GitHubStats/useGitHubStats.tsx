import { useState, useEffect, useCallback, useRef } from "react";
import type { GitHubStats } from "types/github";

const GITHUB_STATS_API = "/api/github_stats";
const CACHE_KEY = "github_stats";
const CACHE_DURATION = 3600 * 1000;

const storage = {
  get: (): { data: GitHubStats; timestamp: number } | null => {
    try {
      const item = localStorage.getItem(CACHE_KEY);
      if (!item) return null;
      return JSON.parse(item);
    } catch {
      return null;
    }
  },
  set: (data: GitHubStats, timestamp: number): void => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp }));
    } catch {
      console.warn("Failed to save to localStorage");
    }
  },
  clear: (): void => {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch {
      console.warn("Failed to clear localStorage");
    }
  },
};

export const useGitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
  }, []);

  const fetchStats = useCallback(
    async (ignoreCache = false) => {
      cleanup();
      const now = Date.now();

      if (!ignoreCache) {
        const cachedData = storage.get();
        if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
          setStats(cachedData.data);
          setLoading(false);
          return;
        }
      }

      try {
        setLoading(true);
        setError(null);

        abortControllerRef.current = new AbortController();

        const response = await fetch(GITHUB_STATS_API, {
          signal: abortControllerRef.current.signal,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.details ||
              `Failed to fetch GitHub stats: ${response.status}`
          );
        }

        const data = await response.json();

        storage.set(data, now);
        setStats(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);

        if (retryCount < 3 && errorMessage.includes("rate limit")) {
          setRetryCount((prev) => prev + 1);
          retryTimeoutRef.current = setTimeout(
            () => fetchStats(true),
            1000 * Math.pow(2, retryCount)
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [retryCount, cleanup]
  );

  useEffect(() => {
    fetchStats();

    return () => {
      cleanup();
    };
  }, [fetchStats, cleanup]);

  const refetch = useCallback(() => {
    setRetryCount(0);
    return fetchStats(true);
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch,
    clearCache: useCallback(() => {
      storage.clear();
      refetch();
    }, [refetch]),
  };
};
