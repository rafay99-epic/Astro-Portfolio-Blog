import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function AboutSection({ authorConfig }: { authorConfig: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // State for read more/less functionality
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#7aa2f7]/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#bb9af7]/10 rounded-full blur-2xl" />
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
            className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-sm text-[#a9b1d6] max-w-xs mx-auto"
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
              className="relative overflow-hidden rounded-2xl shadow-lg border border-[#565f89]/30"
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
              <div className="absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/5 via-transparent to-[#bb9af7]/5"></div>
            </motion.div>

            {/* Mobile status indicator */}
            <motion.div
              className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#9ece6a] to-[#7aa2f7] p-1.5 rounded-lg shadow-md backdrop-blur-sm border border-[#565f89]/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-[#9ece6a] rounded-full animate-pulse"></div>
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
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent">
            So, who am I?
          </h3>
          <motion.div
            className="mx-auto h-0.5 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: "60px" } : { width: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          ></motion.div>
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
              content: authorConfig?.about?.whoAmI ?? "",
              icon: "👨‍💻",
              gradient: "from-[#7aa2f7]/20 to-[#bb9af7]/20",
              delay: 0.5,
            },
            {
              title: "Life Beyond Code",
              content: authorConfig?.about?.lifeBeyondCode ?? "",
              icon: "🌟",
              gradient: "from-[#bb9af7]/20 to-[#9ece6a]/20",
              delay: 0.6,
            },
            {
              title: "Continuous Learning",
              content: authorConfig?.about?.continuousLearning ?? "",
              icon: "📚",
              gradient: "from-[#9ece6a]/20 to-[#7aa2f7]/20",
              delay: 0.7,
            },
          ].map((item, index) => {
            const isExpanded = expandedCards[index];
            const shouldShowToggle = item.content.length > 100; // Shorter for mobile
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
                <div className="relative backdrop-blur-sm bg-[#24283b]/60 border border-[#565f89]/30 rounded-xl p-4 shadow-md">
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl">{item.icon}</span>
                      <h4 className="text-base font-semibold text-[#c0caf5]">
                        {item.title}
                      </h4>
                    </div>

                    {/* Mobile text content */}
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={isExpanded ? "expanded" : "collapsed"}
                        className="text-sm text-[#a9b1d6] leading-relaxed mb-3"
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
                        className="w-full text-center py-2 text-xs font-medium text-[#7aa2f7] bg-[#1a1b26]/50 rounded-lg border border-[#565f89]/30 transition-colors duration-300"
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
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#7aa2f7] to-[#bb9af7] rounded-l-xl opacity-30"></div>
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
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-xl text-white font-semibold shadow-lg text-sm"
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

  // Desktop Layout Component (existing layout)
  const DesktopLayout = () => (
    <section ref={ref} className="relative overflow-hidden py-8">
      {/* Simplified background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7aa2f7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-[#bb9af7]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Compact Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }
            }
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-lg text-[#a9b1d6] max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get to know the person behind the code
          </motion.p>
        </motion.div>

        {/* Main Content - More Compact */}
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Glassmorphism Container - Reduced Padding */}
          <div className="relative backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-3xl p-6 md:p-8 shadow-2xl">
            {/* Floating decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-[#7aa2f7] rounded-full opacity-60 animate-pulse"></div>
            <div
              className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-[#bb9af7] rounded-full opacity-40 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Profile Image Section - Moved Up */}
              <motion.div
                className="relative order-2 lg:order-1"
                variants={itemVariants}
              >
                <div className="relative group max-w-sm mx-auto">
                  {/* Image glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7]/20 via-[#bb9af7]/20 to-[#9ece6a]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-105"></div>

                  {/* Main image container - Reduced size */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl shadow-xl border-2 border-[#565f89]/50 group-hover:border-[#7aa2f7]/50 transition-all duration-500"
                    variants={imageVariants}
                    whileHover={{
                      scale: 1.03,
                      rotateY: 3,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/10 via-transparent to-[#bb9af7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                    <motion.img
                      src={authorConfig?.picture ?? ""}
                      alt="Profile Image"
                      className="w-full h-full object-cover aspect-square"
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />

                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#7aa2f7] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#bb9af7] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </motion.div>

                  {/* Floating status indicator - Smaller */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#9ece6a] to-[#7aa2f7] p-2 rounded-xl shadow-lg backdrop-blur-sm border border-[#565f89]/30"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 bg-[#9ece6a] rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-semibold">
                        Available
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Section - Moved Up, Condensed */}
              <motion.div
                className="space-y-6 order-1 lg:order-2"
                variants={itemVariants}
              >
                {/* Main Title - Smaller */}
                <motion.div className="relative" variants={itemVariants}>
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold mb-3 relative"
                    initial={{ opacity: 0, x: -15 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }
                    }
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <span className="bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent">
                      So, who am I?
                    </span>

                    {/* Decorative line */}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "50%" } : { width: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    ></motion.div>
                  </motion.h3>
                </motion.div>

                {/* Content Cards with Read More/Less */}
                <div className="space-y-4">
                  {[
                    {
                      title: "Who Am I?",
                      content: authorConfig?.about?.whoAmI ?? "",
                      icon: "👨‍💻",
                      gradient: "from-[#7aa2f7]/20 to-[#bb9af7]/20",
                      delay: 0.5,
                    },
                    {
                      title: "Life Beyond Code",
                      content: authorConfig?.about?.lifeBeyondCode ?? "",
                      icon: "🌟",
                      gradient: "from-[#bb9af7]/20 to-[#9ece6a]/20",
                      delay: 0.6,
                    },
                    {
                      title: "Continuous Learning",
                      content: authorConfig?.about?.continuousLearning ?? "",
                      icon: "📚",
                      gradient: "from-[#9ece6a]/20 to-[#7aa2f7]/20",
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
                        {/* Card Background - Reduced padding */}
                        <div className="relative backdrop-blur-sm bg-[#1a1b26]/60 border border-[#565f89]/40 rounded-xl p-4 transition-all duration-300 group-hover:border-[#7aa2f7]/50 group-hover:shadow-md group-hover:shadow-[#7aa2f7]/10">
                          {/* Hover glow */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}
                          ></div>

                          {/* Content */}
                          <div className="relative z-10">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg">{item.icon}</span>
                              <h4 className="text-base font-semibold text-[#c0caf5] group-hover:text-white transition-colors duration-300">
                                {item.title}
                              </h4>
                            </div>

                            {/* Animated text content */}
                            <AnimatePresence mode="wait">
                              <motion.p
                                key={isExpanded ? "expanded" : "collapsed"}
                                className="text-sm text-[#a9b1d6] leading-relaxed group-hover:text-[#c0caf5] transition-colors duration-300"
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
                                className="mt-2 text-xs font-medium text-[#7aa2f7] hover:text-[#bb9af7] transition-colors duration-300 flex items-center space-x-1"
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
                          <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#7aa2f7] to-[#bb9af7] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Call to Action - Smaller */}
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
                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-xl text-white font-semibold shadow-lg shadow-[#7aa2f7]/25 cursor-pointer text-sm"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 15px 30px rgba(122, 162, 247, 0.3)",
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

            {/* Bottom decorative line - Smaller */}
            <motion.div
              className="mt-8 pt-4 border-t border-[#565f89]/30"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="flex justify-center">
                <div className="flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-[#7aa2f7] rounded-full animate-pulse"></div>
                  <div
                    className="w-1.5 h-1.5 bg-[#bb9af7] rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-[#9ece6a] rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
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
