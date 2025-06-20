import React, { useState } from "react";
import { motion } from "framer-motion";

interface GitHubStatsProps {
  username?: string;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({
  username = "rafay99-epic",
}) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (key: string) => {
    setLoadedImages((prev) => ({ ...prev, [key]: true }));
  };

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

  const statsConfig = [
    {
      key: "stats",
      title: "GitHub Statistics",
      url: `https://github-readme-stats-five-lemon-36.vercel.app/api?username=rafay99-epic&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=7aa2f7&icon_color=7aa2f7&text_color=c9d1d9&border_color=30363d`,
      alt: "GitHub Statistics",
      gradient: "from-[#7aa2f7]/20 to-[#bb9af7]/20",
    },
    {
      key: "streak",
      title: "Contribution Streak",
      url: `https://streak-stats.demolab.com?user=rafay99-epic&theme=tokyonight&hide_border=true&background=0d1117&stroke=7aa2f7&ring=bb9af7&fire=ff9e64&currStreakLabel=c9d1d9&sideLabels=c9d1d9&currStreakNum=7aa2f7&sideNums=bb9af7`,
      alt: "GitHub Contribution Streak",
      gradient: "from-[#ff9e64]/20 to-[#f7768e]/20",
    },
  ];

  return (
    <section className="github-stats-section relative overflow-hidden py-16">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#7aa2f7]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#bb9af7]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#9ece6a]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
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
            style={{
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Daily Coding Activity
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: "#a9b1d6" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Here's a glimpse into my coding journey and contribution patterns
          </motion.p>

          {/* Animated Code Icon */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg className="w-16 h-16" fill="#7aa2f7" viewBox="0 0 24 24">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statsConfig.map((stat) => (
            <motion.div
              key={stat.key}
              variants={cardVariants}
              className={`relative group`}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500`}
              ></div>
              <div
                className="relative rounded-2xl p-8 shadow-2xl backdrop-blur-sm overflow-hidden border"
                style={{
                  backgroundColor: "#24283b",
                  borderColor: "#565f89",
                }}
              >
                {/* Card Background Effects */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7aa2f7]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

                <motion.h3
                  className="text-2xl font-bold mb-6 text-center relative z-10"
                  style={{ color: "#c0caf5" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + statsConfig.indexOf(stat) * 0.2 }}
                >
                  {stat.title}
                </motion.h3>

                <div className="flex justify-center relative">
                  <img
                    src={stat.url}
                    alt={stat.alt}
                    className="rounded-lg max-w-full h-auto shadow-lg"
                    loading="lazy"
                  />
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7aa2f7]/0 via-[#7aa2f7]/5 to-[#7aa2f7]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
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
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#bb9af7]/10 to-transparent rounded-full -translate-y-20 -translate-x-20"></div>

              <motion.h3
                className="text-2xl font-bold mb-8 text-center relative z-10"
                style={{ color: "#c0caf5" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                Most Used Languages
              </motion.h3>

              <div className="flex justify-center relative">
                {!loadedImages.languages && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: "#1a1b26" }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-[#7aa2f7] rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-[#bb9af7] rounded-full animate-bounce delay-100"></div>
                      <div className="w-3 h-3 bg-[#9ece6a] rounded-full animate-bounce delay-200"></div>
                    </div>
                  </motion.div>
                )}
                <img
                  src={`https://github-readme-stats-five-lemon-36.vercel.app/api/top-langs/?username=rafay99-epic&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=7aa2f7&text_color=c9d1d9&border_color=30363d&langs_count=8`}
                  alt="Top Programming Languages"
                  className="rounded-lg max-w-full h-auto shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced GitHub Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <motion.a
            href={`https://github.com/rafay99-epic`}
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

            {/* Sparkle Effect */}
            <motion.div
              className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
            <motion.div
              className="absolute bottom-2 left-4 w-1 h-1 bg-white rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
