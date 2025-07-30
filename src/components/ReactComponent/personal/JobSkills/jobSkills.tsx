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
import authorConfig from "../../../../config/siteConfig/info.json";

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

  const categoryIcons: Record<string, React.ReactElement> = useMemo(
    () => ({
      "App Development": (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 2H7C5.9 2 5 2.9 5 4V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V4C19 2.9 18.1 2 17 2ZM17 20H7V4H17V20Z"/>
          <path d="M12 18C12.83 18 13.5 17.33 13.5 16.5S12.83 15 12 15S10.5 15.67 10.5 16.5S11.17 18 12 18Z"/>
        </svg>
      ),
      "Frontend Development": (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4S20 7.59 20 12S16.41 20 12 20Z"/>
          <path d="M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18S18 15.31 18 12S15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12S9.79 8 12 8S16 9.79 16 12S14.21 16 12 16Z"/>
        </svg>
      ),
      "Backend Development": (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3H21V5H3V3ZM3 7H21V9H3V7ZM3 11H21V13H3V11ZM3 15H21V17H3V15ZM3 19H21V21H3V19Z"/>
        </svg>
      ),
      "Cloud Computing": (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM19 18H6C3.79 18 2 16.21 2 14C2 11.79 3.79 10 6 10H7.13C7.68 7.69 9.67 6 12 6C14.33 6 16.32 7.69 16.87 10H19C20.66 10 22 11.34 22 13C22 14.66 20.66 16 19 16V18Z"/>
        </svg>
      ),
      "Essential": (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
          <path d="M2 17L12 22L22 17"/>
          <path d="M2 12L12 17L22 12"/>
        </svg>
      ),
      "Scripting": (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.23,12.004a2.236,2.236,0,0,1-2.235,2.236,2.236,2.236,0,0,1-2.236-2.236,2.236,2.236,0,0,1,2.235-2.236A2.236,2.236,0,0,1,14.23,12.004ZM11.995,24c-.263,0-.527-.027-.789-.077a12.044,12.044,0,0,1-9.46-9.461A11.87,11.87,0,0,1,1.5,12.005a11.87,11.87,0,0,1,.246-2.457,12.044,12.044,0,0,1,9.46-9.46A11.87,11.87,0,0,1,12.005,0a11.87,11.87,0,0,1,2.457.246,12.044,12.044,0,0,1,9.46,9.46,11.87,11.87,0,0,1,.246,2.457,11.87,11.87,0,0,1-.246,2.457,12.044,12.044,0,0,1-9.46,9.46A11.87,11.87,0,0,1,11.995,24ZM3.609,12.005a8.386,8.386,0,0,0,8.386,8.386,8.386,8.386,0,0,0,8.386-8.386,8.386,8.386,0,0,0-8.386-8.386A8.386,8.386,0,0,0,3.609,12.005Z"/>
        </svg>
      ),
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
                    <div className="flex items-center justify-center">
                      {categoryIcons[category] || (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4S20 7.59 20 12S16.41 20 12 20Z"/>
                          <path d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11Z"/>
                        </svg>
                      )}
                    </div>
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
                      {(Object.values(categoryToolsMap) as string[][]).reduce(
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
