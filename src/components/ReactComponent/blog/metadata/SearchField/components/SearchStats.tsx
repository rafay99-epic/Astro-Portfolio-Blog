import { memo } from "react";
import type { SearchStatsProps } from "types/search";

const SearchStats = memo(function SearchStats({
  query,
  results,
  searchStats,
}: SearchStatsProps) {
  if (!query) return null;

  return (
    <div className="mt-4 rounded-xl border border-[#565f89]/30 bg-[#1a1b26]/40 p-4">
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
        {/* simplified search: no matched fields breakdown */}
      </div>
    </div>
  );
});

export default SearchStats;
