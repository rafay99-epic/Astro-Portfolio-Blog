import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import type { Post } from "./types";

interface UseSearchResult {
  query: string;
  setQuery: (value: string) => void;
  results: Post[];
  searchCategory: string;
  setSearchCategory: (value: string) => void;
}
const useSearch = (posts: Post[]): UseSearchResult => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Post[]>([]);
  const [searchCategory, setSearchCategory] = useState<string>("title");

  useEffect(() => {
    let filteredPosts = posts.filter((post) => !post.data.draft);

    if (query) {
      const keys = {
        title: ["data.title"],
        description: ["data.description"],
        author: ["data.authorName"],
        tag: ["data.tags"],
        date: ["data.pubDate"],
      };
      const fuse = new Fuse(filteredPosts, {
        keys: keys[searchCategory as keyof typeof keys],
        threshold: 0.3,
      });
      const searchResults = fuse.search(query).map((result) => result.item);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, searchCategory, posts]);

  return {
    query,
    setQuery,
    results,
    searchCategory,
    setSearchCategory,
  };
};

export default useSearch;
