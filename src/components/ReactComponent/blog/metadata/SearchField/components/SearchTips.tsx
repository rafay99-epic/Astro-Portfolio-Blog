import { memo, type ComponentType } from "react";
import type { SearchTipsProps } from "types/search";
import { LuSearch, LuUser, LuCalendar } from "react-icons/lu";

const searchTips: Array<{
  Icon: ComponentType<{ className?: string }>;
  tip: string;
  description: string;
}> = [
  {
    Icon: (p) => <LuSearch {...p} />,
    tip: "your keywords",
    description: "Type title or author",
  },
  {
    Icon: (p) => <LuUser {...p} />,
    tip: "author name",
    description: "Search by author name",
  },
  {
    Icon: (p) => <LuCalendar {...p} />,
    tip: "2024-06",
    description: "Search by year/month/day",
  },
];

const SearchTips = memo(function SearchTips({
  showSearchTips,
  query,
  setQuery,
}: SearchTipsProps) {
  if (!(showSearchTips || query)) return null;

  return (
    <div className="mt-4 rounded-xl border border-[#565f89]/30 bg-[#1a1b26]/40 p-4 transition-all duration-200">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {searchTips.map((tip) => (
          <button
            key={tip.tip}
            type="button"
            className="group flex cursor-pointer items-center gap-2 text-left transition-transform duration-150 hover:scale-[1.015]"
            onClick={() => setQuery(tip.tip)}
          >
            <tip.Icon className="text-xl text-[#a9b1d6]" />
            <div className="flex-1">
              <code className="rounded bg-[#1a1b26] px-2 py-1 text-xs text-[#7aa2f7] transition-colors group-hover:text-[#bb9af7]">
                {tip.tip}
              </code>
              <p className="mt-1 text-xs text-[#a9b1d6]">{tip.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});

export default SearchTips;
