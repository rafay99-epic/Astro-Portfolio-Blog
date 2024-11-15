import React, { useState } from "react";
import "devicon/devicon.min.css";
import { motion } from "framer-motion";
import authorConfig from "@util/info";

const techStack = authorConfig.techStack;

const SkillsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(techStack)[0]);

  return (
    <div
      className="py-12 px-6 md:px-12 bg-[var(--accent-dark)] rounded-lg shadow-lg"
      style={{
        boxShadow:
          "0 2px 6px rgba(76, 80, 106, 0.25), 0 8px 24px rgba(76, 80, 106, 0.33), 0 16px 32px rgba(76, 80, 106, 0.33)",
      }}
    >
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.keys(techStack).map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`py-2 px-6 font-semibold rounded-full transition duration-300 text-sm md:text-base ${
              activeTab === category
                ? "bg-[var(--accent)] text-white shadow-md"
                : "bg-transparent text-[var(--text-light)] hover:bg-gray-700 hover:text-[var(--accent)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {techStack[activeTab].map((skill) => (
            <motion.div
              key={skill}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center text-center"
            >
              <i className={`devicon-${skill}-plain colored text-5xl`}></i>
              <p className="mt-2 text-sm text-[var(--text-light)]">
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsShowcase;
