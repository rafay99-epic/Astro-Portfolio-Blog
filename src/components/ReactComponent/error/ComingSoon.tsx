import React from "react";
import { motion } from "framer-motion";

interface ComingSoonProps {
  featureName: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, delay: 0.2 },
  },
};

const ComingSoon: React.FC<ComingSoonProps> = ({ featureName }) => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-[var(--gray-gradient)] text-[var(--text-light)] p-6"
      role="main"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl bg-[rgba(31,34,40,0.8)] border border-[rgba(var(--gray-light),0.2)] backdrop-blur-md shadow-[var(--box-shadow)] rounded-2xl p-10 text-center"
        role="alert"
        aria-live="polite"
      >
        <motion.div variants={cardVariants} className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold text-[var(--accent)]">
              🚀 {featureName}
            </h1>
            <h2
              className="text-3xl font-semibold"
              aria-label={`${featureName} coming soon`}
            >
              Coming Soon!
            </h2>
          </div>

          <p className="text-lg text-[var(--text-light)] leading-relaxed">
            This feature is currently under development. Hang tight — exciting
            things are on the way!
          </p>

          <motion.a
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-3 mt-6 px-8 py-4 bg-[var(--accent)] text-[var(--text-light)] hover:bg-[var(--accent)]/90 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-[rgba(122,162,247,0.3)]"
            href="/"
            aria-label="Return to homepage"
            role="button"
          >
            <span>Back to Home</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-xl"
            >
              ←
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
