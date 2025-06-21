import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNewsletter } from "@react/newsletter/SubNewsletter/useNewletter";
import { useIsMobile } from "@hooks/useIsMobile";

const Newsletter: React.FC = () => {
  const {
    email,
    setEmail,
    isAgreed,
    setIsAgreed,
    statusMessage,
    statusColor,
    handleSubmit,
  } = useNewsletter();

  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: isMobile ? 0 : -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-12 px-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7aa2f7] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#bb9af7] rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-32 h-32 bg-[#9ece6a] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div
          className="backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 rounded-3xl shadow-2xl overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className={`flex ${isMobile ? "flex-col" : "flex-col lg:flex-row"} items-center`}
          >
            {!isMobile && (
              <motion.div
                className="lg:w-1/2 flex justify-center items-center p-8 lg:p-12"
                variants={imageVariants}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7]/20 via-[#bb9af7]/20 to-[#9ece6a]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-110"></div>

                  <motion.div
                    className="relative overflow-hidden rounded-3xl border-2 border-[#565f89]/30 group-hover:border-[#7aa2f7]/50 transition-all duration-500"
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.img
                      className="h-80 w-80 lg:h-96 lg:w-96 object-contain p-6"
                      src="/assets/sub-newsletter.png"
                      alt="Newsletter subscription illustration"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/5 via-transparent to-[#bb9af7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>

                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#7aa2f7] rounded-full opacity-60 animate-pulse"></div>
                  <div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#bb9af7] rounded-full opacity-40 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </motion.div>
            )}

            <motion.div
              className={`${isMobile ? "w-full p-6" : "lg:w-1/2 p-8 lg:p-12"} flex flex-col justify-center`}
              variants={itemVariants}
            >
              <motion.div className="mb-8" variants={itemVariants}>
                <motion.div
                  className="inline-block mb-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] bg-clip-text text-transparent text-sm font-bold tracking-wide uppercase">
                    Stay Connected
                  </span>
                </motion.div>

                <motion.h2
                  className={`font-bold bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent ${
                    isMobile ? "text-2xl" : "text-3xl lg:text-4xl"
                  }`}
                  variants={itemVariants}
                >
                  Join Our Newsletter!
                </motion.h2>

                <motion.p
                  className={`text-[#a9b1d6] leading-relaxed ${
                    isMobile ? "text-sm mt-3" : "text-lg mt-4"
                  }`}
                  variants={itemVariants}
                >
                  Get the latest articles, tutorials, and exclusive offers
                  delivered straight to your inbox.
                </motion.p>

                <motion.div
                  className="mt-4 h-0.5 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={itemVariants}
              >
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className={`block font-medium text-[#c0caf5] mb-2 ${
                      isMobile ? "text-sm" : "text-base"
                    }`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <motion.input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full text-[#c0caf5] bg-[#1a1b26]/80 border border-[#565f89]/50 rounded-xl shadow-sm backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-[#7aa2f7]/50 focus:border-[#7aa2f7] hover:border-[#7aa2f7]/70 ${
                        isMobile ? "px-4 py-3 text-sm" : "px-6 py-4 text-base"
                      }`}
                      placeholder="you@example.com"
                      required
                      whileFocus={{ scale: 1.01 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7]/5 to-[#bb9af7]/5 rounded-xl opacity-0 pointer-events-none transition-opacity duration-300 hover:opacity-100"></div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-3"
                  variants={itemVariants}
                >
                  <div className="relative">
                    <motion.input
                      id="terms"
                      type="checkbox"
                      checked={isAgreed}
                      onChange={() => setIsAgreed(!isAgreed)}
                      className="w-5 h-5 text-[#7aa2f7] bg-[#1a1b26]/80 border border-[#565f89]/50 rounded focus:ring-[#7aa2f7]/50 focus:ring-2 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    />
                    {isAgreed && (
                      <div className="absolute inset-0 bg-[#7aa2f7]/20 rounded blur-sm"></div>
                    )}
                  </div>
                  <label
                    htmlFor="terms"
                    className={`text-[#a9b1d6] leading-relaxed cursor-pointer hover:text-[#c0caf5] transition-colors duration-300 ${
                      isMobile ? "text-sm" : "text-base"
                    }`}
                  >
                    I agree to receive newsletters and accept the{" "}
                    <span className="text-[#7aa2f7] hover:text-[#bb9af7] transition-colors duration-300">
                      data privacy statement
                    </span>
                    .
                  </label>
                </motion.div>

                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center p-3 rounded-xl backdrop-blur-sm ${
                      statusColor.includes("green")
                        ? "bg-[#9ece6a]/10 border border-[#9ece6a]/30 text-[#9ece6a]"
                        : "bg-red-500/10 border border-red-500/30 text-red-400"
                    } ${isMobile ? "text-sm" : "text-base"}`}
                  >
                    {statusMessage}
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className={`w-full font-semibold text-white bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-xl shadow-lg shadow-[#7aa2f7]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#7aa2f7]/30 focus:outline-none focus:ring-2 focus:ring-[#7aa2f7]/50 focus:ring-offset-2 focus:ring-offset-[#1a1b26] ${
                      isMobile ? "py-3 px-6 text-sm" : "py-4 px-8 text-base"
                    }`}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(122, 162, 247, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-2">Subscribe Now</span>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </motion.div>

                <motion.div className="text-center" variants={itemVariants}>
                  <p
                    className={`text-[#565f89] ${isMobile ? "text-xs" : "text-sm"}`}
                  >
                    Join{" "}
                    <span className="text-[#7aa2f7] font-medium">1,000+</span>{" "}
                    developers who trust our content
                  </p>

                  <div className="flex justify-center items-center mt-3 space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-[#9ece6a] rounded-full animate-pulse"></div>
                      <span
                        className={`text-[#a9b1d6] ${isMobile ? "text-xs" : "text-sm"}`}
                      >
                        No spam
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div
                        className="w-2 h-2 bg-[#7aa2f7] rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <span
                        className={`text-[#a9b1d6] ${isMobile ? "text-xs" : "text-sm"}`}
                      >
                        Unsubscribe anytime
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>

          <motion.div
            className="h-1 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </motion.div>

        <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#7aa2f7]/10 rounded-full blur-sm animate-pulse"></div>
        <div
          className="absolute -bottom-4 -right-4 w-6 h-6 bg-[#bb9af7]/10 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </section>
  );
};

export default Newsletter;
