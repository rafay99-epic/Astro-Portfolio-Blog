import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSearch from "./SearchLogic";
import { useIsMobile } from "@hooks/useIsMobile";
import type { Post } from "types/articles";

interface SearchProps {
  posts: Post[];
}

const Search: React.FC<SearchProps> = ({ posts }) => {
  const { query, setQuery, results, searchCategory, setSearchCategory } =
    useSearch(posts);

  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  const searchIcons = {
    title: "📄",
    description: "📝",
    author: "👤",
    tag: "🏷️",
    date: "📅",
  };

  return (
    <section className="relative overflow-hidden py-8 px-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7aa2f7] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#bb9af7] rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-32 h-32 bg-[#9ece6a] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <motion.div
          className="text-center mb-12"
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
            Find exactly what you're looking for with our powerful search engine
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-6 h-0.5 bg-gradient-to-r from-transparent via-[#7aa2f7] to-transparent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isMobile ? "120px" : "200px" }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>

        {/* Search Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 rounded-3xl p-6 md:p-8 shadow-2xl">
            {/* Search Controls */}
            <div
              className={`flex gap-4 mb-8 ${isMobile ? "flex-col" : "flex-row"}`}
            >
              {/* Search Input */}
              <motion.div
                className={`relative ${isMobile ? "w-full" : "flex-1"}`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl"
                    animate={{
                      scale: isSearchFocused ? 1.1 : 1,
                      rotate: isSearchFocused ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    🔍
                  </motion.div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search articles..."
                    className={`w-full bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#c0caf5] placeholder-[#a9b1d6] rounded-xl transition-all duration-300 focus:outline-none focus:border-[#7aa2f7] focus:shadow-lg focus:shadow-[#7aa2f7]/20 ${
                      isMobile
                        ? "py-3 pl-12 pr-4 text-base"
                        : "py-4 pl-14 pr-6 text-lg"
                    }`}
                  />

                  {/* Search input glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7aa2f7]/20 via-transparent to-[#bb9af7]/20 opacity-0 pointer-events-none"
                    animate={{ opacity: isSearchFocused ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Clear button */}
                {query && (
                  <motion.button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#a9b1d6] hover:text-[#c0caf5] transition-colors duration-200"
                    onClick={() => setQuery("")}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                )}
              </motion.div>

              {/* Category Selector */}
              <motion.div
                className={`relative ${isMobile ? "w-full" : "w-64"}`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className={`w-full bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#c0caf5] rounded-xl transition-all duration-300 focus:outline-none focus:border-[#7aa2f7] focus:shadow-lg focus:shadow-[#7aa2f7]/20 appearance-none cursor-pointer ${
                      isMobile
                        ? "py-3 pl-4 pr-10 text-base"
                        : "py-4 pl-6 pr-12 text-lg"
                    }`}
                    style={{
                      backgroundImage: "none",
                      color: "#c0caf5",
                    }}
                  >
                    <option
                      value="title"
                      style={{ backgroundColor: "#1a1b26", color: "#c0caf5" }}
                    >
                      📄 Search by Title
                    </option>
                    <option
                      value="description"
                      style={{ backgroundColor: "#1a1b26", color: "#c0caf5" }}
                    >
                      📝 Search by Description
                    </option>
                    <option
                      value="author"
                      style={{ backgroundColor: "#1a1b26", color: "#c0caf5" }}
                    >
                      👤 Search by Author
                    </option>
                    <option
                      value="tag"
                      style={{ backgroundColor: "#1a1b26", color: "#c0caf5" }}
                    >
                      🏷️ Search by Tag
                    </option>
                    <option
                      value="date"
                      style={{ backgroundColor: "#1a1b26", color: "#c0caf5" }}
                    >
                      📅 Search by Date
                    </option>
                  </select>

                  {/* Custom dropdown arrow */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <motion.div
                      className="text-[#a9b1d6]"
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Search Stats */}
            {query && (
              <motion.div
                className="mb-6 p-4 bg-[#1a1b26]/40 border border-[#565f89]/30 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p
                  className={`text-[#a9b1d6] ${isMobile ? "text-sm" : "text-base"}`}
                >
                  {results.length > 0 ? (
                    <>
                      Found{" "}
                      <span className="text-[#7aa2f7] font-semibold">
                        {results.length}
                      </span>{" "}
                      article{results.length !== 1 ? "s" : ""} matching{" "}
                      <span className="text-[#c0caf5] font-semibold">
                        "{query}"
                      </span>{" "}
                      in{" "}
                      <span className="text-[#bb9af7] font-semibold">
                        {searchCategory}
                      </span>
                    </>
                  ) : (
                    <>
                      No articles found for{" "}
                      <span className="text-[#c0caf5] font-semibold">
                        "{query}"
                      </span>{" "}
                      in{" "}
                      <span className="text-[#bb9af7] font-semibold">
                        {searchCategory}
                      </span>
                    </>
                  )}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {query && (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className={`font-bold mb-8 bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent ${
                  isMobile ? "text-xl" : "text-2xl"
                }`}
                variants={itemVariants}
              >
                Search Results
              </motion.h2>

              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {results.length > 0 ? (
                  results.map((post, index) => (
                    <motion.div
                      key={`${post.slug}-${index}`}
                      className="group"
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <a
                        href={`/blog/${post.slug}`}
                        className="block relative overflow-hidden rounded-2xl backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 shadow-xl hover:shadow-2xl hover:shadow-[#7aa2f7]/10 transition-all duration-500"
                      >
                        <div className={`p-6 ${isMobile ? "p-4" : "p-6"}`}>
                          {/* Article header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <motion.h3
                                className={`font-bold mb-2 bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent group-hover:from-[#7aa2f7] group-hover:to-[#bb9af7] transition-all duration-300 ${
                                  isMobile ? "text-lg" : "text-xl"
                                }`}
                                whileHover={{ scale: 1.01 }}
                              >
                                {post.data.title}
                              </motion.h3>

                              {/* Meta information */}
                              <div className="flex flex-wrap items-center gap-4 mb-3">
                                <div className="flex items-center gap-1 text-[#a9b1d6] text-sm">
                                  <span className="text-base">📅</span>
                                  <span>
                                    {new Date(
                                      post.data.pubDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-[#a9b1d6] text-sm">
                                  <span className="text-base">👤</span>
                                  <span>{post.data.authorName}</span>
                                </div>
                                {post.data.tags && (
                                  <div className="flex items-center gap-1 text-[#a9b1d6] text-sm">
                                    <span className="text-base">🏷️</span>
                                    <span>
                                      {post.data.tags.length} tag
                                      {post.data.tags.length !== 1 ? "s" : ""}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Read more indicator */}
                            <motion.div
                              className="flex items-center gap-2 text-[#7aa2f7] font-medium text-sm group-hover:text-[#bb9af7] transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              <span className={isMobile ? "hidden" : "block"}>
                                Read Article
                              </span>
                              <motion.span
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                →
                              </motion.span>
                            </motion.div>
                          </div>

                          {/* Description */}
                          {post.data.description && (
                            <p
                              className={`text-[#a9b1d6] leading-relaxed group-hover:text-[#c0caf5] transition-colors duration-300 ${
                                isMobile
                                  ? "text-sm line-clamp-2"
                                  : "text-base line-clamp-3"
                              }`}
                            >
                              {post.data.description}
                            </p>
                          )}

                          {/* Tags */}
                          {post.data.tags && post.data.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {post.data.tags
                                .slice(0, isMobile ? 3 : 5)
                                .map((tag) => (
                                  <span
                                    key={tag}
                                    className={`bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#a9b1d6] font-medium rounded-lg transition-all duration-300 group-hover:border-[#7aa2f7]/50 group-hover:text-[#c0caf5] ${
                                      isMobile
                                        ? "px-2 py-1 text-xs"
                                        : "px-3 py-1 text-sm"
                                    }`}
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              {post.data.tags.length > (isMobile ? 3 : 5) && (
                                <span
                                  className={`text-[#a9b1d6] ${isMobile ? "text-xs" : "text-sm"}`}
                                >
                                  +{post.data.tags.length - (isMobile ? 3 : 5)}{" "}
                                  more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Search match indicator */}
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs text-[#9ece6a] font-medium">
                              {
                                searchIcons[
                                  searchCategory as keyof typeof searchIcons
                                ]
                              }{" "}
                              Match found in {searchCategory}
                            </span>
                          </div>
                        </div>

                        {/* Hover effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7]/5 via-transparent to-[#bb9af7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Bottom accent line */}
                        <div className="h-1 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </a>
                    </motion.div>
                  ))
                ) : query ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-2xl p-8 shadow-xl">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3
                        className={`font-semibold text-[#c0caf5] mb-2 ${isMobile ? "text-lg" : "text-xl"}`}
                      >
                        No articles found
                      </h3>
                      <p
                        className={`text-[#a9b1d6] mb-4 ${isMobile ? "text-sm" : "text-base"}`}
                      >
                        We couldn't find any articles matching "
                        <span className="text-[#7aa2f7] font-semibold">
                          {query}
                        </span>
                        " in {searchCategory}.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="text-xs text-[#a9b1d6]">
                          Try searching in:
                        </span>
                        {Object.entries(searchIcons)
                          .filter(([key]) => key !== searchCategory)
                          .map(([key, icon]) => (
                            <button
                              key={key}
                              onClick={() => setSearchCategory(key)}
                              className="flex items-center gap-1 px-3 py-1 bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#a9b1d6] rounded-lg hover:border-[#7aa2f7]/50 hover:text-[#c0caf5] transition-all duration-300 text-xs"
                            >
                              <span>{icon}</span>
                              <span className="capitalize">{key}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!query && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="backdrop-blur-xl bg-[#24283b]/30 border border-[#565f89]/20 rounded-2xl p-12 shadow-xl">
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🔍
              </motion.div>
              <h3
                className={`font-semibold text-[#c0caf5] mb-4 ${isMobile ? "text-xl" : "text-2xl"}`}
              >
                Start Your Search
              </h3>
              <p
                className={`text-[#a9b1d6] max-w-md mx-auto ${isMobile ? "text-sm" : "text-base"}`}
              >
                Enter keywords above to discover articles, authors, tags, and
                more. Our search engine will help you find exactly what you're
                looking for.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Search;
