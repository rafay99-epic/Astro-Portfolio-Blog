import React, { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { GitHubStats } from "types/githubStatis";

interface TerminalViewProps {
  stats: GitHubStats;
}

const TerminalView = memo(function TerminalView({ stats }: TerminalViewProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const lines = [
    `> github.user.info("${stats.login}")`,
    `{`,
    `  "name": "${stats.name}",`,
    `  "repositories": ${stats.public_repos},`,
    `  "stars": ${stats.total_stars},`,
    `  "commits": ${stats.total_commits},`,
    `  "contributions": ${stats.contributions_current_year},`,
    `  "followers": ${stats.followers},`,
    `  "following": ${stats.following}`,
    `}`,
    ``,
    `> github.user.languages`,
    `[`,
    ...stats.top_languages.map(
      (lang) => `  { "${lang.name}": "${lang.percentage}%" }`
    ),
    `]`,
    ``,
    `> _`,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => Math.min(prev + 1, lines.length));
    }, 50);

    return () => clearInterval(timer);
  }, [lines.length]);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="bg-[#1a1b26] rounded-xl p-6 shadow-lg border border-[#565f89] font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#f7768e]" />
          <div className="w-3 h-3 rounded-full bg-[#e0af68]" />
          <div className="w-3 h-3 rounded-full bg-[#9ece6a]" />
        </div>

        <div className="space-y-1 text-sm md:text-base">
          {lines.slice(0, visibleLines).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={
                line.startsWith(">") ? "text-[#7aa2f7]" : "text-[#a9b1d6]"
              }
            >
              {line.startsWith(">") ? (
                line
              ) : (
                <span className="pl-4">{line}</span>
              )}
            </motion.div>
          ))}
          {visibleLines === lines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-[#c0caf5]"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
});

export default TerminalView;
