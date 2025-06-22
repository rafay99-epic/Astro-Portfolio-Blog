import { useState, useEffect } from "react";

export interface GitHubStats {
  name: string;
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_commits: number;
  contributions_current_year: number;
  top_languages: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
}

export const useGitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/github_stats");
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
