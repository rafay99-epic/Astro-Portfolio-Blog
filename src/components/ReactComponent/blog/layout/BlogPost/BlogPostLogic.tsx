import { useState, memo } from "react";
import type { Post } from "types/articles";

interface BlogSectionLogicProps {
  posts: Post[];
  children: (
    currentPosts: Post[],
    totalPages: number,
    currentPage: number,
    handlePageChange: (page: number) => void
  ) => React.ReactNode;
}

const BlogSectionLogic = memo(function BlogSectionLogic({
  posts,
  children,
}: BlogSectionLogicProps) {
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPosts = posts.filter((post) =>
    import.meta.env.PROD ? !post.data.draft : true
  );

  const sortedPosts = totalPosts.sort((a, b) => {
    return (
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
    );
  });

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>{children(currentPosts, totalPages, currentPage, handlePageChange)}</>
  );
});

export default BlogSectionLogic;
