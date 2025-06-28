import React, { memo } from "react";
import { motion } from "framer-motion";
import type { GitHubStats } from "types/githubStatis";
import LanguageBar from "../LanguageBar";

interface MinimalViewProps {
  stats: GitHubStats;
}

const MinimalView = memo(function MinimalView({ stats }: MinimalViewProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        className="bg-[#1a1b26] rounded-xl p-6 shadow-lg border border-[#565f89]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-[#c0caf5]">{stats.name}</h3>
            <p className="text-[#a9b1d6]">@{stats.login}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[#7aa2f7]">
              {stats.contributions_current_year}
            </p>
            <p className="text-[#a9b1d6]">Contributions</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-[#24283b] rounded-lg">
            <p className="text-2xl font-bold text-[#bb9af7]">
              {stats.public_repos}
            </p>
            <p className="text-[#a9b1d6]">Repositories</p>
          </div>
          <div className="text-center p-4 bg-[#24283b] rounded-lg">
            <p className="text-2xl font-bold text-[#f7768e]">
              {stats.total_stars}
            </p>
            <p className="text-[#a9b1d6]">Stars</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-[#c0caf5] mb-3">
            Top Languages
          </h4>
          <LanguageBar languages={stats.top_languages} />
        </div>
      </motion.div>
    </div>
  );
});

export default MinimalView;
