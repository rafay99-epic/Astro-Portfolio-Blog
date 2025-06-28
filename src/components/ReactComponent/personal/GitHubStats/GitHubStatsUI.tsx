import React, { useRef, useState, memo } from "react";
import { motion, useInView } from "framer-motion";
import type {
  GitHubStats,
  GitHubStatsUIProps,
  ViewMode,
} from "types/githubStatis";
import ViewSwitcher from "./ViewSwitcher";
import MinimalView from "./views/MinimalView";
import DashboardView from "./views/DashboardView";
import TerminalView from "./views/TerminalView";
import StatCard from "./StatCard";
import LanguageBar from "./LanguageBar";

const demoStats: GitHubStats = {
  name: "Demo User",
  login: "demo-user",
  public_repos: 42,
  followers: 128,
  following: 89,
  total_stars: 256,
  total_commits: 1543,
  contributions_current_year: 387,
  top_languages: [
    { name: "TypeScript", percentage: 35, color: "#3178c6" },
    { name: "JavaScript", percentage: 28, color: "#f7df1e" },
    { name: "React", percentage: 15, color: "#61dafb" },
    { name: "Python", percentage: 12, color: "#3776ab" },
    { name: "CSS", percentage: 7, color: "#1572b6" },
    { name: "Other", percentage: 3, color: "#6b7280" },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

const RepoIcon = memo(function RepoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
});

const StarIcon = memo(function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
});

const FollowersIcon = memo(function FollowersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M16 7c0-2.21-1.79-4-4-4S8 4.79 8 7s1.79 4 4 4 4-1.79 4-4zm-4 5c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
    </svg>
  );
});

const ContributionsIcon = memo(function ContributionsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
    </svg>
  );
});

const ClassicView = memo(function ClassicView({
  stats,
}: {
  stats: GitHubStats;
}) {
  const statCards = [
    {
      title: "Public Repos",
      value: stats.public_repos,
      icon: <RepoIcon />,
      gradient: "from-[#7aa2f7]/20 to-[#bb9af7]/20",
    },
    {
      title: "Total Stars",
      value: stats.total_stars,
      icon: <StarIcon />,
      gradient: "from-[#ff9e64]/20 to-[#f7768e]/20",
    },
    {
      title: "Followers",
      value: stats.followers,
      icon: <FollowersIcon />,
      gradient: "from-[#9ece6a]/20 to-[#7aa2f7]/20",
    },
    {
      title: "This Year",
      value: stats.contributions_current_year,
      icon: <ContributionsIcon />,
      gradient: "from-[#bb9af7]/20 to-[#9ece6a]/20",
    },
  ];

  return (
    <>
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto mb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((card, index) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            gradient={card.gradient}
            delay={index * 0.05}
          />
        ))}
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9ece6a]/10 to-[#7aa2f7]/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div
            className="relative rounded-2xl p-6 lg:p-8 shadow-lg backdrop-blur-sm border"
            style={{
              backgroundColor: "#24283b",
              borderColor: "#565f89",
            }}
          >
            <motion.h3
              className="text-xl lg:text-2xl font-bold mb-6 text-center"
              style={{ color: "#c0caf5" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Most Used Languages
            </motion.h3>

            <LanguageBar languages={stats.top_languages} />
          </div>
        </div>
      </motion.div>
    </>
  );
});

const GitHubStatsUI = memo(function GitHubStatsUI({
  stats,
  error,
}: GitHubStatsUIProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
    amount: 0.1,
  });

  const [currentView, setCurrentView] = useState<ViewMode>("dashboard");
  const displayStats = stats || demoStats;
  const isUsingDemoData = !stats || !!error;

  const renderView = () => {
    switch (currentView) {
      case "minimal":
        return <MinimalView stats={displayStats} />;
      case "classic":
        return <ClassicView stats={displayStats} />;
      case "terminal":
        return <TerminalView stats={displayStats} />;
      default:
        return <DashboardView stats={displayStats} />;
    }
  };

  return (
    <section
      ref={ref}
      className="github-stats-section relative overflow-hidden py-16"
    >
      {isInView && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#7aa2f7]/5 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#bb9af7]/5 rounded-full blur-2xl" />
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            GitHub Activity Dashboard
          </motion.h2>
          <motion.p
            className="text-lg mb-6 max-w-2xl mx-auto"
            style={{ color: "#a9b1d6" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {isUsingDemoData
              ? "Demo data - GitHub API temporarily unavailable"
              : "Real-time GitHub statistics and analytics"}
          </motion.p>
          {isUsingDemoData && error && (
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Showing demo data due to API error: {error}
              </div>
            </motion.div>
          )}
        </motion.div>

        <ViewSwitcher currentView={currentView} onViewChange={setCurrentView} />
        {renderView()}
      </div>
    </section>
  );
});

export default GitHubStatsUI;
