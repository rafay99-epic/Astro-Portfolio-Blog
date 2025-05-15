import { motion } from "framer-motion";
import type { Post } from "types/articles";

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
      className="max-w-7xl mx-auto px-6 lg:px-8 pt-1 pb-12"
      exit={{ opacity: 0, y: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ backgroundColor: "var(--accent-dark)" }}
    >
      <h1 className="text-5xl font-extrabold text-center text-text-light mb-8">
        Latest Articles
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <motion.div
            key={post.slug}
            className="relative group rounded-lg overflow-hidden bg-gray-dark transition-all duration-500 ease-in-out transform"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            }}
          >
            <a href={`/blog/${post.slug}/`} className="block group h-full">
              <motion.img
                src={post.data.heroImage || "/default-image.jpg"}
                alt={post.data.title}
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:object-center"
                style={{ willChange: "transform" }}
                whileHover={{ y: -10 }}
              />
              <div className="p-6 flex flex-col justify-between relative z-10">
                <motion.h2
                  className="text-xl font-semibold text-text-light group-hover:text-[#7aa2f7] transition-all duration-300"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {post.data.title}
                </motion.h2>

                <div className="mt-4 text-sm text-gray-400">
                  <p>{new Date(post.data.pubDate).toLocaleDateString()}</p>
                  <p className="mt-1">By {post.data.authorName}</p>
                </div>
              </div>

              <motion.div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            </a>
          </motion.div>
        ))}
      </section>

      <div className="mt-8 flex justify-center">
        <nav className="flex gap-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-5 py-2 rounded-full text-sm ${
                index + 1 === currentPage
                  ? "bg-[#7aa2f7] text-white"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              } transition-colors duration-300`}
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
