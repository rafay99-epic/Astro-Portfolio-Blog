import React, { memo } from "react";
import { motion } from "framer-motion";

interface ComingSoonProps {
  featureName: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      stiffness: 200,
    },
  },
};

const ComingSoon = memo(function ComingSoon({ featureName }: ComingSoonProps) {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center  text-[#c0caf5] p-6 relative overflow-hidden"
      role="main"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#7aa2f7]/10 to-[#bb9af7]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#bb9af7]/10 to-[#9ece6a]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Main Card */}
        <motion.div
          variants={cardVariants}
          className="backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden w-full"
          role="alert"
          aria-live="polite"
        >
          {/* Card Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7]/5 via-transparent to-[#bb9af7]/5 rounded-3xl" />

          <div className="relative space-y-8">
            {/* Icon */}
            <motion.div variants={iconVariants} className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-2xl blur-lg opacity-50" />
                <div className="relative bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-2xl p-6 text-6xl">
                  🚀
                </div>
              </div>
            </motion.div>

            {/* Title Section */}
            <motion.div variants={cardVariants} className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent">
                  {featureName}
                </span>
              </h1>

              <h2 className="text-2xl md:text-3xl font-semibold text-[#a9b1d6]">
                Coming Soon!
              </h2>

              <div className="mx-auto w-24 h-1 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] rounded-full" />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={cardVariants}
              className="text-lg md:text-xl text-[#a9b1d6] leading-relaxed max-w-3xl mx-auto"
            >
              This feature is currently under development. We're working hard to
              bring you something amazing. Stay tuned for updates!
            </motion.p>

            {/* Features Preview */}
            <motion.div
              variants={cardVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto"
            >
              {[
                { icon: "⚡", text: "Lightning Fast" },
                { icon: "🎨", text: "Beautiful Design" },
                { icon: "🔧", text: "Powerful Features" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="backdrop-blur-md bg-[#1a1b26]/40 border border-[#565f89]/20 rounded-xl p-4 hover:border-[#7aa2f7]/40 transition-all duration-300"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-sm text-[#a9b1d6] font-medium">
                    {feature.text}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Button */}
            <motion.div variants={cardVariants} className="mt-12">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white rounded-xl font-semibold shadow-lg shadow-[#7aa2f7]/25 hover:shadow-xl hover:shadow-[#7aa2f7]/30 transition-all duration-300 overflow-hidden"
                href="/"
                aria-label="Return to homepage"
                role="button"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#bb9af7] to-[#7aa2f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Back to Home</span>
                <motion.span
                  animate={{ x: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative text-xl"
                >
                  ←
                </motion.span>
              </motion.a>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              variants={cardVariants}
              className="mt-10 space-y-4 max-w-md mx-auto"
            >
              <div className="text-sm text-[#565f89] font-medium">
                Development Progress
              </div>
              <div className="w-full bg-[#1a1b26]/60 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 2, delay: 1 }}
                  className="h-full bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-full relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </motion.div>
              </div>
              <div className="text-xs text-[#565f89]">65% Complete</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={cardVariants}
          className="text-center mt-8 text-[#565f89] text-sm"
        >
          <p>Want to be notified when this feature launches?</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/newsletter-subscribe"
            className="inline-flex items-center gap-2 mt-2 text-[#7aa2f7] hover:text-[#bb9af7] transition-colors duration-300"
          >
            <span>Subscribe to our newsletter</span>
            <span>📧</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
});

export default ComingSoon;
