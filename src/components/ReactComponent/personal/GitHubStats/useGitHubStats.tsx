import { useState, useEffect, useCallback } from "react";
import type { GitHubStats } from "types/githubStatis";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
const CACHE_KEY = "github-stats-cache";

interface CacheData {
  data: GitHubStats;
  timestamp: number;
}

export const useGitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCachedData = useCallback((): CacheData | null => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    try {
      const parsedCache = JSON.parse(cached) as CacheData;
      const isExpired = Date.now() - parsedCache.timestamp > CACHE_DURATION;
      return isExpired ? null : parsedCache;
    } catch {
      return null;
    }
  }, []);

  const setCachedData = useCallback((data: GitHubStats) => {
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = getCachedData();
      if (cached) {
        setStats(cached.data);
        setLoading(false);
        // Fetch in background to update cache
        fetchAndUpdateCache();
        return;
      }

      await fetchAndUpdateCache();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  }, [getCachedData]);

  const fetchAndUpdateCache = async () => {
    try {
      const response = await fetch("/api/github_stats");
      if (!response.ok) {
        throw new Error("Failed to fetch GitHub stats");
      }

      const data = await response.json();
      setStats(data);
      setCachedData(data);
      setLoading(false);
    } catch (err) {
      // If we're updating cache in background, don't set error
      if (loading) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchStats();

    // Optional: Set up periodic background refresh
    const intervalId = setInterval(fetchAndUpdateCache, CACHE_DURATION / 2);

    return () => clearInterval(intervalId);
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};
