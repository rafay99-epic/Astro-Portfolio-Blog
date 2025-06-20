import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";
import type { Note } from "types/notes";

interface NotesGridUIProps {
  allTags: string[];
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  paginatedNotes: Note[];
}

const NotesGridUI: React.FC<NotesGridUIProps> = ({
  allTags,
  selectedTag,
  setSelectedTag,
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedNotes,
}) => {
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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent">
              📝 Lecture Notes
            </span>
          </h1>
          <p className="text-[#a9b1d6] text-sm md:text-base max-w-2xl mx-auto">
            Access comprehensive lecture notes and study materials
          </p>
        </motion.div>

        {/* Tags Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-[#c0caf5] mb-4 text-center md:text-left">
            🏷️ Filter by Subject
          </h3>

          {isMobile ? (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300 whitespace-nowrap ${
                  selectedTag === null
                    ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white border-transparent shadow-lg shadow-[#7aa2f7]/25"
                    : "bg-[#1a1b26]/60 border-[#565f89]/40 text-[#a9b1d6] hover:bg-[#24283b]/60 hover:border-[#565f89]/60"
                }`}
                onClick={() => {
                  setSelectedTag(null);
                  setCurrentPage(1);
                }}
              >
                All
              </motion.button>
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300 whitespace-nowrap ${
                    selectedTag === tag
                      ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white border-transparent shadow-lg shadow-[#7aa2f7]/25"
                      : "bg-[#1a1b26]/60 border-[#565f89]/40 text-[#a9b1d6] hover:bg-[#24283b]/60 hover:border-[#565f89]/60"
                  }`}
                  onClick={() => {
                    setSelectedTag(tag);
                    setCurrentPage(1);
                  }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                  selectedTag === null
                    ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white border-transparent shadow-lg shadow-[#7aa2f7]/25"
                    : "bg-[#1a1b26]/60 border-[#565f89]/40 text-[#a9b1d6] hover:bg-[#24283b]/60 hover:border-[#565f89]/60"
                }`}
                onClick={() => {
                  setSelectedTag(null);
                  setCurrentPage(1);
                }}
              >
                All
              </motion.button>
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                    selectedTag === tag
                      ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white border-transparent shadow-lg shadow-[#7aa2f7]/25"
                      : "bg-[#1a1b26]/60 border-[#565f89]/40 text-[#a9b1d6] hover:bg-[#24283b]/60 hover:border-[#565f89]/60"
                  }`}
                  onClick={() => {
                    setSelectedTag(tag);
                    setCurrentPage(1);
                  }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Notes Grid or Empty State */}
        <AnimatePresence mode="wait">
          {paginatedNotes.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-center py-16"
            >
              <div className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-8 text-center max-w-md">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-[#c0caf5] mb-2">
                  No Notes Found
                </h3>
                <p className="text-[#a9b1d6] text-sm">
                  {selectedTag
                    ? `No lecture notes available for "${selectedTag}". Try selecting a different subject.`
                    : "No lecture notes are currently available."}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`page-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className={`grid gap-6 ${
                isMobile
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {paginatedNotes.map((note, index) => (
                <motion.a
                  key={note.slug}
                  href={`/ms_notes/${note.slug}`}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative block"
                >
                  <div className="relative backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-6 h-full hover:bg-[#2d3142]/60 hover:border-[#7aa2f7]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7aa2f7]/10 overflow-hidden">
                    {/* Lecture Number Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white text-xs font-bold px-3 py-1 rounded-full">
                        Lecture {note.data.lectureNumber}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      {/* Title */}
                      <h2 className="text-lg md:text-xl font-bold text-[#c0caf5] group-hover:text-[#7aa2f7] transition-colors duration-300 pr-16 leading-tight">
                        {note.data.lecture_title}
                      </h2>

                      {/* Metadata */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-[#a9b1d6]">
                          <FaCalendarAlt className="text-[#9ece6a] text-xs" />
                          <span className="font-medium">Date:</span>
                          <span>
                            {new Date(note.data.pubDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[#a9b1d6]">
                          <FaBookOpen className="text-[#bb9af7] text-xs" />
                          <span className="font-medium">Subject:</span>
                          <span className="bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#7aa2f7] text-xs px-2 py-0.5 rounded">
                            {note.data.subject}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[#a9b1d6] text-sm leading-relaxed line-clamp-3">
                        {note.data.lecture_description}
                      </p>

                      {/* Read More Indicator */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-xs text-[#565f89]">
                          <FaFileAlt />
                          <span>Lecture Notes</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#7aa2f7] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                          <span>Read Notes</span>
                          <FaArrowRight className="text-xs transform group-hover:translate-x-1 transition-transform duration-300" />
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
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <div className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-2">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-4 py-2 rounded-xl text-sm font-medium border border-[#565f89]/40 text-[#a9b1d6] hover:bg-[#2d3142]/60 hover:border-[#7aa2f7]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isMobile ? "←" : "← Previous"}
                </motion.button>

                <div className="flex items-center gap-2 px-4 py-2">
                  <span className="text-[#a9b1d6] text-sm">
                    <span className="font-bold text-[#c0caf5]">
                      {currentPage}
                    </span>
                    <span className="mx-1">of</span>
                    <span className="font-bold text-[#c0caf5]">
                      {totalPages}
                    </span>
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-4 py-2 rounded-xl text-sm font-medium border border-[#565f89]/40 text-[#a9b1d6] hover:bg-[#2d3142]/60 hover:border-[#7aa2f7]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isMobile ? "→" : "Next →"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NotesGridUI;
