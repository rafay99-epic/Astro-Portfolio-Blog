import { memo } from "react";
import { motion } from "framer-motion";
import { useNewsletter } from "@react/newsletter/SubNewsletter/useNewletter";
import { useIsMobile } from "@hooks/useIsMobile";

const Newsletter = memo(function Newsletter() {
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
    <section className="relative overflow-hidden px-4 py-12">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#7aa2f7] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-[#bb9af7] blur-3xl" />
        <div className="absolute left-3/4 top-3/4 h-32 w-32 rounded-full bg-[#9ece6a] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="overflow-hidden rounded-3xl border border-[#565f89]/30 bg-[#24283b]/60 shadow-2xl backdrop-blur-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className={`flex ${isMobile ? "flex-col" : "flex-col lg:flex-row"} items-center`}
          >
            {!isMobile && (
              <motion.div
                className="flex items-center justify-center p-8 lg:w-1/2 lg:p-12"
                variants={imageVariants}
              >
                <div className="group relative">
                  <div className="absolute inset-0 scale-110 transform rounded-3xl bg-gradient-to-r from-[#7aa2f7]/20 via-[#bb9af7]/20 to-[#9ece6a]/20 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100"></div>

                  <motion.div
                    className="relative overflow-hidden rounded-3xl border-2 border-[#565f89]/30 transition-all duration-500 group-hover:border-[#7aa2f7]/50"
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.img
                      className="h-80 w-80 object-contain p-6 lg:h-96 lg:w-96"
                      src="/assets/sub-newsletter.png"
                      alt="Newsletter subscription illustration"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/5 via-transparent to-[#bb9af7]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  </motion.div>

                  <div className="absolute -right-2 -top-2 h-4 w-4 animate-pulse rounded-full bg-[#7aa2f7] opacity-60"></div>
                  <div
                    className="absolute -bottom-2 -left-2 h-3 w-3 animate-pulse rounded-full bg-[#bb9af7] opacity-40"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </motion.div>
            )}

            <motion.div
              className={`${isMobile ? "w-full p-6" : "p-8 lg:w-1/2 lg:p-12"} flex flex-col justify-center`}
              variants={itemVariants}
            >
              <motion.div className="mb-8" variants={itemVariants}>
                <motion.div
                  className="mb-3 inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] bg-clip-text text-sm font-bold uppercase tracking-wide text-transparent">
                    Stay Connected
                  </span>
                </motion.div>

                <motion.h2
                  className={`bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text font-bold text-transparent ${
                    isMobile ? "text-2xl" : "text-3xl lg:text-4xl"
                  }`}
                  variants={itemVariants}
                >
                  Join Our Newsletter!
                </motion.h2>

                <motion.p
                  className={`leading-relaxed text-[#a9b1d6] ${
                    isMobile ? "mt-3 text-sm" : "mt-4 text-lg"
                  }`}
                  variants={itemVariants}
                >
                  Get the latest articles, tutorials, and exclusive offers
                  delivered straight to your inbox.
                </motion.p>

                <motion.div
                  className="mt-4 h-0.5 rounded-full bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-transparent"
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
                    className={`mb-2 block font-medium text-[#c0caf5] ${
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
                      className={`w-full rounded-xl border border-[#565f89]/50 bg-[#1a1b26]/80 text-[#c0caf5] shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#7aa2f7]/70 focus:border-[#7aa2f7] focus:ring-2 focus:ring-[#7aa2f7]/50 ${
                        isMobile ? "px-4 py-3 text-sm" : "px-6 py-4 text-base"
                      }`}
                      placeholder="you@example.com"
                      required
                      whileFocus={{ scale: 1.01 }}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-[#7aa2f7]/5 to-[#bb9af7]/5 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
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
                      className="h-5 w-5 rounded border border-[#565f89]/50 bg-[#1a1b26]/80 text-[#7aa2f7] transition-all duration-300 focus:ring-2 focus:ring-[#7aa2f7]/50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    />
                    {isAgreed && (
                      <div className="absolute inset-0 rounded bg-[#7aa2f7]/20 blur-sm"></div>
                    )}
                  </div>
                  <label
                    htmlFor="terms"
                    className={`cursor-pointer leading-relaxed text-[#a9b1d6] transition-colors duration-300 hover:text-[#c0caf5] ${
                      isMobile ? "text-sm" : "text-base"
                    }`}
                  >
                    I agree to receive newsletters and accept the{" "}
                    <span className="text-[#7aa2f7] transition-colors duration-300 hover:text-[#bb9af7]">
                      data privacy statement
                    </span>
                    .
                  </label>
                </motion.div>

                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl p-3 text-center backdrop-blur-sm ${
                      statusColor.includes("green")
                        ? "border border-[#9ece6a]/30 bg-[#9ece6a]/10 text-[#9ece6a]"
                        : "border border-red-500/30 bg-red-500/10 text-red-400"
                    } ${isMobile ? "text-sm" : "text-base"}`}
                  >
                    {statusMessage}
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className={`w-full rounded-xl bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] font-semibold text-white shadow-lg shadow-[#7aa2f7]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#7aa2f7]/30 focus:outline-none focus:ring-2 focus:ring-[#7aa2f7]/50 focus:ring-offset-2 focus:ring-offset-[#1a1b26] ${
                      isMobile ? "px-6 py-3 text-sm" : "px-8 py-4 text-base"
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
                    <span className="font-medium text-[#7aa2f7]">1,000+</span>{" "}
                    developers who trust our content
                  </p>

                  <div className="mt-3 flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-[#9ece6a]"></div>
                      <span
                        className={`text-[#a9b1d6] ${isMobile ? "text-xs" : "text-sm"}`}
                      >
                        No spam
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div
                        className="h-2 w-2 animate-pulse rounded-full bg-[#7aa2f7]"
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

        <div className="absolute -left-4 -top-4 h-8 w-8 animate-pulse rounded-full bg-[#7aa2f7]/10 blur-sm"></div>
        <div
          className="absolute -bottom-4 -right-4 h-6 w-6 animate-pulse rounded-full bg-[#bb9af7]/10 blur-sm"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </section>
  );
});

export default Newsletter;
