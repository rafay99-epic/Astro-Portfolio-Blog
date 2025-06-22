import React from "react";
import { memo } from "react";
import { useGitHubStats } from "./useGitHubStats";
import GitHubStatsUI from "./GitHubStatsUI";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const GitHubStats = memo(function GitHubStats() {
  const { stats, loading, error } = useGitHubStats();

  if (loading) {
    return <LoadingState />;
  }

  if (error || !stats) {
    return <ErrorState error={error || "Unknown error occurred"} />;
  }

  return <GitHubStatsUI stats={stats} />;
});

export default GitHubStats;
