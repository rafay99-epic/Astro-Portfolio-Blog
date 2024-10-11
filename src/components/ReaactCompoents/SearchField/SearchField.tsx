import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

interface Post {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    heroImage?: string;
    draft: boolean;
    authorName: string;
    authorAvatar?: string;
  };
}

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
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Post[]>([]);
  const [authorFilter, setAuthorFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  useEffect(() => {
    let filteredPosts = [...posts];

    if (authorFilter) {
      filteredPosts = filteredPosts.filter((post) =>
        post.data.authorName.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    if (startDate) {
      filteredPosts = filteredPosts.filter(
        (post) => new Date(post.data.pubDate) >= new Date(startDate)
      );
    }

    if (query) {
      const fuse = new Fuse(filteredPosts, {
        keys: ["data.title", "data.description"],
        threshold: 0.3,
      });
      const searchResults = fuse.search(query).map((result) => result.item);
      setResults(searchResults);
    } else if (authorFilter || startDate) {
      setResults(filteredPosts);
    } else {
      setResults([]);
    }
  }, [query, authorFilter, startDate, posts]);

  return (
    <div className="p-4 text-white">
      <div className="mb-4">
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
      </div>

      <div className="mb-4 space-y-4">
        <div className="flex flex-wrap gap-4 items-start">
          <div className="w-full sm:w-1/3">
            <label className="block mb-1 text-gray-200">Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border-2 focus:outline-none"
              style={{
                backgroundColor: searchStyles.background,
                color: searchStyles.text,
                borderColor: searchStyles.border,
                borderRadius: "8px",
                fontFamily: "sans-serif",
                fontSize: "1rem",
              }}
            />
          </div>

          <div className="w-full sm:w-1/3">
            <label className="block mb-1 text-gray-200">Author:</label>
            <input
              type="text"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              placeholder="Filter by author"
              className="w-full p-2 border-2 focus:outline-none"
              style={{
                backgroundColor: searchStyles.background,
                color: searchStyles.text,
                borderColor: searchStyles.border,
                borderRadius: "8px",
                fontFamily: "sans-serif",
                fontSize: "1rem",
              }}
            />
          </div>
        </div>
      </div>

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
          : query && <p className="text-gray-400">No results found.</p>}
      </div>
    </div>
  );
};

export default Search;
