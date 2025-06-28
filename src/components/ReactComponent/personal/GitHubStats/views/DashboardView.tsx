import React, { memo } from "react";
import { motion } from "framer-motion";
import type { GitHubStats } from "types/githubStatis";
import LanguageBar from "../LanguageBar";

interface DashboardViewProps {
  stats: GitHubStats;
}

const DashboardView = memo(function DashboardView({
  stats,
}: DashboardViewProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          className="lg:col-span-1 bg-[#1a1b26] rounded-xl p-6 shadow-lg border border-[#565f89]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#24283b] flex items-center justify-center">
              <span className="text-4xl text-[#7aa2f7]">
                {stats.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#c0caf5]">{stats.name}</h3>
            <p className="text-[#a9b1d6]">@{stats.login}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#bb9af7]">
                {stats.followers}
              </p>
              <p className="text-[#a9b1d6]">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#f7768e]">
                {stats.following}
              </p>
              <p className="text-[#a9b1d6]">Following</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="bg-[#1a1b26] rounded-xl p-6 shadow-lg border border-[#565f89]">
            <h4 className="text-[#a9b1d6] mb-2">Repositories</h4>
            <p className="text-3xl font-bold text-[#7aa2f7]">
              {stats.public_repos}
            </p>
          </div>
          <div className="bg-[#1a1b26] rounded-xl p-6 shadow-lg border border-[#565f89]">
            <h4 className="text-[#a9b1d6] mb-2">Stars</h4>
            <p className="text-3xl font-bold text-[#bb9af7]">
              {stats.total_stars}
            </p>
          </div>
          <div className="bg-[#1a1b26] rounded-xl p-6 shadow-lg border border-[#565f89]">
            <h4 className="text-[#a9b1d6] mb-2">Commits</h4>
            <p className="text-3xl font-bold text-[#9ece6a]">
              {stats.total_commits}
            </p>
          </div>
          <div className="md:col-span-3 bg-[#1a1b26] rounded-xl p-6 shadow-lg border border-[#565f89]">
            <h4 className="text-[#a9b1d6] mb-4">Language Distribution</h4>
            <LanguageBar languages={stats.top_languages} />
          </div>
        </motion.div>

        {/* Activity Card */}
        <motion.div
          className="lg:col-span-3 bg-[#1a1b26] rounded-xl p-6 shadow-lg border border-[#565f89]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-[#c0caf5]">
              Activity Overview
            </h4>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#7aa2f7]">
                {stats.contributions_current_year}
              </p>
              <p className="text-[#a9b1d6]">Contributions this year</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

export default DashboardView;
