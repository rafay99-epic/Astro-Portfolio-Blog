import React, { useState } from "react";
import "devicon/devicon.min.css";
import { motion } from "framer-motion";
import authorConfig from "../../../config/info";

const techStack = authorConfig.techStack;

const SkillsShowcase: React.FC = () => {
  // Set initial tab as the first category in the tech stack
  const [activeTab, setActiveTab] = useState(Object.keys(techStack)[0]);

  return (
    <div
      style={{
        boxShadow:
          "0 2px 6px rgba(76, 80, 106, 0.25), 0 8px 24px rgba(76, 80, 106, 0.33), 0 16px 32px rgba(76, 80, 106, 0.33)",
      }}
      className="py-12 px-6 md:px-12 bg-[var(--accent-dark)] rounded-lg"
    >
      {/* Tab Navigation for Tech Stack Categories */}
      <div className="flex flex-wrap justify-center space-x-2 mb-8">
        {Object.keys(techStack).map((category) => (
          <button
            key={category}
            className={`py-2 px-4 font-semibold rounded-lg ${
              activeTab === category
                ? "bg-[var(--accent)] text-white"
                : "bg-transparent text-[var(--text-light)]"
            } transition duration-300 whitespace-nowrap`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Table */}
      <div className="flex overflow-x-auto">
        {Object.entries(techStack).map(([category, skills]) =>
          activeTab === category ? (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-start"
              style={{ whiteSpace: "nowrap" }}
            >
              {skills.map((skill) => (
                <i
                  key={skill}
                  className={`devicon-${skill}-plain colored text-6xl mx-2`}
                ></i>
              ))}
            </motion.div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default SkillsShowcase;
