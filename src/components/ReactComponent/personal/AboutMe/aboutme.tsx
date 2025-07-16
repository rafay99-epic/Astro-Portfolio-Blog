import React, { memo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AboutSectionProps {
  authorConfig: {
    picture?: string;
    about?: {
      whoAmI?: string;
      lifeBeyondCode?: string;
      continuousLearning?: string;
    };
  };
}

const AboutSection = memo(function AboutSection({
  authorConfig,
}: AboutSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const fallbackTimer = setTimeout(() => setIsVisible(true), 100);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const colors = {
    primary: "#7aa2f7",
    secondary: "#bb9af7",
    accent: "#7aa2f7",
    background: {
      primary: "#1a1b26",
      secondary: "#24283b",
      card: "#24283b",
    },
    text: {
      primary: "#c0caf5",
      secondary: "#a9b1d6",
      muted: "#565f89",
    },
    border: { primary: "#565f89", secondary: "#414868" },
    status: { success: "#9ece6a" },
  };

  const contentData = [
    {
      title: "Who Am I?",
      content:
        authorConfig?.about?.whoAmI ??
        "A passionate developer creating amazing digital experiences.",
      icon: "👨‍💻",
    },
    {
      title: "Life Beyond Code",
      content:
        authorConfig?.about?.lifeBeyondCode ??
        "When I'm not coding, you'll find me exploring new technologies and learning new skills.",
      icon: "🌟",
    },
    {
      title: "Continuous Learning",
      content:
        authorConfig?.about?.continuousLearning ??
        "Always eager to learn and grow, staying updated with the latest trends in technology.",
      icon: "📚",
    },
  ];

  const getShortDescription = (text: string, maxLength: number = 120) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const toggleReadMore = (cardIndex: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardIndex]: !prev[cardIndex],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-6"
        style={{
          background: `linear-gradient(135deg, ${colors.background.primary} 0%, ${colors.background.secondary} 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full blur-2xl"
            style={{ backgroundColor: `${colors.primary}20` }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full blur-2xl"
            style={{ backgroundColor: `${colors.secondary}20` }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl font-bold mb-2"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              About Me
            </h2>
            <p
              className="text-sm max-w-xs mx-auto"
              style={{ color: colors.text.secondary }}
            >
              Get to know the person behind the code
            </p>
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative max-w-[200px] mx-auto">
              <div
                className="relative overflow-hidden rounded-2xl shadow-lg border-2"
                style={{ borderColor: colors.border.secondary }}
              >
                <img
                  src={authorConfig?.picture ?? ""}
                  alt="Profile Image"
                  className="w-full h-full object-cover aspect-square"
                  loading="eager"
                />
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: `linear-gradient(to bottom right, ${colors.primary}, transparent, ${colors.secondary})`,
                  }}
                />
              </div>

              <motion.div
                className="absolute -bottom-1 -right-1 p-1.5 rounded-lg shadow-md backdrop-blur-sm border"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  borderColor: colors.border.secondary,
                }}
                initial={{ scale: 0 }}
                animate={isVisible ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div className="flex items-center space-x-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: colors.status.success }}
                  />
                  <span className="text-white text-xs font-medium">
                    Available
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3
              className="text-2xl font-bold mb-2"
              style={{
                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              So, who am I?
            </h3>
            <motion.div
              className="mx-auto h-0.5 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              }}
              initial={{ width: 0 }}
              animate={isVisible ? { width: "60px" } : { width: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {contentData.map((item, index) => {
              const isExpanded = expandedCards[index];
              const shouldShowToggle = item.content.length > 100;
              const displayContent = isExpanded
                ? item.content
                : getShortDescription(item.content, 100);

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <div
                    className="relative backdrop-blur-sm border rounded-xl p-4 shadow-md"
                    style={{
                      backgroundColor: colors.background.card,
                      borderColor: colors.border.secondary,
                    }}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl">{item.icon}</span>
                      <h4
                        className="text-base font-semibold"
                        style={{ color: colors.text.primary }}
                      >
                        {item.title}
                      </h4>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.p
                        key={isExpanded ? "expanded" : "collapsed"}
                        className="text-sm leading-relaxed mb-3"
                        style={{ color: colors.text.secondary }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {displayContent}
                      </motion.p>
                    </AnimatePresence>

                    {shouldShowToggle && (
                      <motion.button
                        onClick={() => toggleReadMore(index)}
                        className="w-full text-center py-2 text-xs font-medium rounded-lg border transition-colors duration-300"
                        style={{
                          color: colors.accent,
                          backgroundColor: colors.background.secondary,
                          borderColor: colors.border.secondary,
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center justify-center space-x-1">
                          <span>{isExpanded ? "Show Less" : "Read More"}</span>
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            ↓
                          </motion.span>
                        </span>
                      </motion.button>
                    )}

                    <div
                      className="absolute top-0 left-0 w-1 h-full rounded-l-xl opacity-30"
                      style={{
                        background: `linear-gradient(180deg, ${colors.primary}, ${colors.secondary})`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <motion.div
              className="inline-flex items-center px-6 py-3 rounded-xl text-white font-semibold shadow-lg text-sm cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-2">Let's connect</span>
              <motion.span
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Desktop Layout
  return (
    <section ref={sectionRef} className="relative overflow-hidden py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${colors.primary}15` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full blur-3xl"
          style={{ backgroundColor: `${colors.secondary}15` }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl lg:text-5xl font-bold mb-3"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About Me
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: colors.text.secondary }}
          >
            Get to know the person behind the code
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div
            className="relative backdrop-blur-xl border rounded-3xl p-6 md:p-8 shadow-2xl"
            style={{
              backgroundColor: `${colors.background.card}80`,
              borderColor: colors.border.secondary,
            }}
          >
            {/* Decorative elements */}
            <div
              className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60 animate-pulse"
              style={{ backgroundColor: colors.primary }}
            />
            <div
              className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full opacity-40 animate-pulse"
              style={{
                backgroundColor: colors.secondary,
                animationDelay: "1s",
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Profile Image Section */}
              <motion.div
                className="relative order-2 lg:order-1"
                variants={itemVariants}
              >
                <div className="relative group max-w-sm mx-auto">
                  <motion.div
                    className="relative overflow-hidden rounded-2xl shadow-xl border-2 transition-all duration-500"
                    style={{ borderColor: colors.border.primary }}
                    whileHover={{
                      scale: 1.03,
                      borderColor: colors.accent,
                    }}
                  >
                    <img
                      src={authorConfig?.picture ?? ""}
                      alt="Profile Image"
                      className="w-full h-full object-cover aspect-square"
                      loading="eager"
                    />

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to bottom right, ${colors.primary}10, transparent, ${colors.secondary}10)`,
                      }}
                    />

                    {/* Corner accents */}
                    <div
                      className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ borderColor: colors.primary }}
                    />
                    <div
                      className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ borderColor: colors.secondary }}
                    />
                  </motion.div>

                  {/* Status indicator */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 p-2 rounded-xl shadow-lg backdrop-blur-sm border"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      borderColor: colors.border.secondary,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isVisible
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{ delay: 0.6, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center space-x-1.5">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: colors.status.success }}
                      />
                      <span className="text-white text-xs font-semibold">
                        Available
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                className="space-y-6 order-1 lg:order-2"
                variants={itemVariants}
              >
                {/* Main Title */}
                <motion.div className="relative" variants={itemVariants}>
                  <h3
                    className="text-3xl md:text-4xl font-bold mb-3 relative"
                    style={{
                      background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    So, who am I?
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                      }}
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: "50%" } : { width: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    />
                  </h3>
                </motion.div>

                {/* Content Cards */}
                <div className="space-y-4">
                  {contentData.map((item, index) => {
                    const isExpanded = expandedCards[index];
                    const shouldShowToggle = item.content.length > 120;
                    const displayContent = isExpanded
                      ? item.content
                      : getShortDescription(item.content, 120);

                    return (
                      <motion.div
                        key={index}
                        className="group relative"
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                      >
                        <div
                          className="relative backdrop-blur-sm border rounded-xl p-4 transition-all duration-300 group-hover:shadow-md"
                          style={{
                            backgroundColor: colors.background.secondary,
                            borderColor: colors.border.secondary,
                          }}
                        >
                          <div className="relative z-10">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg">{item.icon}</span>
                              <h4
                                className="text-base font-semibold transition-colors duration-300"
                                style={{ color: colors.text.primary }}
                              >
                                {item.title}
                              </h4>
                            </div>

                            <AnimatePresence mode="wait">
                              <motion.p
                                key={isExpanded ? "expanded" : "collapsed"}
                                className="text-sm leading-relaxed transition-colors duration-300"
                                style={{ color: colors.text.secondary }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                {displayContent}
                              </motion.p>
                            </AnimatePresence>

                            {shouldShowToggle && (
                              <motion.button
                                onClick={() => toggleReadMore(index)}
                                className="mt-2 text-xs font-medium transition-colors duration-300 flex items-center space-x-1"
                                style={{ color: colors.accent }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <span>
                                  {isExpanded ? "Read Less" : "Read More"}
                                </span>
                                <motion.span
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.25 }}
                                >
                                  ↓
                                </motion.span>
                              </motion.button>
                            )}
                          </div>

                          <div
                            className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(180deg, ${colors.primary}, ${colors.secondary})`,
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Call to Action */}
                <motion.div className="pt-4" variants={itemVariants}>
                  <motion.div
                    className="inline-flex items-center px-5 py-2.5 rounded-xl text-white font-semibold shadow-lg cursor-pointer text-sm"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-2">Let's connect</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="mt-8 pt-4 border-t"
              style={{ borderColor: colors.border.secondary }}
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <div className="flex justify-center">
                <div className="flex items-center space-x-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      backgroundColor: colors.secondary,
                      animationDelay: "0.5s",
                    }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      backgroundColor: colors.accent,
                      animationDelay: "1s",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default AboutSection;
