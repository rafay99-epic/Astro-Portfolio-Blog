import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SearchTipsProps } from "types/search";

const searchTips = [
  { icon: "🔍", tip: '"exact phrase"', description: "Search exact phrase" },
  { icon: "✨", tip: "+must_have", description: "Must include word" },
  { icon: "❌", tip: "-exclude", description: "Exclude word" },
  { icon: "#️⃣", tip: "tag: react", description: "Search by tag" },
  { icon: "👤", tip: "author: name", description: "Search by author" },
  { icon: "📅", tip: "date: 2024", description: "Search by date" },
];

const SearchTips = memo(function SearchTips({
  showSearchTips,
  query,
  setQuery,
}: SearchTipsProps) {
  return (
    <AnimatePresence>
      {(showSearchTips || query) && (
        <motion.div
          className="mt-4 p-4 bg-[#1a1b26]/40 border border-[#565f89]/30 rounded-xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {searchTips.map((tip) => (
              <motion.div
                key={tip.tip}
                className="flex items-center gap-2 group cursor-pointer"
                onClick={() => setQuery(tip.tip)}
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-lg">{tip.icon}</span>
                <div className="flex-1">
                  <code className="text-xs bg-[#1a1b26] px-2 py-1 rounded text-[#7aa2f7] group-hover:text-[#bb9af7] transition-colors">
                    {tip.tip}
                  </code>
                  <p className="text-xs text-[#a9b1d6] mt-1">
                    {tip.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default SearchTips;
