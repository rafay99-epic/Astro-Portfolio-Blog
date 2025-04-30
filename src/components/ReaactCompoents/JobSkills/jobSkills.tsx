import React, { useState } from "react";
import "devicon/devicon.min.css";
import { motion, AnimatePresence } from "framer-motion";
import authorConfig from "@config/siteConfig/info.json";

const techStack = authorConfig.techStack;

const SkillsShowcase: React.FC = () => {
  const categoryToolsMap = techStack.reduce(
    (acc, item) => {
      acc[item.category] = item.tools;
      return acc;
    },
    {} as Record<string, string[]>
  );

  const [activeTab, setActiveTab] = useState(Object.keys(categoryToolsMap)[0]);

  return (
    <div
      className="bg-[var(--accent-dark)] rounded-2xl px-6 py-12 md:px-10 md:py-16 shadow-xl"
      style={{
        boxShadow: "var(--box-shadow)",
      }}
    >
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {Object.keys(categoryToolsMap).map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-5 py-2.5 rounded-full font-medium transition duration-300 text-sm md:text-base border
              ${
                activeTab === category
                  ? "bg-[var(--accent)] text-white border-transparent shadow-md"
                  : "text-[var(--text-light)] border-[var(--gray)] hover:bg-[var(--gray-dark)] hover:border-[var(--accent)]"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35 }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 sm:gap-8 px-4">
            {categoryToolsMap[activeTab].map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col items-center text-center bg-[var(--gray-dark)] p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <i
                  className={`devicon-${skill.toLowerCase()}-plain colored text-4xl md:text-5xl`}
                ></i>
                <p className="mt-3 text-sm text-[var(--text-light)] font-medium">
                  {skill.charAt(0).toUpperCase() + skill.slice(1)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SkillsShowcase;
