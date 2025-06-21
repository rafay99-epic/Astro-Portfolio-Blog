import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@hooks/useIsMobile";
import { useThemeColors } from "@hooks/useTheme";

export default function AboutSection({ authorConfig }: { authorConfig: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const colors = useThemeColors();

  // State for read more/less functionality
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const imageVariants = {
    hidden: {
      scale: 0.9,
      opacity: 0,
      rotateY: isMobile ? 0 : -10,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
        duration: 0.8,
      },
    },
  };

  // Function to truncate text to key points
  const getShortDescription = (text: string, maxLength: number = 120) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Toggle function for read more/less
  const toggleReadMore = (cardIndex: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardIndex]: !prev[cardIndex],
    }));
  };

  // Mobile Layout Component
  const MobileLayout = () => (
    <section ref={ref} className="relative overflow-hidden py-6">
      {/* Simplified mobile background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full blur-2xl"
          style={{ backgroundColor: `${colors.primary}10` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full blur-2xl"
          style={{ backgroundColor: `${colors.secondary}10` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-2 text-gradient-accent"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-sm text-theme-text-secondary max-w-xs mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Get to know the person behind the code
          </motion.p>
        </motion.div>

        {/* Mobile Profile Image - Top */}
        <motion.div
          className="mb-6"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        >
          <div className="relative max-w-[200px] mx-auto">
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-lg border border-theme-border-secondary"
              variants={imageVariants}
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src={authorConfig?.picture ?? ""}
                alt="Profile Image"
                className="w-full h-full object-cover aspect-square"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Mobile gradient overlay */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  background: `linear-gradient(to bottom right, ${colors.primary}, transparent, ${colors.secondary})`,
                }}
              />
            </motion.div>

            {/* Mobile status indicator */}
            <motion.div
              className="absolute -bottom-1 -right-1 p-1.5 rounded-lg shadow-md backdrop-blur-sm border border-theme-border-secondary bg-gradient-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
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

        {/* Mobile Title */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-2 text-gradient-secondary">
            So, who am I?
          </h3>
          <motion.div
            className="mx-auto h-0.5 bg-gradient-primary rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: "60px" } : { width: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
        </motion.div>

        {/* Mobile Content Cards - Stack Vertically */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              title: "Who Am I?",
              content:
                authorConfig?.about?.whoAmI ??
                "A passionate developer creating amazing digital experiences.",
              icon: "👨‍💻",
              delay: 0.5,
            },
            {
              title: "Life Beyond Code",
              content:
                authorConfig?.about?.lifeBeyondCode ??
                "When I'm not coding, you'll find me exploring new technologies and learning new skills.",
              icon: "🌟",
              delay: 0.6,
            },
            {
              title: "Continuous Learning",
              content:
                authorConfig?.about?.continuousLearning ??
                "Always eager to learn and grow, staying updated with the latest trends in technology.",
              icon: "📚",
              delay: 0.7,
            },
          ].map((item, index) => {
            const isExpanded = expandedCards[index];
            const shouldShowToggle = item.content.length > 100;
            const displayContent = isExpanded
              ? item.content
              : getShortDescription(item.content, 100);

            return (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants}
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                }
                transition={{ delay: item.delay, duration: 0.4 }}
              >
                {/* Mobile Card */}
                <div className="relative backdrop-blur-sm bg-theme-card border border-theme-border-secondary rounded-xl p-4 shadow-md">
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl">{item.icon}</span>
                      <h4 className="text-base font-semibold text-theme-text-primary">
                        {item.title}
                      </h4>
                    </div>

                    {/* Mobile text content */}
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={isExpanded ? "expanded" : "collapsed"}
                        className="text-sm text-theme-text-secondary leading-relaxed mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {displayContent}
                      </motion.p>
                    </AnimatePresence>

                    {/* Mobile Read More/Less Button */}
                    {shouldShowToggle && (
                      <motion.button
                        onClick={() => toggleReadMore(index)}
                        className="w-full text-center py-2 text-xs font-medium text-theme-accent bg-theme-bg-secondary rounded-lg border border-theme-border-secondary transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center justify-center space-x-1">
                          <span>{isExpanded ? "Show Less" : "Read More"}</span>
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            ↓
                          </motion.span>
                        </span>
                      </motion.button>
                    )}
                  </div>

                  {/* Mobile hover accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-primary rounded-l-xl opacity-30" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Call to Action */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-primary rounded-xl text-white font-semibold shadow-lg text-sm"
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

  // Desktop Layout Component
  const DesktopLayout = () => (
    <section ref={ref} className="relative overflow-hidden py-8">
      {/* Background with theme colors */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${colors.primary}10` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full blur-3xl"
          style={{ backgroundColor: `${colors.secondary}10` }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-3 text-gradient-accent"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }
            }
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-lg text-theme-text-secondary max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get to know the person behind the code
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Glassmorphism Container */}
          <div className="relative backdrop-blur-xl bg-theme-card border border-theme-border-secondary rounded-3xl p-6 md:p-8 shadow-2xl">
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
                  {/* Image glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-105"
                    style={{
                      background: `linear-gradient(to right, ${colors.primary}20, ${colors.secondary}20, ${colors.accent}20)`,
                    }}
                  />

                  {/* Main image container */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl shadow-xl border-2 border-theme-border-primary group-hover:border-theme-accent transition-all duration-500"
                    variants={imageVariants}
                    whileHover={{
                      scale: 1.03,
                      rotateY: 3,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                      style={{
                        background: `linear-gradient(to bottom right, ${colors.primary}10, transparent, ${colors.secondary}10)`,
                      }}
                    />

                    <motion.img
                      src={authorConfig?.picture ?? ""}
                      alt="Profile Image"
                      className="w-full h-full object-cover aspect-square"
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
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
                    className="absolute -bottom-1 -right-1 bg-gradient-primary p-2 rounded-xl shadow-lg backdrop-blur-sm border border-theme-border-secondary"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
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
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold mb-3 relative text-gradient-secondary"
                    initial={{ opacity: 0, x: -15 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }
                    }
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    So, who am I?
                    {/* Decorative line */}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "50%" } : { width: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </motion.h3>
                </motion.div>

                {/* Content Cards */}
                <div className="space-y-4">
                  {[
                    {
                      title: "Who Am I?",
                      content:
                        authorConfig?.about?.whoAmI ??
                        "A passionate developer creating amazing digital experiences.",
                      icon: "👨‍💻",
                      delay: 0.5,
                    },
                    {
                      title: "Life Beyond Code",
                      content:
                        authorConfig?.about?.lifeBeyondCode ??
                        "When I'm not coding, you'll find me exploring new technologies and learning new skills.",
                      icon: "🌟",
                      delay: 0.6,
                    },
                    {
                      title: "Continuous Learning",
                      content:
                        authorConfig?.about?.continuousLearning ??
                        "Always eager to learn and grow, staying updated with the latest trends in technology.",
                      icon: "📚",
                      delay: 0.7,
                    },
                  ].map((item, index) => {
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
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -20 }
                        }
                        transition={{ delay: item.delay, duration: 0.5 }}
                        whileHover={{ x: 5 }}
                      >
                        {/* Card Background */}
                        <div className="relative backdrop-blur-sm bg-theme-bg-secondary border border-theme-border-secondary rounded-xl p-4 transition-all duration-300 group-hover:border-theme-accent group-hover:shadow-md">
                          {/* Content */}
                          <div className="relative z-10">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg">{item.icon}</span>
                              <h4 className="text-base font-semibold text-theme-text-primary group-hover:text-white transition-colors duration-300">
                                {item.title}
                              </h4>
                            </div>

                            {/* Animated text content */}
                            <AnimatePresence mode="wait">
                              <motion.p
                                key={isExpanded ? "expanded" : "collapsed"}
                                className="text-sm text-theme-text-secondary leading-relaxed group-hover:text-theme-text-primary transition-colors duration-300"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {displayContent}
                              </motion.p>
                            </AnimatePresence>

                            {/* Read More/Less Button */}
                            {shouldShowToggle && (
                              <motion.button
                                onClick={() => toggleReadMore(index)}
                                className="mt-2 text-xs font-medium text-theme-accent hover:text-theme-secondary transition-colors duration-300 flex items-center space-x-1"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <span>
                                  {isExpanded ? "Read Less" : "Read More"}
                                </span>
                                <motion.span
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  ↓
                                </motion.span>
                              </motion.button>
                            )}
                          </div>

                          {/* Side accent */}
                          <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Call to Action */}
                <motion.div
                  className="pt-4"
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 15 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                  }
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <motion.div
                    className="inline-flex items-center px-5 py-2.5 bg-gradient-primary rounded-xl text-white font-semibold shadow-lg cursor-pointer text-sm"
                    whileHover={{
                      scale: 1.03,
                    }}
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

            {/* Bottom decorative line */}
            <motion.div
              className="mt-8 pt-4 border-t border-theme-border-secondary"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
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

  // Return appropriate layout based on screen size
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
