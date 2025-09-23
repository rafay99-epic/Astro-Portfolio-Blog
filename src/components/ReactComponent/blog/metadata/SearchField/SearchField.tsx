import { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import useSearch from "@hooks/useSearch";
import { useIsMobile } from "@hooks/useIsMobile";
import type { Post } from "types/articles";
import SearchInput from "@react/blog/metadata/SearchField/components/SearchInput";
import SearchTips from "@react/blog/metadata/SearchField/components/SearchTips";
import SearchStats from "@react/blog/metadata/SearchField/components/SearchStats";
import SearchResults from "@react/blog/metadata/SearchField/components/SearchResults";

interface SearchProps {
  posts: Post[];
}

const Search = memo(function Search({ posts }: SearchProps) {
  const { query, setQuery, results, searchStats } = useSearch(posts);
  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchTips, setShowSearchTips] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "/" && !isSearchFocused) {
        e.preventDefault();
        const searchInput =
          document.querySelector<HTMLInputElement>("#search-input");
        searchInput?.focus();
      }

      if (isSearchFocused) {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setSelectedResultIndex((prev) =>
              prev < results.length - 1 ? prev + 1 : prev,
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setSelectedResultIndex((prev) => (prev > -1 ? prev - 1 : -1));
            break;
          case "Enter":
            if (selectedResultIndex >= 0 && results[selectedResultIndex]) {
              window.location.href = `/blog/${results[selectedResultIndex].slug}`;
            }
            break;
          case "Escape":
            e.preventDefault();
            setQuery("");
            setSelectedResultIndex(-1);
            break;
        }
      }
    },
    [isSearchFocused, results, selectedResultIndex, setQuery],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedResultIndex(-1);
  }, [results]);

  useEffect(() => {
    if (selectedResultIndex >= 0) {
      const selectedElement = document.querySelector(
        `[data-result-index="${selectedResultIndex}"]`,
      );
      selectedElement?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedResultIndex]);

  return (
    <section className="relative overflow-hidden px-4 py-8">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#7aa2f7] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-[#bb9af7] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className={`mb-4 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text font-bold text-transparent ${
              isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Search Articles
          </motion.h1>
          <motion.p
            className={`mx-auto max-w-2xl text-[#a9b1d6] ${
              isMobile ? "text-sm" : "text-lg"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Smart search across titles, tags, authors, and content
          </motion.p>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="rounded-3xl border border-[#565f89]/30 bg-[#24283b]/60 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <SearchInput
              query={query}
              setQuery={setQuery}
              isSearchFocused={isSearchFocused}
              setIsSearchFocused={setIsSearchFocused}
              setShowSearchTips={setShowSearchTips}
              setSelectedResultIndex={setSelectedResultIndex}
              isMobile={isMobile}
              resultsLength={results.length}
            />

            <SearchTips
              showSearchTips={showSearchTips}
              query={query}
              setQuery={setQuery}
            />

            <SearchStats
              query={query}
              results={results}
              searchStats={searchStats}
            />
          </div>
        </motion.div>

        <SearchResults
          query={query}
          results={results}
          selectedResultIndex={selectedResultIndex}
          setSelectedResultIndex={setSelectedResultIndex}
        />
      </div>
    </section>
  );
});

export default Search;
