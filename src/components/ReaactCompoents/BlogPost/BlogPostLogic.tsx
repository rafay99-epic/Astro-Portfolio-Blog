import { useState } from "react";

export interface Post {
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

interface BlogSectionLogicProps {
  posts: Post[];
  children: (
    currentPosts: Post[],
    totalPages: number,
    currentPage: number,
    handlePageChange: (page: number) => void
  ) => JSX.Element;
}

const BlogSectionLogic: React.FC<BlogSectionLogicProps> = ({
  posts,
  children,
}) => {
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
};

export default BlogSectionLogic;
