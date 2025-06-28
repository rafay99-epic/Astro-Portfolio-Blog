import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSearch from "./SearchLogic";
import { useIsMobile } from "@hooks/useIsMobile";
import type { Post } from "types/articles";

interface SearchProps {
  posts: Post[];
}

const Search: React.FC<SearchProps> = ({ posts }) => {
  const { query, setQuery, results, searchStats } = useSearch(posts);

  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchTips, setShowSearchTips] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);

  // Keyboard navigation
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
              prev < results.length - 1 ? prev + 1 : prev
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
    [isSearchFocused, results, selectedResultIndex, setQuery]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedResultIndex(-1);
  }, [results]);

  // Scroll selected result into view
  useEffect(() => {
    if (selectedResultIndex >= 0) {
      const selectedElement = document.querySelector(
        `[data-result-index="${selectedResultIndex}"]`
      );
      selectedElement?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedResultIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Enhanced search tips with examples
  const searchTips = [
    { icon: "🔍", tip: '"exact phrase"', description: "Search exact phrase" },
    { icon: "✨", tip: "+must_have", description: "Must include word" },
    { icon: "❌", tip: "-exclude", description: "Exclude word" },
    { icon: "#️⃣", tip: "tag: react", description: "Search by tag" },
    { icon: "👤", tip: "author: name", description: "Search by author" },
    { icon: "📅", tip: "date: 2024", description: "Search by date" },
  ];

  return (
    <section className="relative overflow-hidden py-8 px-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7aa2f7] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#bb9af7] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className={`font-bold mb-4 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent ${
              isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Search Articles
          </motion.h1>
          <motion.p
            className={`text-[#a9b1d6] max-w-2xl mx-auto ${
              isMobile ? "text-sm" : "text-lg"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Smart search across titles, tags, authors, and content
          </motion.p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 rounded-3xl p-6 md:p-8 shadow-2xl">
            {/* Search Input */}
            <div className="relative flex items-center mb-4">
              <motion.div
                className="absolute left-4 flex items-center h-full text-xl"
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
                className={`w-full bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#c0caf5] placeholder-[#a9b1d6] rounded-xl transition-all duration-300 focus:outline-none focus:border-[#7aa2f7] focus:shadow-lg focus:shadow-[#7aa2f7]/20 ${
                  isMobile
                    ? "py-3 pl-12 pr-10 text-base"
                    : "py-4 pl-14 pr-12 text-lg"
                }`}
              />

              {/* Keyboard shortcuts help */}
              <div className="absolute right-14 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[#565f89] text-sm">
                {!isMobile && !query && (
                  <span className="hidden md:flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-[#1a1b26] rounded text-[#565f89] text-xs">
                      /
                    </kbd>
                    <span>to focus</span>
                  </span>
                )}
                {isSearchFocused && results.length > 0 && (
                  <span className="hidden md:flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-[#1a1b26] rounded text-[#565f89] text-xs">
                      ↑↓
                    </kbd>
                    <span>to navigate</span>
                    <kbd className="px-2 py-1 bg-[#1a1b26] rounded text-[#565f89] text-xs">
                      ↵
                    </kbd>
                    <span>to select</span>
                  </span>
                )}
              </div>

              {query && (
                <motion.button
                  className="absolute right-4 flex items-center h-full text-[#a9b1d6] hover:text-[#c0caf5] transition-colors duration-300"
                  onClick={() => {
                    setQuery("");
                    setSelectedResultIndex(-1);
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Clear search"
                >
                  ✕
                </motion.button>
              )}
            </div>

            {/* Search Tips */}
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

            {/* Search Stats */}
            {query && (
              <motion.div
                className="mt-4 p-4 bg-[#1a1b26]/40 border border-[#565f89]/30 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[#a9b1d6]">
                      {results.length > 0 ? (
                        <>
                          Found{" "}
                          <span className="text-[#7aa2f7] font-semibold">
                            {searchStats.totalResults}
                          </span>{" "}
                          results in{" "}
                          <span className="text-[#bb9af7] font-semibold">
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
                            className="px-2 py-1 bg-[#1a1b26] rounded text-[#7aa2f7] text-xs"
                          >
                            {field.split(".").pop()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {query && results.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-4"
              role="listbox"
              aria-label="Search results"
            >
              {results.map((post, index) => (
                <motion.div
                  key={post.slug}
                  data-result-index={index}
                  variants={itemVariants}
                  className={`group relative ${
                    selectedResultIndex === index
                      ? "ring-2 ring-[#7aa2f7] ring-opacity-50"
                      : ""
                  }`}
                  whileHover={{ scale: 1.01 }}
                  role="option"
                  aria-selected={selectedResultIndex === index}
                >
                  <a
                    href={`/blog/${post.slug}`}
                    className="block p-6 rounded-2xl backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#7aa2f7]/10"
                    onMouseEnter={() => setSelectedResultIndex(index)}
                  >
                    <h3 className="text-xl font-bold text-[#c0caf5] mb-2 group-hover:text-[#7aa2f7] transition-colors">
                      {post.data.title}
                    </h3>
                    <p className="text-[#a9b1d6] mb-4">
                      {post.data.description}
                    </p>
                    {post.data.tags && (
                      <div className="flex flex-wrap gap-2">
                        {post.data.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-[#1a1b26] rounded text-[#7aa2f7]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Search;
