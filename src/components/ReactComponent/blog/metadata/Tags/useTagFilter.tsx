// import { useState, useEffect } from "react";
// import type { Post } from "types/articles";

// export const useTagFilter = (posts: Post[]) => {
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [tags, setTags] = useState<string[]>([]);
//   const [fade, setFade] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 10;

//   useEffect(() => {
//     const publishedPosts = posts.filter((post) => !post.data.draft);
//     const allTags = Array.from(
//       new Set(publishedPosts.flatMap((post) => post.data.tags || []))
//     ).sort((a, b) => a.localeCompare(b));

//     setTags(allTags);
//   }, [posts]);

//   const filteredPosts = (
//     selectedTag
//       ? posts
//           .filter((post) => !post.data.draft)
//           .filter((post) => post.data.tags?.includes(selectedTag))
//       : posts.filter((post) => !post.data.draft)
//   ).sort((a, b) => {
//     return (
//       new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
//     );
//   });

//   const paginatedPosts = filteredPosts.slice(
//     (currentPage - 1) * postsPerPage,
//     currentPage * postsPerPage
//   );

//   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

//   useEffect(() => {
//     setFade(true);
//     const timeoutId = setTimeout(() => setFade(false), 300);
//     return () => clearTimeout(timeoutId);
//   }, [selectedTag, currentPage]);

//   const handleTagClick = (tag: string) => {
//     setSelectedTag(tag === selectedTag ? null : tag);
//     setCurrentPage(1);
//   };

//   return {
//     tags,
//     paginatedPosts,
//     fade,
//     selectedTag,
//     handleTagClick,
//     currentPage,
//     totalPages,
//     setCurrentPage,
//   };
// };
