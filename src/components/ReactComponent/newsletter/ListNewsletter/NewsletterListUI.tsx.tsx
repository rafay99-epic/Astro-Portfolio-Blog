import { memo } from "react";
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
        className="flex flex-col items-center justify-center px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <div className="mb-4 text-4xl text-red-400">⚠️</div>
          <h3 className="mb-2 text-lg font-semibold text-red-400">
            Oops! Something went wrong
          </h3>
          <p className="text-sm text-red-300">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="relative overflow-hidden px-4 py-8">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#7aa2f7] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-[#bb9af7] blur-3xl" />
        <div className="absolute left-3/4 top-3/4 h-32 w-32 rounded-full bg-[#9ece6a] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className={`mb-4 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text font-bold text-transparent ${
              isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Newsletter Archive
          </motion.h1>
          <motion.p
            className={`mx-auto max-w-2xl text-[#a9b1d6] ${
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
            className="mx-auto mt-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#7aa2f7] to-transparent"
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
                  className="relative block overflow-hidden rounded-2xl border border-[#565f89]/30 bg-[#24283b]/60 shadow-xl backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#7aa2f7]/10"
                >
                  <div className={`p-6 ${isMobile ? "p-4" : "p-8"}`}>
                    <div className="mb-4 flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <motion.h2
                          className={`mb-3 bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text font-bold text-transparent transition-all duration-300 group-hover:from-[#7aa2f7] group-hover:to-[#bb9af7] ${
                            isMobile ? "text-xl" : "text-2xl lg:text-3xl"
                          }`}
                          whileHover={{ scale: 1.01 }}
                        >
                          {newsletter.data.title}
                        </motion.h2>

                        <div className="mb-4 flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-[#a9b1d6]">
                            <span className="text-lg">📅</span>
                            <time
                              dateTime={newsletter.data.pubDate.toISOString()}
                            >
                              {formatDate(newsletter.data.pubDate)}
                            </time>
                          </div>

                          {newsletter.data.summary && (
                            <div className="flex items-center gap-2 text-sm text-[#a9b1d6]">
                              <span className="text-lg">⏱️</span>
                              <span>
                                {getReadTime(newsletter.data.summary)}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <span className="rounded-lg bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] px-3 py-1 text-xs font-bold text-white shadow-lg">
                              Newsletter
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex-shrink-0 md:ml-6 md:mt-0">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#7aa2f7]/20 to-[#bb9af7]/20 blur-sm"></div>
                          <div className="relative rounded-xl border border-[#565f89]/50 bg-[#1a1b26]/80 p-3 text-center backdrop-blur-sm">
                            <div className="text-sm font-medium text-[#7aa2f7]">
                              Issue
                            </div>
                            <div className="text-lg font-bold text-[#c0caf5]">
                              #{index + 1 + (currentPage - 1) * 5}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {newsletter.data.summary && (
                      <motion.p
                        className={`leading-relaxed text-[#a9b1d6] transition-colors duration-300 group-hover:text-[#c0caf5] ${
                          isMobile
                            ? "line-clamp-3 text-sm"
                            : "line-clamp-4 text-base"
                        }`}
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {newsletter.data.summary}
                      </motion.p>
                    )}

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-[#7aa2f7] transition-colors duration-300 group-hover:text-[#bb9af7]">
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
                        <div className="h-1.5 w-1.5 rounded-full bg-[#7aa2f7] opacity-60"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-[#bb9af7] opacity-40"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-[#9ece6a] opacity-20"></div>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/5 via-transparent to-[#bb9af7]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="h-1 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </a>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {isLoading && (
          <motion.div
            className="flex items-center justify-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3 rounded-xl border border-[#565f89]/30 bg-[#24283b]/50 px-6 py-3 backdrop-blur-xl">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#7aa2f7]/30 border-t-[#7aa2f7]"></div>
              <span className="text-sm font-medium text-[#a9b1d6]">
                Loading newsletters...
              </span>
            </div>
          </motion.div>
        )}

        {totalPages > 1 && !isLoading && (
          <motion.div
            className="mt-12 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="rounded-2xl border border-[#565f89]/30 bg-[#24283b]/50 p-4 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all duration-300 ${
                    currentPage === 1
                      ? "cursor-not-allowed text-[#565f89]"
                      : "text-[#a9b1d6] hover:bg-[#1a1b26]/60 hover:text-[#7aa2f7]"
                  } ${isMobile ? "px-3 py-1.5 text-sm" : "text-base"}`}
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
                            : "text-[#a9b1d6] hover:bg-[#1a1b26]/60 hover:text-[#7aa2f7]"
                        } ${isMobile ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm"}`}
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
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all duration-300 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed text-[#565f89]"
                      : "text-[#a9b1d6] hover:bg-[#1a1b26]/60 hover:text-[#7aa2f7]"
                  } ${isMobile ? "px-3 py-1.5 text-sm" : "text-base"}`}
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
