import { motion } from "framer-motion";
import type { Post } from "../scheme/types";

interface BlogSectionUIProps {
  currentPosts: Post[];
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const BlogSectionUI: React.FC<BlogSectionUIProps> = ({
  currentPosts,
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <motion.main
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      exit={{ opacity: 0, y: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ backgroundColor: "var(--accent-dark)" }}
    >
      <h1 className="text-6xl p-7 font-bold">Articles</h1>
      <section>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 list-none">
          {currentPosts.map((post) => (
            <li
              key={post.slug}
              className="relative rounded-lg shadow-lg overflow-hidden flex flex-col"
              style={{ boxShadow: "var(--box-shadow)" }}
            >
              <a href={`/blog/${post.slug}/`} className="block group h-full">
                <img
                  src={post.data.heroImage || ""}
                  alt="Blog Image"
                  width={720}
                  height={360}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-80 transition duration-300"
                />
                <div className="p-4 bg-gray-dark flex flex-col justify-between rounded-b-lg">
                  <h2 className="text-lg font-semibold text-text-light group-hover:text-[#7aa2f7] transition duration-200">
                    {post.data.title}
                  </h2>
                  <div className="text-gray-light text-base mt-2 group-hover:text-[#7aa2f7]">
                    <p>{new Date(post.data.pubDate).toLocaleDateString()}</p>
                    <p>Insights from {post.data.authorName}</p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex justify-center">
        <nav className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                index + 1 === currentPage
                  ? "bg-[#7aa2f7] text-white"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </motion.main>
  );
};

export default BlogSectionUI;
