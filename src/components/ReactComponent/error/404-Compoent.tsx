import React from "react";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Main Error Container */}
        <div className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-3xl p-8 md:p-12">
          {/* Animated 404 Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7]/20 to-[#bb9af7]/20 rounded-2xl blur-2xl"></div>

              {/* Code Block Style 404 */}
              <div className="relative bg-[#1a1b26]/80 border border-[#565f89]/40 rounded-2xl p-8 font-mono">
                <div className="flex items-center justify-center gap-4 text-4xl md:text-5xl lg:text-6xl font-bold">
                  <motion.span
                    animate={{
                      color: ["#7aa2f7", "#bb9af7", "#9ece6a", "#7aa2f7"],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-[#7aa2f7]"
                  >
                    {"<"}
                  </motion.span>

                  <motion.span
                    animate={{
                      y: [-5, 5, -5],
                      color: ["#bb9af7", "#9ece6a", "#7aa2f7", "#bb9af7"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-[#bb9af7]"
                  >
                    404
                  </motion.span>

                  <motion.span
                    animate={{
                      color: ["#9ece6a", "#7aa2f7", "#bb9af7", "#9ece6a"],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    }}
                    className="text-[#9ece6a]"
                  >
                    {"/>"}
                  </motion.span>
                </div>

                {/* Error Message in Code Style */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 text-sm md:text-base text-[#a9b1d6]"
                >
                  <span className="text-[#ff7a93]">Error:</span>
                  <span className="text-[#c0caf5]"> Page not found</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent">
              Oops! You're Lost in Code
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[#a9b1d6] text-base md:text-lg lg:text-xl mb-8 leading-relaxed"
          >
            It seems like you've wandered into uncharted code territory. The
            page you're looking for doesn't exist in this repository.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="/"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white font-semibold rounded-xl shadow-lg shadow-[#7aa2f7]/25 hover:shadow-xl hover:shadow-[#7aa2f7]/30 transition-all duration-300"
            >
              <span>🏠</span>
              <span>Return to Home</span>
              <motion.span
                animate={{ x: [0, -4, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ←
              </motion.span>
            </motion.a>

            <motion.a
              href="/blog"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#a9b1d6] font-semibold rounded-xl hover:bg-[#24283b]/60 hover:border-[#7aa2f7]/40 hover:text-[#c0caf5] transition-all duration-300"
            >
              <span>📚</span>
              <span>Browse Blog</span>
            </motion.a>
          </motion.div>

          {/* Bottom Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 pt-6 border-t border-[#565f89]/20"
          >
            <div className="flex items-center justify-center gap-4 text-sm text-[#565f89]">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-2 h-2 bg-[#ff7a93] rounded-full"
                />
                <span>404 Error</span>
              </div>
              <span>•</span>
              <span>Page Not Found</span>
            </div>
          </motion.div>

          {/* Fun Coding Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 text-xs font-mono text-[#565f89] space-y-1"
          >
            <div>// TODO: Fix broken links</div>
            <div>// DEBUG: Route not found</div>
            <div className="text-[#9ece6a]">
              // SUCCESS: User redirected safely
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
