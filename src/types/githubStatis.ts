import type { ReactNode } from "react";

export interface Language {
  name: string;
  percentage: number;
  color: string;
}

export interface GitHubStats {
  name: string;
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_commits: number;
  contributions_current_year: number;
  top_languages: Language[];
}

export interface GitHubStatsUIProps {
  stats: GitHubStats | null;
  error?: string | null;
}

export interface LanguageBarProps {
  languages: Language[];
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  gradient: string;
  delay?: number;
}

export interface ErrorStateProps {
  error: string;
}
