import React from "react";
import { motion } from "framer-motion";
import useSearch from "@react/blog/metadata/SearchField/SearchLogic";
import type { Post } from "types/articles";

interface SearchProps {
  posts: Post[];
}

const Search: React.FC<SearchProps> = ({ posts }) => {
  const { query, setQuery, results, searchCategory, setSearchCategory } =
    useSearch(posts);

  return (
    <div className="p-6 bg-[var(--accent-dark)] text-[var(--text-light)] rounded-xl">
      <div className="mb-6 flex flex-col md:flex-row gap-3 items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full md:w-2/3 p-3 rounded-lg border-2 focus:ring-2 outline-none transition-all bg-[var(--accent-dark)] text-[var(--text-light)] border-[var(--accent)] focus:ring-[var(--accent)]"
        />

        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="w-full md:w-1/3 p-3 rounded-lg border-2 bg-[var(--accent-dark)] text-[var(--text-light)] border-[var(--accent)] focus:outline-none"
        >
          <option value="title">Title</option>
          <option value="description">Description</option>
          <option value="author">Author</option>
          <option value="tag">Tag</option>
          <option value="date">Date</option>
        </select>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {results.length > 0
          ? results.map((post, index) => (
              <motion.div
                key={index}
                className="border border-[var(--accent)] rounded-lg p-5 bg-[#1a1b26] hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <h2 className="text-xl font-semibold mb-2 text-[var(--accent)]">
                  <a href={`/blog/${post.slug}`} className="hover:underline">
                    {post.data.title}
                  </a>
                </h2>
                <p className="text-sm opacity-80 mb-1">
                  {post.data.description || "No description available"}
                </p>
                <p className="text-xs opacity-60">
                  By {post.data.authorName} |{" "}
                  {new Date(post.data.pubDate).toLocaleDateString()}
                </p>
              </motion.div>
            ))
          : query && (
              <p className="text-center text-gray-400">
                No blog post was found.
              </p>
            )}
      </div>
    </div>
  );
};

export default Search;
