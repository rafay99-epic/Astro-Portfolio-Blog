import {  memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@hooks/useIsMobile";
import type { Newsletter } from "types/newsletter_types";

interface NewsletterListUIProps {
  currentNewsletters: Newsletter[];
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  isLoading: boolean;
  error: string | null;
}

const NewsletterListUI = memo(function NewsletterListUI({
  currentNewsletters,
  totalPages,
  currentPage,
  handlePageChange,
  isLoading,
  error,
}: NewsletterListUIProps) {
  const isMobile = useIsMobile();

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(" ").length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (error) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-12 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center max-w-md">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h3 className="text-red-400 font-semibold text-lg mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="relative overflow-hidden py-8 px-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7aa2f7] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#bb9af7] rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-32 h-32 bg-[#9ece6a] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
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
            Newsletter Archive
          </motion.h1>
          <motion.p
            className={`text-[#a9b1d6] max-w-2xl mx-auto ${
              isMobile ? "text-sm" : "text-lg"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Stay informed with our latest insights, updates, and industry
            perspectives
          </motion.p>

          <motion.div
            className="mx-auto mt-6 h-0.5 bg-gradient-to-r from-transparent via-[#7aa2f7] to-transparent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isMobile ? "120px" : "200px" }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            {currentNewsletters.map((newsletter, index) => (
              <motion.article
                key={newsletter.slug}
                variants={itemVariants}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <a
                  href={`/newsletter/${newsletter.slug}`}
                  className="block relative overflow-hidden rounded-2xl backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 shadow-xl hover:shadow-2xl hover:shadow-[#7aa2f7]/10 transition-all duration-500"
                >
                  <div className={`p-6 ${isMobile ? "p-4" : "p-8"}`}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <motion.h2
                          className={`font-bold mb-3 bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent group-hover:from-[#7aa2f7] group-hover:to-[#bb9af7] transition-all duration-300 ${
                            isMobile ? "text-xl" : "text-2xl lg:text-3xl"
                          }`}
                          whileHover={{ scale: 1.01 }}
                        >
                          {newsletter.data.title}
                        </motion.h2>

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center gap-2 text-[#a9b1d6] text-sm">
                            <span className="text-lg">📅</span>
                            <time
                              dateTime={newsletter.data.pubDate.toISOString()}
                            >
                              {formatDate(newsletter.data.pubDate)}
                            </time>
                          </div>

                          {newsletter.data.summary && (
                            <div className="flex items-center gap-2 text-[#a9b1d6] text-sm">
                              <span className="text-lg">⏱️</span>
                              <span>
                                {getReadTime(newsletter.data.summary)}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <span className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg">
                              Newsletter
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/20 to-[#bb9af7]/20 rounded-xl blur-sm"></div>
                          <div className="relative bg-[#1a1b26]/80 border border-[#565f89]/50 rounded-xl p-3 text-center backdrop-blur-sm">
                            <div className="text-[#7aa2f7] text-sm font-medium">
                              Issue
                            </div>
                            <div className="text-[#c0caf5] text-lg font-bold">
                              #{index + 1 + (currentPage - 1) * 5}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {newsletter.data.summary && (
                      <motion.p
                        className={`text-[#a9b1d6] leading-relaxed group-hover:text-[#c0caf5] transition-colors duration-300 ${
                          isMobile
                            ? "text-sm line-clamp-3"
                            : "text-base line-clamp-4"
                        }`}
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {newsletter.data.summary}
                      </motion.p>
                    )}

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-2 text-[#7aa2f7] font-medium text-sm group-hover:text-[#bb9af7] transition-colors duration-300">
                        <span className={isMobile ? "hidden" : "block"}>
                          Read Newsletter
                        </span>
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-[#7aa2f7] rounded-full opacity-60"></div>
                        <div className="w-1.5 h-1.5 bg-[#bb9af7] rounded-full opacity-40"></div>
                        <div className="w-1.5 h-1.5 bg-[#9ece6a] rounded-full opacity-20"></div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/5 via-transparent to-[#bb9af7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="h-1 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {isLoading && (
          <motion.div
            className="flex justify-center items-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3 backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-xl px-6 py-3">
              <div className="w-5 h-5 border-2 border-[#7aa2f7]/30 border-t-[#7aa2f7] rounded-full animate-spin"></div>
              <span className="text-[#a9b1d6] text-sm font-medium">
                Loading newsletters...
              </span>
            </div>
          </motion.div>
        )}

        {totalPages > 1 && !isLoading && (
          <motion.div
            className="flex justify-center items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
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
});

export default NewsletterListUI;
