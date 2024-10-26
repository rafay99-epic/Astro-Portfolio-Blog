import { useState, useEffect } from "react";

type Post = {
  data: {
    title: string;
    tags: string[];
  };
  slug: string;
};

export const useTagFilter = (posts: Post[]) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const allTags = Array.from(
      new Set(posts.flatMap((post) => post.data.tags))
    ).sort((a, b) => a.localeCompare(b));
    setTags(allTags);
  }, [posts]);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.data.tags.includes(selectedTag))
    : posts;

  useEffect(() => {
    setFade(true);
    const timeoutId = setTimeout(() => setFade(false), 300);
    return () => clearTimeout(timeoutId);
  }, [selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  return { tags, filteredPosts, fade, selectedTag, handleTagClick };
};
