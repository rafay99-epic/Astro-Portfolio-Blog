import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTools,
} from "react-icons/fa";
import experienceData from "@config/siteConfig/info.json";

const workExperience = experienceData.workExperience;

export default function ExperienceSideTimeline() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent">
              💼 Professional Experience
            </span>
          </h2>
          <p className="text-[#a9b1d6] text-sm md:text-base max-w-2xl mx-auto">
            My journey through various roles and technologies in the software
            development industry
          </p>
        </motion.div>

        {/* Timeline Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Timeline Line - Hidden on Mobile */}
          {!isMobile && (
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-gradient-to-b from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] opacity-30" />
          )}

          {/* Mobile Timeline Line */}
          {isMobile && (
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] opacity-30" />
          )}

          {/* Experience Items */}
          {workExperience.map((job, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`relative mb-12 ${
                isMobile
                  ? "ml-12"
                  : `flex ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center gap-8`
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute ${
                  isMobile
                    ? "-left-14 top-6"
                    : "left-1/2 transform -translate-x-1/2"
                } w-4 h-4 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-full shadow-lg shadow-[#7aa2f7]/50 z-10`}
              />

              {/* Experience Card */}
              <motion.div
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className={`group relative backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-6 shadow-xl hover:bg-[#2d3142]/60 hover:border-[#7aa2f7]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7aa2f7]/10 ${
                  isMobile ? "w-full" : "w-full md:w-[calc(50%-2rem)]"
                }`}
              >
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#7aa2f7]/20 to-transparent rounded-bl-3xl rounded-tr-2xl" />

                {/* Header */}
                <div className="relative z-10 mb-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaBriefcase className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#c0caf5] group-hover:text-[#7aa2f7] transition-colors duration-300 leading-tight">
                        {job.position}
                      </h3>
                      <p className="text-[#bb9af7] font-semibold text-lg">
                        @ {job.companyName}
                      </p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 text-sm text-[#a9b1d6] mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#9ece6a] text-xs" />
                      <span>{job.employmentTime}</span>
                    </div>
                  </div>
                </div>

                {/* Roles/Responsibilities */}
                <div className="relative z-10 mb-6">
                  <h4 className="text-sm font-semibold text-[#c0caf5] mb-3 flex items-center gap-2">
                    <span className="text-[#7aa2f7]">📋</span>
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {job.roles.map((role, idx) => (
                      <li
                        key={idx}
                        className="text-[#a9b1d6] text-sm leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-[#9ece6a] text-xs mt-1.5">▸</span>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="relative z-10">
                  <h4 className="text-sm font-semibold text-[#c0caf5] mb-3 flex items-center gap-2">
                    <FaTools className="text-[#bb9af7] text-xs" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.toolsUsed.map((tech, techIdx) => (
                      <motion.span
                        key={techIdx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#7aa2f7] text-xs px-3 py-1.5 rounded-lg hover:bg-[#24283b]/60 hover:border-[#7aa2f7]/60 hover:text-[#c0caf5] transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-[#7aa2f7]/10 to-[#bb9af7]/10 rounded-full blur-2xl" />
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl" />
              </motion.div>

              {/* Timeline Connection Arrow - Desktop Only */}
              {!isMobile && (
                <div
                  className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 ${
                    i % 2 === 0 ? "right-1/2 mr-4" : "left-1/2 ml-4"
                  }`}
                >
                  <div
                    className={`w-4 h-0.5 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] ${
                      i % 2 === 0 ? "" : "rotate-180"
                    }`}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-[#7aa2f7] mb-1">
                  {workExperience.length}
                </div>
                <div className="text-[#a9b1d6] text-sm">Positions</div>
              </div>
              <div className="sm:border-l sm:border-r border-[#565f89]/30">
                <div className="text-2xl font-bold text-[#bb9af7] mb-1">
                  {new Set(workExperience.flatMap((job) => job.toolsUsed)).size}
                </div>
                <div className="text-[#a9b1d6] text-sm">Technologies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#9ece6a] mb-1">
                  {workExperience.reduce(
                    (total, job) => total + job.roles.length,
                    0
                  )}
                </div>
                <div className="text-[#a9b1d6] text-sm">Responsibilities</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
