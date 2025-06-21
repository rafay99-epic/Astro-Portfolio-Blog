import React from "react";
import { motion } from "framer-motion";

const ConnectButton: React.FC = () => {
  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <motion.a
        href="/contact-me"
        className="group inline-flex items-center px-6 py-3 font-bold text-base rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-[var(--accent)]/30 bg-gradient-to-r from-[var(--accent-dark)]/80 to-[var(--accent-dark)]/40 hover:border-[var(--accent)]/60 transition-all duration-300"
        whileHover={{
          scale: 1.05,
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Content */}
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <svg
            className="w-5 h-5 text-[var(--accent)] group-hover:scale-110 transition-transform duration-200"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>

          {/* Text */}
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--text-light)] bg-clip-text text-transparent font-bold tracking-wide">
            Connect with Me
          </span>

          {/* Arrow */}
          <svg
            className="w-4 h-4 text-[var(--accent)] group-hover:translate-x-1 transition-transform duration-200"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </motion.a>

      {/* Simple hint text */}
      <motion.p
        className="text-center mt-3 text-sm text-[var(--text-light)]/60 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        Let's build something amazing together
      </motion.p>
    </motion.div>
  );
};

export default ConnectButton;
