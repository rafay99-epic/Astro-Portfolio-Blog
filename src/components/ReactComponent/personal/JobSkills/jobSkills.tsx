import React, { useState, useRef } from "react";
import "devicon/devicon.min.css";
import { motion, AnimatePresence, useInView } from "framer-motion";
import authorConfig from "@config/siteConfig/info.json";

const techStack = authorConfig.techStack;

const SkillsShowcase: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const categoryToolsMap = techStack.reduce(
    (acc, item) => {
      acc[item.category] = item.tools;
      return acc;
    },
    {} as Record<string, string[]>
  );

  const [activeTab, setActiveTab] = useState(Object.keys(categoryToolsMap)[0]);

  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    Frontend: "🎨",
    Backend: "⚡",
    Database: "🗄️",
    DevOps: "🚀",
    Mobile: "📱",
    Tools: "🛠️",
    Languages: "💻",
    Framework: "🏗️",
    Cloud: "☁️",
    Design: "🎯",
  };

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

  const cardVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const skillCardVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      rotateY: -15,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    },
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-16">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#7aa2f7]/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.3 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-[#bb9af7]/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.3 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 1.5, delay: 0.4 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#9ece6a]/8 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.2 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 1.5, delay: 0.6 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tech Arsenal
          </motion.h2>
          <motion.p
            className="text-xl text-[#a9b1d6] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            My collection of technologies, frameworks, and tools that power
            modern development
          </motion.p>
        </motion.div>

        {/* Skills Container */}
        <motion.div
          className="relative max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Glassmorphism Container */}
          <div className="relative backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-3xl p-8 shadow-2xl">
            {/* Floating decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-[#7aa2f7] rounded-full opacity-60 animate-pulse"></div>
            <div
              className="absolute bottom-6 left-6 w-3 h-3 bg-[#bb9af7] rounded-full opacity-40 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-[#9ece6a] rounded-full opacity-50 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>

            {/* Category Tabs */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-12"
              variants={cardVariants}
            >
              {Object.keys(categoryToolsMap).map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 text-sm md:text-base border backdrop-blur-sm overflow-hidden ${
                    activeTab === category
                      ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white border-transparent shadow-lg shadow-[#7aa2f7]/25"
                      : "text-[#a9b1d6] border-[#565f89]/50 bg-[#1a1b26]/50 hover:bg-[#24283b]/80 hover:border-[#7aa2f7]/50 hover:text-[#c0caf5]"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {/* Active tab gradient overlay */}
                  {activeTab === category && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#bb9af7]/20 to-[#9ece6a]/20 rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="relative flex items-center space-x-2">
                    <span className="text-lg">
                      {categoryIcons[category] || "💡"}
                    </span>
                    <span>{category}</span>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-gradient-to-r from-[#7aa2f7]/10 to-[#bb9af7]/10" />
                </motion.button>
              ))}
            </motion.div>

            {/* Skills Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {categoryToolsMap[activeTab].map((skill, index) => (
                    <motion.div
                      key={skill}
                      variants={skillCardVariants}
                      className="group relative"
                      whileHover={{
                        scale: 1.08,
                        rotateY: 10,
                        z: 50,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {/* Card Background with Glassmorphism */}
                      <div className="relative backdrop-blur-sm bg-[#1a1b26]/60 border border-[#565f89]/40 p-4 md:p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center justify-center min-h-[120px] md:min-h-[140px]">
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl bg-gradient-to-br from-[#7aa2f7]/20 via-[#bb9af7]/10 to-[#9ece6a]/20 blur-sm transform scale-105" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                          {/* Skill Icon */}
                          <motion.div
                            className="relative"
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <i
                              className={`devicon-${skill.toLowerCase()}-plain colored text-3xl md:text-4xl transition-all duration-300 group-hover:scale-110 group-hover:brightness-110`}
                            />

                            {/* Icon glow effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                              <i
                                className={`devicon-${skill.toLowerCase()}-plain text-3xl md:text-4xl text-[#7aa2f7] blur-sm`}
                              />
                            </div>
                          </motion.div>

                          {/* Skill Name */}
                          <motion.p
                            className="text-xs md:text-sm font-semibold text-[#a9b1d6] group-hover:text-[#c0caf5] transition-colors duration-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 + 0.2 }}
                          >
                            {skill.charAt(0).toUpperCase() + skill.slice(1)}
                          </motion.p>
                        </div>

                        {/* Corner accent */}
                        <div className="absolute top-2 right-2 w-1 h-1 bg-[#7aa2f7] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-2 left-2 w-1 h-1 bg-[#bb9af7] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Floating animation for random cards */}
                      {index % 3 === 0 && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Stats Bar */}
            <motion.div
              className="mt-12 pt-8 border-t border-[#565f89]/30"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className="flex flex-wrap justify-center items-center gap-8 text-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#7aa2f7] rounded-full animate-pulse" />
                  <span className="text-[#a9b1d6] text-sm">
                    <span className="text-[#c0caf5] font-bold">
                      {Object.keys(categoryToolsMap).length}
                    </span>{" "}
                    Categories
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 bg-[#bb9af7] rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <span className="text-[#a9b1d6] text-sm">
                    <span className="text-[#c0caf5] font-bold">
                      {Object.values(categoryToolsMap).reduce(
                        (total, tools) => total + tools.length,
                        0
                      )}
                    </span>{" "}
                    Technologies
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 bg-[#9ece6a] rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                  <span className="text-[#a9b1d6] text-sm">
                    <span className="text-[#c0caf5] font-bold">
                      {categoryToolsMap[activeTab].length}
                    </span>{" "}
                    In {activeTab}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
