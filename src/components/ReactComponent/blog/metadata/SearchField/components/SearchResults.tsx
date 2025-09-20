import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SearchResultsProps } from "types/search";

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

const SearchResults = memo(function SearchResults({
  query,
  results,
  selectedResultIndex,
  setSelectedResultIndex,
}: SearchResultsProps) {
  if (!query || results.length === 0) return null;

  return (
    <AnimatePresence mode="wait">
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
          <SearchResultItem
            key={post.slug}
            post={post}
            index={index}
            selectedResultIndex={selectedResultIndex}
            setSelectedResultIndex={setSelectedResultIndex}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
});

const SearchResultItem = memo(function SearchResultItem({
  post,
  index,
  selectedResultIndex,
  setSelectedResultIndex,
}: {
  post: SearchResultsProps["results"][0];
  index: number;
  selectedResultIndex: number;
  setSelectedResultIndex: (index: number) => void;
}) {
  return (
    <motion.div
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
        className="block rounded-2xl border border-[#565f89]/30 bg-[#24283b]/60 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#7aa2f7]/10"
        onMouseEnter={() => setSelectedResultIndex(index)}
      >
        <h3 className="mb-2 text-xl font-bold text-[#c0caf5] transition-colors group-hover:text-[#7aa2f7]">
          {post.data.title}
        </h3>
        <p className="mb-4 text-[#a9b1d6]">{post.data.description}</p>
        {post.data.tags && (
          <div className="flex flex-wrap gap-2">
            {post.data.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-[#1a1b26] px-2 py-1 text-xs text-[#7aa2f7]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </a>
    </motion.div>
  );
});

export default SearchResults;
