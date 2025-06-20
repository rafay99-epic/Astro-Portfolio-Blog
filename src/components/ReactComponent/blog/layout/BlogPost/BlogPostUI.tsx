import { motion } from "framer-motion";
import { useState } from "react";
import type { Post } from "types/articles";

interface BlogSectionUIProps {
  currentPosts: Post[];
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

type ViewType = "grid" | "list" | "compact";

const BlogSectionUI: React.FC<BlogSectionUIProps> = ({
  currentPosts,
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  const [currentView, setCurrentView] = useState<ViewType>("grid");

  const ViewSwitcher = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="bg-[var(--accent-dark)] rounded-lg p-1 flex gap-1 shadow-lg">
        <button
          onClick={() => setCurrentView("grid")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            currentView === "grid"
              ? "bg-[var(--accent)] text-white shadow-lg"
              : "text-[var(--text-light)] hover:bg-[var(--accent)]/20"
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Grid
        </button>
        <button
          onClick={() => setCurrentView("list")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            currentView === "list"
              ? "bg-[var(--accent)] text-white shadow-lg"
              : "text-[var(--text-light)] hover:bg-[var(--accent)]/20"
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          List
        </button>
        <button
          onClick={() => setCurrentView("compact")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            currentView === "compact"
              ? "bg-[var(--accent)] text-white shadow-lg"
              : "text-[var(--text-light)] hover:bg-[var(--accent)]/20"
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              clipRule="evenodd"
            />
          </svg>
          Compact
        </button>
      </div>
    </div>
  );

  const GridView = () => (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {currentPosts.map((post) => (
        <motion.div
          key={post.slug}
          className="relative group rounded-lg overflow-hidden bg-[var(--accent-dark)] shadow-lg transition-all duration-300"
          whileHover={{
            y: -8,
            rotateX: 5,
            rotateY: 5,
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <a
            href={`/blog/${post.slug}/`}
            className="block group h-full relative"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[var(--accent)]/20 via-purple-500/20 to-[var(--accent)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>

            <motion.img
              src={post.data.heroImage || "/default-image.jpg"}
              alt={post.data.title}
              className="w-full h-48 object-cover transition-all duration-300 group-hover:brightness-110 group-hover:contrast-110"
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="p-6 relative">
              <h2 className="text-xl font-semibold text-[var(--text-light)] group-hover:text-[var(--accent)] transition-all duration-300 mb-3 line-clamp-2 group-hover:transform group-hover:scale-105">
                {post.data.title}
              </h2>
              <div className="text-sm text-[var(--text-light)] opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                <p>{new Date(post.data.pubDate).toLocaleDateString()}</p>
                <p className="mt-1">By {post.data.authorName}</p>
              </div>
            </div>

            {/* Animated corner accent */}
            <div className="absolute top-3 right-3 w-3 h-3 bg-[var(--accent)] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125"></div>
          </a>
        </motion.div>
      ))}
    </section>
  );

  const ListView = () => (
    <section className="space-y-6">
      {currentPosts.map((post) => (
        <motion.div
          key={post.slug}
          className="bg-[var(--accent-dark)] rounded-lg overflow-hidden shadow-lg transition-all duration-300 relative group"
          whileHover={{
            x: 10,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          <a href={`/blog/${post.slug}/`} className="flex group">
            {/* Left accent bar */}
            <div className="w-1 bg-gradient-to-b from-[var(--accent)] to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <motion.img
              src={post.data.heroImage || "/default-image.jpg"}
              alt={post.data.title}
              className="w-48 h-32 object-cover transition-all duration-300 group-hover:saturate-150 group-hover:brightness-110"
            />
            <div className="p-6 flex-1 relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <h2 className="text-xl font-semibold text-[var(--text-light)] group-hover:text-[var(--accent)] transition-all duration-300 mb-2 relative z-10">
                {post.data.title}
              </h2>
              <p className="text-[var(--text-light)] opacity-70 text-sm mb-3 line-clamp-2 group-hover:opacity-90 transition-opacity duration-300 relative z-10">
                {post.data.description ||
                  "Click to read more about this article..."}
              </p>
              <div className="text-sm text-[var(--text-light)] opacity-60 flex items-center gap-4 group-hover:opacity-80 transition-opacity duration-300 relative z-10">
                <span>{new Date(post.data.pubDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>By {post.data.authorName}</span>
              </div>
            </div>
          </a>
        </motion.div>
      ))}
    </section>
  );

  const CompactView = () => (
    <section className="space-y-3">
      {currentPosts.map((post) => (
        <motion.div
          key={post.slug}
          className="bg-[var(--accent-dark)] rounded-lg shadow-md transition-all duration-300 relative overflow-hidden group"
          whileHover={{
            scale: 1.02,
            backgroundColor: "var(--accent-dark)",
          }}
        >
          <a
            href={`/blog/${post.slug}/`}
            className="flex items-center p-4 group relative"
          >
            {/* Sliding background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>

            <img
              src={post.data.heroImage || "/default-image.jpg"}
              alt={post.data.title}
              className="w-16 h-16 object-cover rounded-lg mr-4 transition-all duration-300 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-[var(--accent)]/30"
            />
            <div className="flex-1 relative z-10">
              <h3 className="text-lg font-medium text-[var(--text-light)] group-hover:text-[var(--accent)] transition-all duration-300 line-clamp-1 group-hover:transform group-hover:translate-x-2">
                {post.data.title}
              </h3>
              <div className="text-sm text-[var(--text-light)] opacity-60 flex items-center gap-3 mt-1 group-hover:opacity-80 transition-all duration-300">
                <span>{new Date(post.data.pubDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.data.authorName}</span>
              </div>
            </div>

            {/* Arrow indicator */}
            <div className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </a>
        </motion.div>
      ))}
    </section>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case "grid":
        return <GridView />;
      case "list":
        return <ListView />;
      case "compact":
        return <CompactView />;
      default:
        return <GridView />;
    }
  };

  return (
    <motion.main
      className="max-w-7xl mx-auto px-6 lg:px-8 pt-1 pb-12"
      exit={{ opacity: 0, y: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ backgroundColor: "var(--accent-dark)" }}
    >
      <h1 className="text-5xl font-extrabold text-center text-[var(--text-light)] mb-8">
        Latest Articles
      </h1>

      <ViewSwitcher />

      {renderCurrentView()}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex gap-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  index + 1 === currentPage
                    ? "bg-[var(--accent)] text-white shadow-lg transform scale-110"
                    : "bg-[var(--accent-dark)] text-[var(--text-light)] hover:bg-[var(--accent)]/20 hover:transform hover:scale-105 shadow-md"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
      )}
    </motion.main>
  );
};

export default BlogSectionUI;
