import React from "react";
import useSearch from "@react/SearchField/SearchLogic";
import type { Post } from "types/articles";

interface SearchProps {
  posts: Post[];
}

const searchStyles = {
  primary: "#7aa2f7",
  text: "#F8F8F8",
  background: "#1f2335",
  border: "#7aa2f7",
};

const Search: React.FC<SearchProps> = ({ posts }) => {
  const { query, setQuery, results, searchCategory, setSearchCategory } =
    useSearch(posts);

  return (
    <div className="p-4 text-white">
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full p-2 border-2 focus:outline-none"
          style={{
            backgroundColor: searchStyles.background,
            color: searchStyles.text,
            borderColor: searchStyles.border,
            borderRadius: "8px",
            fontFamily: "sans-serif",
          }}
        />

        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="p-2 border-2"
          style={{
            backgroundColor: searchStyles.background,
            color: searchStyles.text,
            borderColor: searchStyles.border,
            borderRadius: "8px",
          }}
        >
          <option value="title">Title</option>
          <option value="description">Description</option>
          <option value="author">Author</option>
          <option value="tag">Tag</option>
          <option value="date">Date</option>
        </select>
      </div>

      {/* Display Results */}
      <div className="space-y-4">
        {results.length > 0
          ? results.map((post, index) => (
              <div
                key={index}
                className="p-4 border-2"
                style={{
                  borderColor: searchStyles.border,
                  borderRadius: "8px",
                }}
              >
                <h2 className="text-xl" style={{ color: searchStyles.primary }}>
                  <a
                    href={`/blog/${post.slug}`}
                    className="hover:underline"
                    style={{ color: searchStyles.primary }}
                  >
                    {post.data.title}
                  </a>
                </h2>
                <p className="text-gray-300">{post.data.description}</p>
                <p className="text-gray-500 text-sm">
                  By {post.data.authorName} |{" "}
                  {new Date(post.data.pubDate).toLocaleDateString()}
                </p>
              </div>
            ))
          : query && <p className="text-gray-400">No blog post was found.</p>}
      </div>
    </div>
  );
};

export default Search;
