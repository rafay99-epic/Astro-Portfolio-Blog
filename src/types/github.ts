export interface GitHubStats {
  name: string;
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_commits: number;
  contributions_current_year: number;
  top_languages: Array<GitHubLanguage>;
}

export interface GitHubLanguage {
  name: string;
  percentage: number;
  color: string;
}

export interface GitHubRepo {
  name: string;
  stargazers_count: number;
  language: string;
  size: number;
}

export interface GitHubStatsUIProps {
  stats: GitHubStats | null;
  error?: string | null;
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}
