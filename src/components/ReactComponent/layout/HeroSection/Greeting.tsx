import { memo } from "react";
import { motion } from "framer-motion";

interface GreetingProps {
  name: string;
  jobTitle: string;
  position: string;
}

const Greeting = memo(function Greeting({
  name,
  jobTitle,
  position,
}: GreetingProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Simple background glow */}
      <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-full blur-2xl" />

      <div className="relative z-10 space-y-6">
        {/* Greeting */}
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--text-light)] to-[var(--accent)] bg-clip-text text-transparent">
            Hi There!
          </span>
        </motion.h1>

        {/* Name */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="text-[var(--text-light)]">I'm </span>
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--text-light)] bg-clip-text text-transparent">
            {name}
          </span>
        </motion.h2>

        {/* Job Description */}
        <motion.div
          className="bg-gradient-to-r from-[var(--accent-dark)]/80 via-[var(--accent-dark)]/40 to-transparent rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-[var(--accent)]/20 shadow-lg max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">
              Professional
            </span>
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--text-light)] leading-relaxed">
            <span className="text-[var(--accent)]">{jobTitle}</span>
            {" | "}
            <span className="text-[var(--text-light)]">{position}</span>
          </p>

          {/* Simple underline */}
          <div className="h-1 bg-gradient-to-r from-[var(--accent)] to-transparent rounded-full mt-4" />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-8 flex items-center text-[var(--accent)]/60 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="mr-2">Scroll Down</span>
          <motion.svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default Greeting;
