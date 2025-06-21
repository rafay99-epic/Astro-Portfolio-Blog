import type { APIRoute } from "astro";

interface GitHubStats {
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

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  language: string;
  size: number;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = "rafay99-epic";

async function fetchWithAuth(url: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHub-Stats-App",
  };

  if (GITHUB_TOKEN) {
    headers["Authorization"] = `token ${GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

async function getGitHubStats(): Promise<GitHubStats> {
  try {
    // Get user info
    const user = await fetchWithAuth(
      `https://api.github.com/users/${GITHUB_USERNAME}`
    );

    // Get repositories
    const repos: GitHubRepo[] = await fetchWithAuth(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    );

    // Calculate total stars
    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    // Calculate language statistics
    const languageStats: { [key: string]: { size: number; color: string } } =
      {};
    const languageColors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      Java: "#b07219",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Dart: "#00B4AB",
      "C++": "#f34b7d",
      C: "#555555",
      Shell: "#89e051",
      Dockerfile: "#384d54",
      Vue: "#41b883",
      React: "#61dafb",
      Go: "#00ADD8",
      Rust: "#dea584",
      PHP: "#4F5D95",
    };

    repos.forEach((repo) => {
      if (repo.language && repo.size > 0) {
        if (!languageStats[repo.language]) {
          languageStats[repo.language] = {
            size: 0,
            color: languageColors[repo.language] || "#586069",
          };
        }
        languageStats[repo.language].size += repo.size;
      }
    });

    const totalSize = Object.values(languageStats).reduce(
      (sum, lang) => sum + lang.size,
      0
    );
    const topLanguages = Object.entries(languageStats)
      .map(([name, data]) => ({
        name,
        percentage: Math.round((data.size / totalSize) * 100),
        color: data.color,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 8);

    // Try to get contribution data (this requires authentication or scraping)
    let contributionsCurrentYear = 0;
    let totalCommits = 0;

    // If we have a token, we can get more detailed stats
    if (GITHUB_TOKEN) {
      try {
        // Get events (limited but gives us some activity data)
        const events = await fetchWithAuth(
          `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`
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

    return {
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
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    throw error;
  }
}

export const GET: APIRoute = async () => {
  try {
    const stats = await getGitHubStats();

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
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
