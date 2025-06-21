import { motion, type Variants } from "framer-motion";
import {
  FaBookOpen,
  FaGraduationCap,
  FaPenFancy,
  FaLightbulb,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import clsx from "clsx";

type SubjectGridProps = {
  subjects: {
    name: string;
    noteCount?: number;
    totalExpectedNotes?: number;
  }[];
};

const subjectIcons = [FaBookOpen, FaGraduationCap, FaPenFancy, FaLightbulb];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.6,
    },
  },
};

export default function SubjectGrid({ subjects }: SubjectGridProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent">
              📚 Study Subjects
            </span>
          </h2>
          <p className="text-[#a9b1d6] text-sm md:text-base max-w-2xl mx-auto">
            Explore comprehensive notes and materials across different academic
            subjects
          </p>
        </motion.div>

        {/* Subjects Grid */}
        <motion.section
          className={`grid gap-6 ${
            isMobile
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {subjects.map((subject, idx) => {
            const IconComponent = subjectIcons[idx % subjectIcons.length];

            // Calculate meaningful progress
            const progress =
              subject.totalExpectedNotes && subject.noteCount
                ? Math.round(
                    (subject.noteCount / subject.totalExpectedNotes) * 100
                  )
                : null;

            return (
              <motion.a
                key={subject.name}
                href={`/ms_notes/${encodeURIComponent(subject.name)}`}
                className="group relative block"
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-6 h-full hover:bg-[#2d3142]/60 hover:border-[#7aa2f7]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7aa2f7]/10 overflow-hidden">
                  {/* Decorative Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#7aa2f7]/20 to-transparent rounded-bl-2xl rounded-tr-2xl" />

                  {/* Subject Icon */}
                  <div className="relative z-10 mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="text-lg" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-3">
                    <h3 className="text-lg md:text-xl font-bold text-[#c0caf5] group-hover:text-[#7aa2f7] transition-colors duration-300 leading-tight">
                      {subject.name}
                    </h3>

                    {/* Note Count */}
                    <div className="flex items-center gap-2 text-sm text-[#a9b1d6]">
                      <span className="text-[#9ece6a]">📄</span>
                      <span>
                        {subject.noteCount !== undefined
                          ? `${subject.noteCount} ${subject.noteCount === 1 ? "note" : "notes"}`
                          : "Explore content"}
                        {subject.totalExpectedNotes && (
                          <span className="text-[#565f89]">
                            {" "}
                            / {subject.totalExpectedNotes}
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Progress Indicator - Only show if we have meaningful progress data */}
                    {progress !== null && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs text-[#565f89]">
                          <span>Course Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-[#1a1b26]/60 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              progress >= 80
                                ? "bg-gradient-to-r from-[#9ece6a] to-[#73daca]"
                                : progress >= 50
                                  ? "bg-gradient-to-r from-[#bb9af7] to-[#7aa2f7]"
                                  : "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7]"
                            }`}
                            style={{ width: `${Math.min(100, progress)}%` }}
                          />
                        </div>
                        <div className="text-xs text-[#565f89]">
                          {progress >= 80
                            ? "🎉 Almost complete!"
                            : progress >= 50
                              ? "📚 Making good progress"
                              : progress > 0
                                ? "🚀 Getting started"
                                : "📝 Ready to begin"}
                        </div>
                      </div>
                    )}

                    {/* Show note count indicator even without progress */}
                    {progress === null &&
                      subject.noteCount &&
                      subject.noteCount > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-[#565f89]">
                            <span className="text-[#9ece6a]">✨</span>
                            <span>Content available</span>
                          </div>
                        </div>
                      )}

                    {/* Action Indicator */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-[#565f89] group-hover:text-[#a9b1d6] transition-colors duration-300">
                        Click to explore
                      </span>
                      <div className="flex items-center gap-1 text-[#7aa2f7] group-hover:gap-2 transition-all duration-300">
                        <span className="text-sm">→</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-[#7aa2f7]/10 to-[#bb9af7]/10 rounded-full blur-xl" />
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </motion.a>
            );
          })}
        </motion.section>

        {/* Stats Section */}
        {subjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-around text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#7aa2f7] mb-1">
                    {subjects.length}
                  </div>
                  <div className="text-[#a9b1d6]">Subjects</div>
                </div>
                <div className="w-px h-8 bg-[#565f89]/30" />
                <div className="text-center">
                  <div className="text-lg font-bold text-[#bb9af7] mb-1">
                    {subjects.reduce(
                      (total, subject) => total + (subject.noteCount || 0),
                      0
                    )}
                  </div>
                  <div className="text-[#a9b1d6]">Total Notes</div>
                </div>
                <div className="w-px h-8 bg-[#565f89]/30" />
                <div className="text-center">
                  <div className="text-lg font-bold text-[#9ece6a] mb-1">
                    {Math.round(
                      subjects
                        .filter((s) => s.totalExpectedNotes && s.noteCount)
                        .reduce((avg, subject) => {
                          const progress =
                            subject.totalExpectedNotes && subject.noteCount
                              ? (subject.noteCount /
                                  subject.totalExpectedNotes) *
                                100
                              : 0;
                          return avg + progress;
                        }, 0) /
                        Math.max(
                          1,
                          subjects.filter((s) => s.totalExpectedNotes).length
                        )
                    )}
                    %
                  </div>
                  <div className="text-[#a9b1d6]">Avg Progress</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
