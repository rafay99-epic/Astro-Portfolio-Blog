import BlogSectionLogic from "./BlogPostLogic"; // Adjust the import path based on your project structure
import BlogSectionUI from "./BlogPostUI"; // Adjust the import path based on your project structure

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

interface BlogSectionProps {
  posts: Post[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  return (
    <BlogSectionLogic posts={posts}>
      {(currentPosts, totalPages, currentPage, handlePageChange) => (
        <BlogSectionUI
          currentPosts={currentPosts}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </BlogSectionLogic>
  );
};

export default BlogSection;
