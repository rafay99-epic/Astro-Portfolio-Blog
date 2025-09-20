import { memo } from "react";
import { motion } from "framer-motion";
import type { SearchStatsProps } from "types/search";

const SearchStats = memo(function SearchStats({
  query,
  results,
  searchStats,
}: SearchStatsProps) {
  if (!query) return null;

  return (
    <motion.div
      className="mt-4 rounded-xl border border-[#565f89]/30 bg-[#1a1b26]/40 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[#a9b1d6]">
            {results.length > 0 ? (
              <>
                Found{" "}
                <span className="font-semibold text-[#7aa2f7]">
                  {searchStats.totalResults}
                </span>{" "}
                results in{" "}
                <span className="font-semibold text-[#bb9af7]">
                  {searchStats.searchTime}ms
                </span>
              </>
            ) : (
              <>No results found</>
            )}
          </span>
        </div>
        {searchStats.matchedFields.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#a9b1d6]">Matched in:</span>
            <div className="flex gap-1">
              {searchStats.matchedFields.map((field) => (
                <span
                  key={field}
                  className="rounded bg-[#1a1b26] px-2 py-1 text-xs text-[#7aa2f7]"
                >
                  {field.split(".").pop()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default SearchStats;
