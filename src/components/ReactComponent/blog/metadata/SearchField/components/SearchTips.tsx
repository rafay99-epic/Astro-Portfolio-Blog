import { memo } from "react";
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
          className="mt-4 rounded-xl border border-[#565f89]/30 bg-[#1a1b26]/40 p-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {searchTips.map((tip) => (
              <motion.div
                key={tip.tip}
                className="group flex cursor-pointer items-center gap-2"
                onClick={() => setQuery(tip.tip)}
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-lg">{tip.icon}</span>
                <div className="flex-1">
                  <code className="rounded bg-[#1a1b26] px-2 py-1 text-xs text-[#7aa2f7] transition-colors group-hover:text-[#bb9af7]">
                    {tip.tip}
                  </code>
                  <p className="mt-1 text-xs text-[#a9b1d6]">
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
