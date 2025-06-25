import React, { Suspense } from "react";
import { memo } from "react";
import { useGitHubStats } from "./useGitHubStats";
import GitHubStatsUI from "./GitHubStatsUI";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

// Error boundary for better error handling
class GitHubStatsErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState error={this.state.error?.message || "Unknown error"} />
      );
    }

    return this.props.children;
  }
}

// Memoize the stats component
const GitHubStatsContent = memo(function GitHubStatsContent() {
  const { stats, loading, error, refetch } = useGitHubStats();

  if (loading) {
    return <LoadingState />;
  }

  if (error || !stats) {
    return (
      <ErrorState error={error || "Unknown error occurred"} onRetry={refetch} />
    );
  }

  return <GitHubStatsUI stats={stats} />;
});

// Main component with error boundary and suspense
const GitHubStats = memo(function GitHubStats() {
  return (
    <GitHubStatsErrorBoundary>
      <Suspense fallback={<LoadingState />}>
        <GitHubStatsContent />
      </Suspense>
    </GitHubStatsErrorBoundary>
  );
});

export default GitHubStats;
