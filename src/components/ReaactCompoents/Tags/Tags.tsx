import React from "react";
import { useTagFilter } from "./useTagFilter";
import type { Post } from "../../../types/articles";

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
    <div className="p-4">
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`rounded-lg py-2 px-3 transition duration-300 transform cursor-pointer 
                ${
                  selectedTag === tag
                    ? "bg-[#7aa2f7] text-white scale-105"
                    : "bg-gray-600 text-gray-200 hover:bg-[#7aa2f7] hover:text-white hover:scale-105"
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
        <h2 className="font-bold text-3xl">Articles:</h2>
        <ul
          className={`transition-opacity duration-300 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {paginatedPosts.map((post) => (
            <li key={post.slug} className="mt-2">
              <a
                href={`/blog/${post.slug}`}
                className="text-white hover:underline"
              >
                {post.data.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-500 rounded text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-500 rounded text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagFilter;
