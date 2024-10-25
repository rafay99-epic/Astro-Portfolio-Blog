import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import type { Post } from "./types";

interface UseSearchResult {
  query: string;
  setQuery: (value: string) => void;
  results: Post[];
  authorFilter: string;
  setAuthorFilter: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
}

const useSearch = (posts: Post[]): UseSearchResult => {
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

  return {
    query,
    setQuery,
    results,
    authorFilter,
    setAuthorFilter,
    startDate,
    setStartDate,
  };
};

export default useSearch;
