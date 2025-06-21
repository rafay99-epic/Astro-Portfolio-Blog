import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { Post } from "types/articles";
import { useIsMobile } from "@hooks/useIsMobile";

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
  const isMobile = useIsMobile();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const ViewSwitcher = () => (
    <motion.div
      className="flex items-center justify-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <div className="backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-2xl p-2 flex gap-2 shadow-xl">
        <motion.button
          onClick={() => setCurrentView("grid")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
            currentView === "grid"
              ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg shadow-[#7aa2f7]/25"
              : "text-[#a9b1d6] hover:text-[#c0caf5] hover:bg-[#1a1b26]/60"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          {!isMobile && "Grid"}
        </motion.button>
        <motion.button
          onClick={() => setCurrentView("list")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
            currentView === "list"
              ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg shadow-[#7aa2f7]/25"
              : "text-[#a9b1d6] hover:text-[#c0caf5] hover:bg-[#1a1b26]/60"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {!isMobile && "List"}
        </motion.button>
        <motion.button
          onClick={() => setCurrentView("compact")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
            currentView === "compact"
              ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg shadow-[#7aa2f7]/25"
              : "text-[#a9b1d6] hover:text-[#c0caf5] hover:bg-[#1a1b26]/60"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              clipRule="evenodd"
            />
          </svg>
          {!isMobile && "Compact"}
        </motion.button>
      </div>
    </motion.div>
  );

  const GridView = () => (
    <motion.section
      className={`grid gap-6 ${
        isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {currentPosts.map((post, index) => (
        <motion.div
          key={post.slug}
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
          className="group"
        >
          <a
            href={`/blog/${post.slug}/`}
            className="block relative overflow-hidden rounded-2xl backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 shadow-xl hover:shadow-2xl hover:shadow-[#7aa2f7]/10 transition-all duration-500"
          >
            {/* Image Section */}
            <div
              className={`relative overflow-hidden ${
                isMobile ? "h-48" : "h-52"
              }`}
            >
              <motion.img
                src={post.data.heroImage || "/default-image.jpg"}
                alt={post.data.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b26]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/20 via-transparent to-[#bb9af7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Date badge */}
              <div className="absolute top-4 right-4 bg-[#1a1b26]/80 backdrop-blur-sm border border-[#565f89]/50 text-[#c0caf5] text-xs font-medium px-3 py-1 rounded-lg">
                {new Date(post.data.pubDate).toLocaleDateString()}
              </div>
            </div>

            {/* Content Section */}
            <div className={`p-6 ${isMobile ? "p-4" : "p-6"}`}>
              {/* Title */}
              <motion.h2
                className={`font-bold mb-3 bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent group-hover:from-[#7aa2f7] group-hover:to-[#bb9af7] transition-all duration-300 line-clamp-2 ${
                  isMobile ? "text-lg" : "text-xl"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {post.data.title}
              </motion.h2>

              {/* Description */}
              {post.data.description && (
                <p
                  className={`text-[#a9b1d6] mb-4 leading-relaxed group-hover:text-[#c0caf5] transition-colors duration-300 line-clamp-3 ${
                    isMobile ? "text-sm" : "text-base"
                  }`}
                >
                  {post.data.description}
                </p>
              )}

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#a9b1d6] text-sm">
                  <span className="text-lg">👤</span>
                  <span>{post.data.authorName}</span>
                </div>

                {/* Read more indicator */}
                <motion.div
                  className="flex items-center gap-2 text-[#7aa2f7] font-medium text-sm group-hover:text-[#bb9af7] transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span className={isMobile ? "hidden" : "block"}>
                    Read More
                  </span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-1 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </motion.div>
      ))}
    </motion.section>
  );

  const ListView = () => (
    <motion.section
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {currentPosts.map((post, index) => (
        <motion.div
          key={post.slug}
          variants={itemVariants}
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.3 },
          }}
          className="group"
        >
          <a
            href={`/blog/${post.slug}/`}
            className="block relative overflow-hidden rounded-2xl backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 shadow-xl hover:shadow-2xl hover:shadow-[#7aa2f7]/10 transition-all duration-500"
          >
            <div
              className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center`}
            >
              {/* Image Section */}
              <div
                className={`relative overflow-hidden ${
                  isMobile ? "w-full h-48" : "w-64 h-40"
                }`}
              >
                <motion.img
                  src={post.data.heroImage || "/default-image.jpg"}
                  alt={post.data.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/10 via-transparent to-[#bb9af7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Section */}
              <div className={`flex-1 ${isMobile ? "p-4" : "p-6"}`}>
                {/* Title */}
                <motion.h2
                  className={`font-bold mb-3 bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent group-hover:from-[#7aa2f7] group-hover:to-[#bb9af7] transition-all duration-300 ${
                    isMobile ? "text-lg" : "text-xl"
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  {post.data.title}
                </motion.h2>

                {/* Description */}
                {post.data.description && (
                  <p
                    className={`text-[#a9b1d6] mb-4 leading-relaxed group-hover:text-[#c0caf5] transition-colors duration-300 ${
                      isMobile
                        ? "text-sm line-clamp-2"
                        : "text-base line-clamp-3"
                    }`}
                  >
                    {post.data.description}
                  </p>
                )}

                {/* Meta information */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[#a9b1d6] text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-base">📅</span>
                      <span>
                        {new Date(post.data.pubDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-base">👤</span>
                      <span>{post.data.authorName}</span>
                    </div>
                  </div>

                  {/* Read more indicator */}
                  <motion.div
                    className="flex items-center gap-2 text-[#7aa2f7] font-medium text-sm group-hover:text-[#bb9af7] transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className={isMobile ? "hidden" : "block"}>
                      Read Article
                    </span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Hover effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7]/5 via-transparent to-[#bb9af7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Bottom accent line */}
            <div className="h-1 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </motion.div>
      ))}
    </motion.section>
  );

  const CompactView = () => (
    <motion.section
      className="space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {currentPosts.map((post, index) => (
        <motion.div
          key={post.slug}
          variants={itemVariants}
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.3 },
          }}
          className="group"
        >
          <a
            href={`/blog/${post.slug}/`}
            className="block relative overflow-hidden rounded-xl backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 shadow-lg hover:shadow-xl hover:shadow-[#7aa2f7]/10 transition-all duration-500"
          >
            <div className={`flex items-center ${isMobile ? "p-3" : "p-4"}`}>
              {/* Image */}
              <div className="relative overflow-hidden rounded-lg mr-4">
                <img
                  src={post.data.heroImage || "/default-image.jpg"}
                  alt={post.data.title}
                  className={`object-cover transition-all duration-300 group-hover:scale-110 ${
                    isMobile ? "w-12 h-12" : "w-16 h-16"
                  }`}
                />
                {/* Image glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/20 to-[#bb9af7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <motion.h3
                  className={`font-semibold bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent group-hover:from-[#7aa2f7] group-hover:to-[#bb9af7] transition-all duration-300 line-clamp-1 ${
                    isMobile ? "text-sm" : "text-base"
                  }`}
                  whileHover={{ x: 2 }}
                >
                  {post.data.title}
                </motion.h3>

                <div
                  className={`text-[#a9b1d6] flex items-center gap-3 mt-1 group-hover:text-[#c0caf5] transition-colors duration-300 ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  <span>
                    {new Date(post.data.pubDate).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span>{post.data.authorName}</span>
                </div>
              </div>

              {/* Arrow indicator */}
              <motion.div
                className="text-[#7aa2f7] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-[#bb9af7]"
                whileHover={{ x: 3 }}
              >
                <svg
                  className={`${isMobile ? "w-4 h-4" : "w-5 h-5"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Sliding background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7aa2f7]/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
          </a>
        </motion.div>
      ))}
    </motion.section>
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
    <section className="relative overflow-hidden py-8 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7aa2f7] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#bb9af7] rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-32 h-32 bg-[#9ece6a] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className={`font-bold mb-4 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent ${
              isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Latest Articles
          </motion.h1>
          <motion.p
            className={`text-[#a9b1d6] max-w-2xl mx-auto ${
              isMobile ? "text-sm" : "text-lg"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover insights, tutorials, and thoughts on development and
            technology
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-6 h-0.5 bg-gradient-to-r from-transparent via-[#7aa2f7] to-transparent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isMobile ? "120px" : "200px" }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>

        {/* View Switcher */}
        <ViewSwitcher />

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                {/* Previous button */}
                <motion.button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    currentPage === 1
                      ? "text-[#565f89] cursor-not-allowed"
                      : "text-[#a9b1d6] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60"
                  } ${isMobile ? "text-sm px-3 py-1.5" : "text-base"}`}
                  whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                >
                  <span>←</span>
                  {!isMobile && <span>Previous</span>}
                </motion.button>

                {/* Page numbers */}
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <motion.button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`rounded-xl font-semibold transition-all duration-300 ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg"
                            : "text-[#a9b1d6] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60"
                        } ${isMobile ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Next button */}
                <motion.button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    currentPage === totalPages
                      ? "text-[#565f89] cursor-not-allowed"
                      : "text-[#a9b1d6] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60"
                  } ${isMobile ? "text-sm px-3 py-1.5" : "text-base"}`}
                  whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                >
                  {!isMobile && <span>Next</span>}
                  <span>→</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSectionUI;
