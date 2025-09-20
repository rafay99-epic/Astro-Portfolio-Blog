import { memo } from "react";
import { motion } from "framer-motion";
import type { SearchInputProps } from "types/search";

const SearchInput = memo(function SearchInput({
  query,
  setQuery,
  isSearchFocused,
  setIsSearchFocused,
  setShowSearchTips,
  setSelectedResultIndex,
  isMobile,
  resultsLength,
}: SearchInputProps) {
  return (
    <div className="relative mb-4 flex items-center">
      <motion.div
        className="absolute left-4 flex h-full items-center text-xl"
        animate={{
          scale: isSearchFocused ? 1.1 : 1,
          rotate: isSearchFocused ? [0, -10, 10, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        🔍
      </motion.div>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          setIsSearchFocused(true);
          setShowSearchTips(true);
        }}
        onBlur={() => setIsSearchFocused(false)}
        placeholder="Search by title, tag, author, or content... (Press '/' to focus)"
        aria-label="Search articles"
        className={`w-full rounded-xl border border-[#565f89]/40 bg-[#1a1b26]/60 text-[#c0caf5] placeholder-[#a9b1d6] transition-all duration-300 focus:border-[#7aa2f7] focus:shadow-lg focus:shadow-[#7aa2f7]/20 focus:outline-none ${
          isMobile ? "py-3 pl-12 pr-10 text-base" : "py-4 pl-14 pr-12 text-lg"
        }`}
      />

      <KeyboardShortcuts
        isMobile={isMobile}
        query={query}
        isSearchFocused={isSearchFocused}
        resultsLength={resultsLength}
      />

      {query && (
        <ClearButton
          onClick={() => {
            setQuery("");
            setSelectedResultIndex(-1);
          }}
        />
      )}
    </div>
  );
});

const KeyboardShortcuts = memo(function KeyboardShortcuts({
  isMobile,
  query,
  isSearchFocused,
  resultsLength,
}: {
  isMobile: boolean;
  query: string;
  isSearchFocused: boolean;
  resultsLength: number;
}) {
  return (
    <div className="absolute right-14 top-1/2 flex -translate-y-1/2 items-center gap-2 text-sm text-[#565f89]">
      {!isMobile && !query && (
        <span className="hidden items-center gap-1 md:flex">
          <kbd className="rounded bg-[#1a1b26] px-2 py-1 text-xs text-[#565f89]">
            /
          </kbd>
          <span>to focus</span>
        </span>
      )}
      {isSearchFocused && resultsLength > 0 && (
        <span className="hidden items-center gap-1 md:flex">
          <kbd className="rounded bg-[#1a1b26] px-2 py-1 text-xs text-[#565f89]">
            ↑↓
          </kbd>
          <span>to navigate</span>
          <kbd className="rounded bg-[#1a1b26] px-2 py-1 text-xs text-[#565f89]">
            ↵
          </kbd>
          <span>to select</span>
        </span>
      )}
    </div>
  );
});

const ClearButton = memo(function ClearButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <motion.button
      className="absolute right-4 flex h-full items-center text-[#a9b1d6] transition-colors duration-300 hover:text-[#c0caf5]"
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Clear search"
    >
      ✕
    </motion.button>
  );
});

export default SearchInput;
