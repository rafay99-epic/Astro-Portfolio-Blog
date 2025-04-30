import React from "react";
import { useTagFilter } from "@react/Tags/useTagFilter";
import type { Post } from "types/articles";

interface TagFilterProps {
  posts: Post[];
}

const TagFilter: React.FC<TagFilterProps> = ({ posts }) => {
  const {
    tags,
    paginatedPosts,
    fade,
    selectedTag,
    handleTagClick,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useTagFilter(posts);

  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Filter by Tags
        </h2>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`transition duration-300 transform rounded-full py-2 px-4 text-base font-medium 
                ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white hover:scale-105"
                }`}
              onClick={() => handleTagClick(tag)}
              aria-pressed={selectedTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-2xl text-white mb-4">Articles:</h2>
        <ul
          className={`transition-opacity duration-300 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {paginatedPosts.map((post) => (
            <li key={post.slug} className="mb-4">
              <a
                href={`/blog/${post.slug}`}
                className="text-base text-blue-400 hover:text-blue-600 transition-colors"
              >
                {post.data.title}
              </a>
              <p className="text-base text-gray-400">{post.data.description}</p>
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-6 py-2 mx-2 bg-gray-600 text-white rounded-lg transition hover:bg-gray-500 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-base text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-6 py-2 mx-2 bg-gray-600 text-white rounded-lg transition hover:bg-gray-500 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagFilter;
