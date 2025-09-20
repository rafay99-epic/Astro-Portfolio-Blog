import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import {
  FaBookOpen,
  FaGraduationCap,
  FaPenFancy,
  FaLightbulb,
} from "react-icons/fa";
import { useIsMobile } from "@hooks/useIsMobile";

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

const SubjectGrid = memo(function SubjectGrid({ subjects }: SubjectGridProps) {
  const isMobile = useIsMobile();

  return (
    <div className="px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        {}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <span className="bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent">
              📚 Study Subjects
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-[#a9b1d6] md:text-base">
            Explore comprehensive notes and materials across different academic
            subjects
          </p>
        </motion.div>

        {}
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

            const progress =
              subject.totalExpectedNotes && subject.noteCount
                ? Math.round(
                    (subject.noteCount / subject.totalExpectedNotes) * 100,
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
                <div className="relative h-full overflow-hidden rounded-2xl border border-[#565f89]/30 bg-[#24283b]/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#7aa2f7]/40 hover:bg-[#2d3142]/60 hover:shadow-2xl hover:shadow-[#7aa2f7]/10">
                  {}
                  <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-bl from-[#7aa2f7]/20 to-transparent" />

                  {}
                  <div className="relative z-10 mb-4">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="text-lg" />
                    </div>
                  </div>

                  {}
                  <div className="relative z-10 space-y-3">
                    <h3 className="text-lg font-bold leading-tight text-[#c0caf5] transition-colors duration-300 group-hover:text-[#7aa2f7] md:text-xl">
                      {subject.name}
                    </h3>

                    {}
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

                    {}
                    {progress !== null && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-[#565f89]">
                          <span>Course Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-[#1a1b26]/60">
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

                    {}
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

                    {}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-[#565f89] transition-colors duration-300 group-hover:text-[#a9b1d6]">
                        Click to explore
                      </span>
                      <div className="flex items-center gap-1 text-[#7aa2f7] transition-all duration-300 group-hover:gap-2">
                        <span className="text-sm">→</span>
                      </div>
                    </div>
                  </div>

                  {}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-[#7aa2f7]/10 to-[#bb9af7]/10 blur-xl" />
                  </div>

                  {}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] transition-all duration-500 ease-out group-hover:w-full" />
                </div>
              </motion.a>
            );
          })}
        </motion.section>

        {}
        {subjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="mx-auto max-w-md rounded-2xl border border-[#565f89]/30 bg-[#24283b]/40 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-around text-sm">
                <div className="text-center">
                  <div className="mb-1 text-lg font-bold text-[#7aa2f7]">
                    {subjects.length}
                  </div>
                  <div className="text-[#a9b1d6]">Subjects</div>
                </div>
                <div className="h-8 w-px bg-[#565f89]/30" />
                <div className="text-center">
                  <div className="mb-1 text-lg font-bold text-[#bb9af7]">
                    {subjects.reduce(
                      (total, subject) => total + (subject.noteCount || 0),
                      0,
                    )}
                  </div>
                  <div className="text-[#a9b1d6]">Total Notes</div>
                </div>
                <div className="h-8 w-px bg-[#565f89]/30" />
                <div className="text-center">
                  <div className="mb-1 text-lg font-bold text-[#9ece6a]">
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
                          subjects.filter((s) => s.totalExpectedNotes).length,
                        ),
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
});

export default SubjectGrid;
