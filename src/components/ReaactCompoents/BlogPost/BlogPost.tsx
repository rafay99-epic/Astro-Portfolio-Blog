import BlogSectionLogic from "./BlogPostLogic";
import BlogSectionUI from "./BlogPostUI";
import type { Post } from "../../../types/articles";
import { AnimatePresence } from "framer-motion";

interface BlogSectionProps {
  posts: Post[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center mt-[-10vh] space-y-6 p-8 ">
        <h2 className="text-3xl font-bold text-[#7aa2f7] tracking-wide">
          No Blogs Available Yet
        </h2>
        <p className="text-lg text-gray-400">
          Stay tuned! New content is coming soon. In the meantime, check out the
          Newsletter or subscribe for updates.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#7aa2f7] text-white font-medium rounded-lg shadow-md hover:bg-[#5f90e8] transition duration-300"
        >
          Go Back to Home
        </a>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
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
    </AnimatePresence>
  );
};

export default BlogSection;
