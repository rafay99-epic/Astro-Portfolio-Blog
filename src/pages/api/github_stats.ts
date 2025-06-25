import type { APIRoute } from "astro";
import { LRUCache } from "lru-cache";
import type { GitHubStats, GitHubRepo } from "types/github";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = "rafay99-epic";
const CACHE_DURATION = 3600; // 1 hour in seconds

// Use LRU cache to prevent memory leaks
const statsCache = new LRUCache<string, GitHubStats>({
  max: 1, // Only store one item
  ttl: CACHE_DURATION * 1000, // Convert to milliseconds
  updateAgeOnGet: true, // Reset TTL on access
  allowStale: true, // Allow returning stale items while fetching new ones
});

// Language colors map for better memory usage
const languageColors = new Map([
  ["JavaScript", "#f1e05a"],
  ["TypeScript", "#2b7489"],
  ["Python", "#3572A5"],
  ["Java", "#b07219"],
  ["HTML", "#e34c26"],
  ["CSS", "#563d7c"],
  ["Dart", "#00B4AB"],
  ["C++", "#f34b7d"],
  ["C", "#555555"],
  ["Shell", "#89e051"],
  ["Dockerfile", "#384d54"],
  ["Vue", "#41b883"],
  ["React", "#61dafb"],
  ["Go", "#00ADD8"],
  ["Rust", "#dea584"],
  ["PHP", "#4F5D95"],
]);

async function fetchWithAuth(url: string, signal?: AbortSignal) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHub-Stats-App",
  };

  if (GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  }

  const response = await fetch(url, {
    headers,
    signal,
    // Add cache control
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} - ${await response.text()}`
    );
  }

  return response.json();
}

async function getGitHubStats(signal?: AbortSignal): Promise<GitHubStats> {
  // Check cache first
  const cachedStats = statsCache.get("stats");
  if (cachedStats) {
    return cachedStats;
  }

  try {
    // Fetch data in parallel with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const [user, repos] = await Promise.all([
      fetchWithAuth(
        `https://api.github.com/users/${GITHUB_USERNAME}`,
        signal || controller.signal
      ),
      fetchWithAuth(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        signal || controller.signal
      ),
    ]).finally(() => clearTimeout(timeout));

    // Calculate stats efficiently
    const totalStars = repos.reduce(
      (sum: number, repo: GitHubRepo) => sum + repo.stargazers_count,
      0
    );

    // Use Map for better memory efficiency
    const languageStats = new Map<string, { size: number; color: string }>();
    let totalSize = 0;

    // Process repos in chunks to prevent memory spikes
    const chunkSize = 20;
    for (let i = 0; i < repos.length; i += chunkSize) {
      const chunk = repos.slice(i, i + chunkSize);
      for (const repo of chunk) {
        if (repo.language && repo.size > 0) {
          const existing = languageStats.get(repo.language) || {
            size: 0,
            color: languageColors.get(repo.language) || "#586069",
          };
          existing.size += repo.size;
          languageStats.set(repo.language, existing);
          totalSize += repo.size;
        }
      }
    }

    const topLanguages = Array.from(languageStats.entries())
      .map(([name, data]) => ({
        name,
        percentage: Math.round((data.size / totalSize) * 100),
        color: data.color,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 8);

    // Get contribution data if token available
    let contributionsCurrentYear = 0;
    let totalCommits = 0;

    if (GITHUB_TOKEN) {
      try {
        const events = await fetchWithAuth(
          `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`,
          signal || controller.signal
        );

        const currentYear = new Date().getFullYear();
        const pushEvents = events.filter(
          (event: any) =>
            event.type === "PushEvent" &&
            new Date(event.created_at).getFullYear() === currentYear
        );

        contributionsCurrentYear = pushEvents.reduce(
          (sum: number, event: any) =>
            sum + (event.payload?.commits?.length || 0),
          0
        );

        totalCommits = events
          .filter((event: any) => event.type === "PushEvent")
          .reduce(
            (sum: number, event: any) =>
              sum + (event.payload?.commits?.length || 0),
            0
          );
      } catch (error) {
        console.warn("Could not fetch contribution data:", error);
      }
    }

    const stats: GitHubStats = {
      name: user.name || user.login,
      login: user.login,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      total_stars: totalStars,
      total_commits: totalCommits,
      contributions_current_year: contributionsCurrentYear,
      top_languages: topLanguages,
    };

    // Update cache
    statsCache.set("stats", stats);

    return stats;
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    throw error;
  }
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const signal = new AbortController().signal;
    const stats = await getGitHubStats(signal);
    const etag = `W/"${Buffer.from(JSON.stringify(stats)).toString("base64")}"`;

    // Check if-none-match header
    const ifNoneMatch = request.headers.get("if-none-match");
    if (ifNoneMatch === etag) {
      return new Response(null, {
        status: 304,
        headers: {
          ETag: etag,
          "Cache-Control": `public, max-age=${CACHE_DURATION}`,
        },
      });
    }

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${CACHE_DURATION}`,
        ETag: etag,
      },
    });
  } catch (error) {
    console.error("GitHub stats API error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch GitHub stats",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
