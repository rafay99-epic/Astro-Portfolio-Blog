import React, { useState, useEffect, useRef } from "react";
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaTools,
  FaMapMarkerAlt,
  FaList,
  FaTh,
  FaStream,
  FaSitemap,
} from "react-icons/fa";
import experienceData from "@config/siteConfig/info.json";

const workExperience = experienceData.workExperience;

type LayoutType = "timeline" | "cards" | "list" | "masonry";

const ExperienceSideTimeline = memo(function ExperienceSideTimeline() {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentLayout, setCurrentLayout] = useState<LayoutType>("timeline");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Simple mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection observer for animations
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
    accent: "#9ece6a",
    background: {
      primary: "#1a1b26",
      secondary: "#24283b",
      card: "#2d3142",
    },
    text: {
      primary: "#c0caf5",
      secondary: "#a9b1d6",
      muted: "#565f89",
    },
    border: "#565f89",
  };

  const layoutOptions = [
    { id: "timeline", name: "Timeline", icon: FaStream },
    { id: "cards", name: "Cards", icon: FaTh },
    { id: "list", name: "List", icon: FaList },
    { id: "masonry", name: "Masonry", icon: FaSitemap },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Layout Switcher Component
  const LayoutSwitcher = () => (
    <motion.div
      className="flex justify-center mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="flex backdrop-blur-sm border rounded-xl p-1 shadow-lg"
        style={{
          backgroundColor: `${colors.background.card}60`,
          borderColor: `${colors.border}40`,
        }}
      >
        {layoutOptions.map((layout) => {
          const IconComponent = layout.icon;
          return (
            <motion.button
              key={layout.id}
              onClick={() => setCurrentLayout(layout.id as LayoutType)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentLayout === layout.id ? "shadow-md" : ""
              }`}
              style={{
                backgroundColor:
                  currentLayout === layout.id
                    ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                    : "transparent",
                color:
                  currentLayout === layout.id ? "white" : colors.text.secondary,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconComponent className="text-xs" />
              {!isMobile && <span>{layout.name}</span>}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );

  // Timeline Layout
  const TimelineLayout = () => (
    <motion.div
      key="timeline"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="relative"
    >
      {/* Timeline Line */}
      <div
        className={`absolute ${
          isMobile ? "left-4" : "left-1/2 transform -translate-x-0.5"
        } h-full w-0.5 opacity-30`}
        style={{
          background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
        }}
      />

      {workExperience.map((job, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className={`relative mb-12 ${
            isMobile
              ? "pl-12"
              : `flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`
          }`}
        >
          {/* Timeline Dot */}
          <div
            className={`absolute ${
              isMobile
                ? "left-2.5 top-6"
                : "left-1/2 transform -translate-x-1/2"
            } w-4 h-4 rounded-full shadow-lg z-20`}
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 0 15px ${colors.primary}50`,
            }}
          />

          {/* Connector Line for Desktop */}
          {!isMobile && (
            <div
              className={`absolute top-1/2 transform -translate-y-0.5 w-8 h-0.5 z-10 ${
                index % 2 === 0 ? "left-1/2 ml-2" : "right-1/2 mr-2"
              }`}
              style={{
                background: `linear-gradient(${
                  index % 2 === 0 ? "to right" : "to left"
                }, ${colors.primary}, ${colors.secondary})`,
              }}
            />
          )}

          {/* Experience Card */}
          <ExperienceCard
            job={job}
            index={index}
            className={isMobile ? "w-full" : "w-full md:w-[calc(50%-3rem)]"}
          />
        </motion.div>
      ))}
    </motion.div>
  );

  // Cards Layout
  const CardsLayout = () => (
    <motion.div
      key="cards"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`grid gap-6 ${
        isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {workExperience.map((job, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <ExperienceCard job={job} index={index} compact />
        </motion.div>
      ))}
    </motion.div>
  );

  // List Layout
  const ListLayout = () => (
    <motion.div
      key="list"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="space-y-4"
    >
      {workExperience.map((job, index) => (
        <motion.div key={index} variants={itemVariants} className="group">
          <div
            className="flex items-center gap-4 p-4 backdrop-blur-sm border rounded-xl hover:shadow-lg transition-all duration-300"
            style={{
              backgroundColor: `${colors.background.card}40`,
              borderColor: `${colors.border}30`,
            }}
          >
            <div
              className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              <FaBriefcase className="text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3
                className="text-lg font-bold truncate"
                style={{ color: colors.text.primary }}
              >
                {job.position}
              </h3>
              <p
                className="text-sm font-medium"
                style={{ color: colors.secondary }}
              >
                {job.companyName}
              </p>
            </div>

            <div className="flex-shrink-0 text-right">
              <div className="flex items-center gap-2 text-xs mb-1">
                <FaCalendarAlt style={{ color: colors.accent }} />
                <span style={{ color: colors.text.secondary }}>
                  {job.employmentTime}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 justify-end">
                {job.toolsUsed.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded border"
                    style={{
                      backgroundColor: `${colors.background.primary}60`,
                      borderColor: `${colors.border}40`,
                      color: colors.primary,
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {job.toolsUsed.length > 3 && (
                  <span
                    className="text-xs px-2 py-0.5 rounded border"
                    style={{
                      backgroundColor: `${colors.background.secondary}60`,
                      borderColor: `${colors.border}40`,
                      color: colors.text.muted,
                    }}
                  >
                    +{job.toolsUsed.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  // Masonry Layout
  const MasonryLayout = () => (
    <motion.div
      key="masonry"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`columns-1 ${isMobile ? "" : "md:columns-2 lg:columns-3"} gap-6 space-y-6`}
    >
      {workExperience.map((job, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="break-inside-avoid mb-6"
          whileHover={{ scale: 1.02 }}
        >
          <ExperienceCard job={job} index={index} masonry />
        </motion.div>
      ))}
    </motion.div>
  );

  // Experience Card Component
  const ExperienceCard = ({
    job,
    index,
    compact = false,
    masonry = false,
    className = "",
  }: {
    job: any;
    index: number;
    compact?: boolean;
    masonry?: boolean;
    className?: string;
  }) => (
    <div className={className}>
      <div
        className={`group relative backdrop-blur-sm border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
          compact ? "p-4" : "p-6"
        }`}
        style={{
          backgroundColor: `${colors.background.card}60`,
          borderColor: `${colors.border}40`,
        }}
      >
        {/* Decorative Corner */}
        <div
          className={`absolute top-0 right-0 rounded-bl-3xl rounded-tr-xl opacity-20 ${
            compact ? "w-16 h-16" : "w-20 h-20"
          }`}
          style={{
            background: `linear-gradient(to bottom left, ${colors.primary}, transparent)`,
          }}
        />

        {/* Header */}
        <div className={`relative z-10 ${compact ? "mb-3" : "mb-4"}`}>
          <div
            className={`flex items-start gap-3 ${compact ? "mb-2" : "mb-3"}`}
          >
            <div
              className={`flex-shrink-0 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                compact ? "w-10 h-10" : "w-12 h-12"
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              <FaBriefcase
                className={`text-white ${compact ? "text-sm" : "text-base"}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`font-bold leading-tight ${
                  compact ? "text-base" : "text-lg"
                }`}
                style={{ color: colors.text.primary }}
              >
                {job.position}
              </h3>
              <p
                className={`font-semibold ${compact ? "text-sm" : "text-base"}`}
                style={{ color: colors.secondary }}
              >
                @ {job.companyName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <FaCalendarAlt style={{ color: colors.accent }} />
            <span style={{ color: colors.text.secondary }}>
              {job.employmentTime}
            </span>
          </div>
        </div>

        {/* Responsibilities */}
        {!compact && (
          <div className="relative z-10 mb-4">
            <h4
              className="text-sm font-semibold mb-2 flex items-center gap-2"
              style={{ color: colors.text.primary }}
            >
              <span>📋</span>
              Key Responsibilities
            </h4>
            <ul className="space-y-1">
              {job.roles
                .slice(0, masonry ? 4 : 3)
                .map((role: string, idx: number) => (
                  <li
                    key={idx}
                    className="text-xs leading-relaxed flex items-start gap-2"
                    style={{ color: colors.text.secondary }}
                  >
                    <span
                      className="text-xs mt-0.5"
                      style={{ color: colors.accent }}
                    >
                      ▸
                    </span>
                    <span>{role}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        <div className="relative z-10">
          <h4
            className="text-sm font-semibold mb-2 flex items-center gap-2"
            style={{ color: colors.text.primary }}
          >
            <FaTools style={{ color: colors.secondary }} />
            Technologies
          </h4>
          <div className="flex flex-wrap gap-1">
            {job.toolsUsed
              .slice(0, compact ? 4 : 6)
              .map((tech: string, techIdx: number) => (
                <span
                  key={techIdx}
                  className="text-xs px-2 py-1 rounded border"
                  style={{
                    backgroundColor: `${colors.background.primary}60`,
                    borderColor: `${colors.border}40`,
                    color: colors.primary,
                  }}
                >
                  {tech}
                </span>
              ))}
            {job.toolsUsed.length > (compact ? 4 : 6) && (
              <span
                className="text-xs px-2 py-1 rounded border"
                style={{
                  backgroundColor: `${colors.background.secondary}60`,
                  borderColor: `${colors.border}40`,
                  color: colors.text.muted,
                }}
              >
                +{job.toolsUsed.length - (compact ? 4 : 6)}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div
          className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500 ease-out rounded-b-xl"
          style={{
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
          }}
        />
      </div>
    </div>
  );

  const renderLayout = () => {
    switch (currentLayout) {
      case "timeline":
        return <TimelineLayout />;
      case "cards":
        return <CardsLayout />;
      case "list":
        return <ListLayout />;
      case "masonry":
        return <MasonryLayout />;
      default:
        return <TimelineLayout />;
    }
  };

  return (
    <section ref={sectionRef} className="py-8 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-15">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: colors.primary }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full blur-3xl"
          style={{ backgroundColor: colors.secondary }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`font-bold mb-4 ${
              isMobile ? "text-2xl" : "text-4xl lg:text-5xl"
            }`}
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            💼 Professional Experience
          </h2>
          <p
            className={`max-w-2xl mx-auto ${isMobile ? "text-sm" : "text-lg"}`}
            style={{ color: colors.text.secondary }}
          >
            My journey through various roles and technologies in software
            development
          </p>
        </motion.div>

        {/* Layout Switcher */}
        <LayoutSwitcher />

        {/* Dynamic Layout Content */}
        <AnimatePresence mode="wait">{renderLayout()}</AnimatePresence>

        {/* Stats Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div
            className="backdrop-blur-sm border rounded-xl p-6"
            style={{
              backgroundColor: `${colors.background.card}40`,
              borderColor: `${colors.border}30`,
            }}
          >
            <div
              className={`grid gap-6 text-center ${
                isMobile ? "grid-cols-3" : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              <div>
                <div
                  className={`font-bold mb-1 ${
                    isMobile ? "text-xl" : "text-3xl"
                  }`}
                  style={{ color: colors.primary }}
                >
                  {workExperience.length}
                </div>
                <div
                  className={`${isMobile ? "text-xs" : "text-base"}`}
                  style={{ color: colors.text.secondary }}
                >
                  Positions
                </div>
              </div>
              <div
                className={isMobile ? "" : "md:border-l md:border-r"}
                style={{ borderColor: `${colors.border}30` }}
              >
                <div
                  className={`font-bold mb-1 ${
                    isMobile ? "text-xl" : "text-3xl"
                  }`}
                  style={{ color: colors.secondary }}
                >
                  {new Set(workExperience.flatMap((job) => job.toolsUsed)).size}
                </div>
                <div
                  className={`${isMobile ? "text-xs" : "text-base"}`}
                  style={{ color: colors.text.secondary }}
                >
                  Technologies
                </div>
              </div>
              <div>
                <div
                  className={`font-bold mb-1 ${
                    isMobile ? "text-xl" : "text-3xl"
                  }`}
                  style={{ color: colors.accent }}
                >
                  {workExperience.reduce(
                    (total, job) => total + job.roles.length,
                    0
                  )}
                </div>
                <div
                  className={`${isMobile ? "text-xs" : "text-base"}`}
                  style={{ color: colors.text.secondary }}
                >
                  Responsibilities
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default ExperienceSideTimeline;
