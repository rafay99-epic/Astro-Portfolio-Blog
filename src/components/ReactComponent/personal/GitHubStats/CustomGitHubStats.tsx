import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const CustomGitHubStats: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    const fetchStats = async () => {
      try {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.6,
      },
    },
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    gradient: string;
    delay?: number;
  }> = ({ title, value, icon, gradient, delay = 0 }) => (
    <motion.div
      variants={cardVariants}
      className="relative group"
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500`}
      ></div>
      <div
        className="relative rounded-2xl p-6 shadow-2xl backdrop-blur-sm overflow-hidden border"
        style={{
          backgroundColor: "#24283b",
          borderColor: "#565f89",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-[#7aa2f7] text-2xl">{icon}</div>
            <div>
              <motion.p
                className="text-sm"
                style={{ color: "#a9b1d6" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3 }}
              >
                {title}
              </motion.p>
              <motion.p
                className="text-2xl font-bold"
                style={{ color: "#c0caf5" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.5, type: "spring" }}
              >
                {value.toLocaleString()}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const LanguageBar: React.FC<{
    languages: Array<{ name: string; percentage: number; color: string }>;
  }> = ({ languages }) => (
    <div className="space-y-4">
      <div className="flex h-3 rounded-full overflow-hidden bg-[#1a1b26]">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            className="h-full"
            style={{ backgroundColor: lang.color }}
            initial={{ width: 0 }}
            animate={{ width: `${lang.percentage}%` }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {languages.slice(0, 6).map((lang, index) => (
          <motion.div
            key={lang.name}
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-sm" style={{ color: "#a9b1d6" }}>
              {lang.name}
            </span>
            <span className="text-sm font-medium" style={{ color: "#c0caf5" }}>
              {lang.percentage}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="github-stats-section relative overflow-hidden py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              className="flex justify-center mb-8"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg className="w-16 h-16" fill="#7aa2f7" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.div>
            <p className="text-xl" style={{ color: "#a9b1d6" }}>
              Loading GitHub Statistics...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className="github-stats-section relative overflow-hidden py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-xl text-red-400">
              Error loading GitHub stats: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="github-stats-section relative overflow-hidden py-16"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#7aa2f7]/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.3 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#bb9af7]/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.3 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#9ece6a]/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.2 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 1, delay: 0.6 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 100%" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              animate={
                isInView
                  ? {
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }
                  : {}
              }
              transition={{
                duration: 5,
                repeat: isInView ? Infinity : 0,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 100%" }}
              className="bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent"
            >
              Daily Coding Activity
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: "#a9b1d6" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Powered by real-time GitHub API data
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <StatCard
            title="Public Repos"
            value={stats.public_repos}
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            }
            gradient="from-[#7aa2f7]/20 to-[#bb9af7]/20"
            delay={0}
          />
          <StatCard
            title="Total Stars"
            value={stats.total_stars}
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            }
            gradient="from-[#ff9e64]/20 to-[#f7768e]/20"
            delay={0.1}
          />
          <StatCard
            title="Followers"
            value={stats.followers}
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M16 7c0-2.21-1.79-4-4-4S8 4.79 8 7s1.79 4 4 4 4-1.79 4-4zm-4 5c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
              </svg>
            }
            gradient="from-[#9ece6a]/20 to-[#7aa2f7]/20"
            delay={0.2}
          />
          <StatCard
            title="This Year"
            value={stats.contributions_current_year}
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
              </svg>
            }
            gradient="from-[#bb9af7]/20 to-[#9ece6a]/20"
            delay={0.3}
          />
        </motion.div>

        {/* Languages Section */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9ece6a]/20 to-[#7aa2f7]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div
              className="relative rounded-2xl p-8 shadow-2xl backdrop-blur-sm overflow-hidden border"
              style={{
                backgroundColor: "#24283b",
                borderColor: "#565f89",
              }}
            >
              <motion.h3
                className="text-2xl font-bold mb-8 text-center relative z-10"
                style={{ color: "#c0caf5" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                Most Used Languages
              </motion.h3>

              <LanguageBar languages={stats.top_languages} />
            </div>
          </div>
        </motion.div>

        {/* GitHub Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.a
            href={`https://github.com/${stats.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center px-8 py-4 text-white font-bold rounded-xl shadow-lg relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #7aa2f7 0%, #bb9af7 100%)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(122, 162, 247, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #bb9af7 0%, #9ece6a 100%)",
              }}
            ></div>
            <motion.svg
              className="w-6 h-6 mr-3 relative z-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </motion.svg>
            <span className="relative z-10">View Full GitHub Profile</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomGitHubStats;
