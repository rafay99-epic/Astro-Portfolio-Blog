import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      gsap.fromTo(
        svgRef.current.querySelectorAll(".animate"),
        { y: -10 },
        {
          y: 10,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          duration: 2,
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--gray-gradient)] text-[var(--text-light)] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center space-y-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-[var(--accent)] tracking-tight"
        >
          Oops! You're Lost in Code
        </motion.h1>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[rgba(31,34,40,0.8)] backdrop-blur-md border border-[rgba(var(--gray-light),0.2)] rounded-2xl p-8 shadow-[var(--box-shadow)]"
        >
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 100"
            width="400"
            height="100"
            className="mx-auto"
          >
            <text
              className="animate"
              x="20%"
              y="50%"
              fontSize="36"
              fontFamily="monospace"
              fill="var(--accent)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {"<"}404{">"}
            </text>
            <text
              className="animate"
              x="50%"
              y="50%"
              fontSize="36"
              fontFamily="monospace"
              fill="var(--accent)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {"{"}ERROR{"}"}
            </text>
            <text
              className="animate"
              x="80%"
              y="50%"
              fontSize="36"
              fontFamily="monospace"
              fill="var(--accent)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {"</>"}
            </text>
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg md:text-xl font-medium"
        >
          It seems like you have wandered into uncharted code territory.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--accent)] text-[var(--text-light)] hover:bg-[var(--accent)]/90 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-[rgba(122,162,247,0.3)]"
          >
            <span>Return to Home</span>
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

export default NotFoundPage;
