import React, {
  useState,
  useRef,
  memo,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import "devicon/devicon.min.css";
import { motion, AnimatePresence, useInView } from "framer-motion";
import authorConfig from "@config/siteConfig/info.json";

const techStack = authorConfig.techStack;

const SkillsShowcase = memo(function SkillsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categoryToolsMap = useMemo(
    () =>
      techStack.reduce(
        (acc, item) => {
          acc[item.category] = item.tools;
          return acc;
        },
        {} as Record<string, string[]>
      ),
    []
  );

  const [activeTab, setActiveTab] = useState(
    () => Object.keys(categoryToolsMap)[0]
  );

  const categoryIcons: Record<string, string> = useMemo(
    () => ({
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
    }),
    []
  );

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: isMobile ? 0.1 : 0.2,
          staggerChildren: isMobile ? 0.03 : 0.1,
          ease: "easeOut",
        },
      },
    }),
    [isMobile]
  );

  const cardVariants = useMemo(
    () => ({
      hidden: {
        y: isMobile ? 20 : 30,
        opacity: 0,
        scale: isMobile ? 0.95 : 0.9,
      },
      visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: "tween",
          duration: isMobile ? 0.3 : 0.5,
          ease: "easeOut",
        },
      },
    }),
    [isMobile]
  );

  const skillCardVariants = useMemo(
    () => ({
      hidden: {
        y: isMobile ? 15 : 20,
        opacity: 0,
        rotateY: isMobile ? -8 : -15,
      },
      visible: {
        y: 0,
        opacity: 1,
        rotateY: 0,
        transition: {
          type: "tween",
          duration: isMobile ? 0.25 : 0.4,
          ease: "easeOut",
        },
      },
    }),
    [isMobile]
  );

  const handleTabChange = useCallback((category: string) => {
    setActiveTab(category);
  }, []);

  const getOptimizedStyle = (isAnimated = false, isHover = false) => ({
    willChange: isAnimated
      ? isMobile
        ? "transform"
        : "transform, opacity"
      : "auto",
    transform: "translate3d(0, 0, 0)",
    ...(isMobile && {
      backfaceVisibility: "hidden" as const,
      perspective: isHover ? 1000 : "none",
    }),
  });

  const getHoverAnimation = (isCard = false) => {
    if (isMobile) {
      return isCard
        ? { scale: 1.03, transition: { duration: 0.15, ease: "easeOut" } }
        : { scale: 1.02, transition: { duration: 0.15, ease: "easeOut" } };
    }
    return isCard
      ? {
          scale: 1.08,
          rotateY: 10,
          z: 50,
          transition: { duration: 0.3, ease: "easeOut" },
        }
      : { scale: 1.05, transition: { duration: 0.2, ease: "easeOut" } };
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16"
      style={getOptimizedStyle()}
    >
      <div className="absolute inset-0 opacity-20" style={getOptimizedStyle()}>
        <motion.div
          className={`absolute top-1/4 left-1/6 bg-[#7aa2f7]/10 rounded-full blur-3xl ${
            isMobile ? "w-64 h-64" : "w-96 h-96"
          }`}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.3 } : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: isMobile ? 1 : 1.5,
            delay: 0.2,
            ease: "easeOut",
          }}
          style={getOptimizedStyle(true)}
        />
        <motion.div
          className={`absolute bottom-1/4 right-1/6 bg-[#bb9af7]/10 rounded-full blur-3xl ${
            isMobile ? "w-48 h-48" : "w-80 h-80"
          }`}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.3 } : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: isMobile ? 1 : 1.5,
            delay: 0.4,
            ease: "easeOut",
          }}
          style={getOptimizedStyle(true)}
        />
        <motion.div
          className={`absolute top-1/2 left-1/2 bg-[#9ece6a]/8 rounded-full blur-3xl ${
            isMobile ? "w-32 h-32" : "w-64 h-64"
          }`}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.2 } : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: isMobile ? 1 : 1.5,
            delay: 0.6,
            ease: "easeOut",
          }}
          style={getOptimizedStyle(true)}
        />
      </div>

      <div
        className="container mx-auto px-6 relative z-10"
        style={getOptimizedStyle()}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: isMobile ? -20 : -30 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: isMobile ? -20 : -30 }
          }
          transition={{ duration: isMobile ? 0.6 : 0.8, ease: "easeOut" }}
          style={getOptimizedStyle(true)}
        >
          <motion.h2
            className={`font-bold mb-6 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent ${
              isMobile ? "text-4xl lg:text-5xl" : "text-5xl lg:text-6xl"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
            }
            transition={{
              duration: isMobile ? 0.6 : 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            style={getOptimizedStyle(true)}
          >
            Tech Arsenal
          </motion.h2>
          <motion.p
            className={`text-[#a9b1d6] max-w-2xl mx-auto ${
              isMobile ? "text-lg" : "text-xl"
            }`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              delay: 0.5,
              duration: isMobile ? 0.6 : 0.8,
              ease: "easeOut",
            }}
            style={getOptimizedStyle(true)}
          >
            My collection of technologies, frameworks, and tools that power
            modern development
          </motion.p>
        </motion.div>

        <motion.div
          className="relative max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={getOptimizedStyle(true)}
        >
          <div
            className="relative backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-3xl p-8 shadow-2xl"
            style={getOptimizedStyle()}
          >
            <div
              className="absolute top-4 right-4 w-2 h-2 bg-[#7aa2f7] rounded-full opacity-60 animate-pulse"
              style={getOptimizedStyle()}
            />
            <div
              className="absolute bottom-6 left-6 w-3 h-3 bg-[#bb9af7] rounded-full opacity-40 animate-pulse"
              style={{ ...getOptimizedStyle(), animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-[#9ece6a] rounded-full opacity-50 animate-pulse"
              style={{ ...getOptimizedStyle(), animationDelay: "2s" }}
            />

            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-12"
              variants={cardVariants}
              style={getOptimizedStyle(true)}
            >
              {Object.keys(categoryToolsMap).map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => handleTabChange(category)}
                  className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all backdrop-blur-sm overflow-hidden ${
                    isMobile
                      ? "duration-200 text-sm"
                      : "duration-300 text-sm md:text-base"
                  } border ${
                    activeTab === category
                      ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white border-transparent shadow-lg shadow-[#7aa2f7]/25"
                      : "text-[#a9b1d6] border-[#565f89]/50 bg-[#1a1b26]/50 hover:bg-[#24283b]/80 hover:border-[#7aa2f7]/50 hover:text-[#c0caf5]"
                  }`}
                  whileHover={getHoverAnimation()}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    duration: isMobile ? 0.3 : 0.4,
                    ease: "easeOut",
                  }}
                  style={getOptimizedStyle(true)}
                >
                  {activeTab === category && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#bb9af7]/20 to-[#9ece6a]/20 rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={getOptimizedStyle(true)}
                    />
                  )}

                  <div className="relative flex items-center space-x-2">
                    <span className="text-lg">
                      {categoryIcons[category] || "💡"}
                    </span>
                    <span>{category}</span>
                  </div>

                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl bg-gradient-to-r from-[#7aa2f7]/10 to-[#bb9af7]/10 ${
                      isMobile ? "duration-200" : "duration-300"
                    }`}
                    style={getOptimizedStyle(true)}
                  />
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: isMobile ? -15 : -20 }}
                transition={{ duration: isMobile ? 0.3 : 0.4, ease: "easeOut" }}
                style={getOptimizedStyle(true)}
              >
                <motion.div
                  className={`grid gap-4 md:gap-6 ${
                    isMobile
                      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
                  }`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  style={getOptimizedStyle(true)}
                >
                  {categoryToolsMap[activeTab].map((skill, index) => (
                    <motion.div
                      key={skill}
                      variants={skillCardVariants}
                      className="group relative"
                      whileHover={getHoverAnimation(true)}
                      whileTap={isMobile ? { scale: 0.95 } : undefined}
                      style={getOptimizedStyle(true, true)}
                    >
                      <div
                        className={`relative backdrop-blur-sm bg-[#1a1b26]/60 border border-[#565f89]/40 p-4 md:p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all h-full flex flex-col items-center justify-center ${
                          isMobile
                            ? "duration-200 min-h-[100px] md:min-h-[120px]"
                            : "duration-300 min-h-[120px] md:min-h-[140px]"
                        }`}
                        style={getOptimizedStyle(true)}
                      >
                        <div
                          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all rounded-2xl bg-gradient-to-br from-[#7aa2f7]/20 via-[#bb9af7]/10 to-[#9ece6a]/20 blur-sm transform scale-105 ${
                            isMobile ? "duration-200" : "duration-300"
                          }`}
                          style={getOptimizedStyle(true)}
                        />

                        <div
                          className="relative z-10 flex flex-col items-center text-center space-y-3"
                          style={getOptimizedStyle()}
                        >
                          <motion.div
                            className="relative"
                            whileHover={
                              !isMobile
                                ? { rotate: [0, -10, 10, 0] }
                                : undefined
                            }
                            transition={{ duration: 0.5 }}
                            style={getOptimizedStyle(true)}
                          >
                            <i
                              className={`devicon-${skill.toLowerCase()}-plain colored transition-all group-hover:scale-110 group-hover:brightness-110 ${
                                isMobile
                                  ? "text-2xl md:text-3xl duration-200"
                                  : "text-3xl md:text-4xl duration-300"
                              }`}
                              style={getOptimizedStyle(true)}
                            />

                            <div
                              className={`absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity ${
                                isMobile ? "duration-200" : "duration-300"
                              }`}
                              style={getOptimizedStyle(true)}
                            >
                              <i
                                className={`devicon-${skill.toLowerCase()}-plain text-[#7aa2f7] blur-sm ${
                                  isMobile
                                    ? "text-2xl md:text-3xl"
                                    : "text-3xl md:text-4xl"
                                }`}
                              />
                            </div>
                          </motion.div>

                          <motion.p
                            className={`font-semibold text-[#a9b1d6] group-hover:text-[#c0caf5] transition-colors ${
                              isMobile
                                ? "text-xs md:text-sm duration-200"
                                : "text-xs md:text-sm duration-300"
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: index * 0.05 + 0.2,
                              ease: "easeOut",
                            }}
                            style={getOptimizedStyle(true)}
                          >
                            {skill.charAt(0).toUpperCase() + skill.slice(1)}
                          </motion.p>
                        </div>

                        <div
                          className={`absolute top-2 right-2 w-1 h-1 bg-[#7aa2f7] rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                            isMobile ? "duration-200" : "duration-300"
                          }`}
                          style={getOptimizedStyle(true)}
                        />
                        <div
                          className={`absolute bottom-2 left-2 w-1 h-1 bg-[#bb9af7] rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                            isMobile ? "duration-200" : "duration-300"
                          }`}
                          style={getOptimizedStyle(true)}
                        />
                      </div>

                      {!isMobile && index % 3 === 0 && (
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
                          style={getOptimizedStyle(true)}
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="mt-12 pt-8 border-t border-[#565f89]/30"
              initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: isMobile ? 15 : 20 }
              }
              transition={{
                delay: 1,
                duration: isMobile ? 0.4 : 0.6,
                ease: "easeOut",
              }}
              style={getOptimizedStyle(true)}
            >
              <div className="flex flex-wrap justify-center items-center gap-8 text-center">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 bg-[#7aa2f7] rounded-full animate-pulse"
                    style={getOptimizedStyle()}
                  />
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
                    style={{ ...getOptimizedStyle(), animationDelay: "0.5s" }}
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
                    style={{ ...getOptimizedStyle(), animationDelay: "1s" }}
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
});

export default SkillsShowcase;
