import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";
import type { Note } from "types/notes";
import { useIsMobile } from "@hooks/useIsMobile";

interface NotesGridUIProps {
  allTags: string[];
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  paginatedNotes: Note[];
}

const NotesGridUI = memo(function NotesGridUI({
  allTags,
  selectedTag,
  setSelectedTag,
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedNotes,
}: NotesGridUIProps) {
  const isMobile = useIsMobile();

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
    <div className="px-4 py-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-2xl font-bold md:text-3xl">
            <span className="bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent">
              📝 Lecture Notes
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-[#a9b1d6] md:text-base">
            Access comprehensive lecture notes and study materials
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-2xl border border-[#565f89]/30 bg-[#24283b]/40 p-6 backdrop-blur-xl"
        >
          <h3 className="mb-4 text-center text-lg font-semibold text-[#c0caf5] md:text-left">
            🏷️ Filter by Subject
          </h3>

          {isMobile ? (
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedTag === null
                    ? "border-transparent bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg shadow-[#7aa2f7]/25"
                    : "border-[#565f89]/40 bg-[#1a1b26]/60 text-[#a9b1d6] hover:border-[#565f89]/60 hover:bg-[#24283b]/60"
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
                  className={`whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? "border-transparent bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg shadow-[#7aa2f7]/25"
                      : "border-[#565f89]/40 bg-[#1a1b26]/60 text-[#a9b1d6] hover:border-[#565f89]/60 hover:bg-[#24283b]/60"
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
            <div className="flex flex-wrap justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selectedTag === null
                    ? "border-transparent bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg shadow-[#7aa2f7]/25"
                    : "border-[#565f89]/40 bg-[#1a1b26]/60 text-[#a9b1d6] hover:border-[#565f89]/60 hover:bg-[#24283b]/60"
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
                  className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? "border-transparent bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg shadow-[#7aa2f7]/25"
                      : "border-[#565f89]/40 bg-[#1a1b26]/60 text-[#a9b1d6] hover:border-[#565f89]/60 hover:bg-[#24283b]/60"
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

        <AnimatePresence mode="wait">
          {paginatedNotes.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-center py-16"
            >
              <div className="max-w-md rounded-2xl border border-[#565f89]/30 bg-[#24283b]/40 p-8 text-center backdrop-blur-xl">
                <div className="mb-4 text-4xl">📚</div>
                <h3 className="mb-2 text-lg font-semibold text-[#c0caf5]">
                  No Notes Found
                </h3>
                <p className="text-sm text-[#a9b1d6]">
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
              {paginatedNotes.map((note, _index) => (
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
                  <div className="relative h-full overflow-hidden rounded-2xl border border-[#565f89]/30 bg-[#24283b]/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#7aa2f7]/40 hover:bg-[#2d3142]/60 hover:shadow-2xl hover:shadow-[#7aa2f7]/10">
                    <div className="absolute right-4 top-4">
                      <span className="rounded-full bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] px-3 py-1 text-xs font-bold text-white">
                        Lecture {note.data.lectureNumber}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <h2 className="pr-16 text-lg font-bold leading-tight text-[#c0caf5] transition-colors duration-300 group-hover:text-[#7aa2f7] md:text-xl">
                        {note.data.lecture_title}
                      </h2>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-[#a9b1d6]">
                          <FaCalendarAlt className="text-xs text-[#9ece6a]" />
                          <span className="font-medium">Date:</span>
                          <span>
                            {new Date(note.data.pubDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[#a9b1d6]">
                          <FaBookOpen className="text-xs text-[#bb9af7]" />
                          <span className="font-medium">Subject:</span>
                          <span className="rounded border border-[#565f89]/40 bg-[#1a1b26]/60 px-2 py-0.5 text-xs text-[#7aa2f7]">
                            {note.data.subject}
                          </span>
                        </div>
                      </div>

                      <p className="line-clamp-3 text-sm leading-relaxed text-[#a9b1d6]">
                        {note.data.lecture_description}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-xs text-[#565f89]">
                          <FaFileAlt />
                          <span>Lecture Notes</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-[#7aa2f7] transition-all duration-300 group-hover:gap-3">
                          <span>Read Notes</span>
                          <FaArrowRight className="transform text-xs transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-[#7aa2f7]/10 to-[#bb9af7]/10 blur-xl" />
                    </div>

                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] transition-all duration-500 ease-out group-hover:w-full" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <div className="rounded-2xl border border-[#565f89]/30 bg-[#24283b]/40 p-2 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="rounded-xl border border-[#565f89]/40 px-4 py-2 text-sm font-medium text-[#a9b1d6] transition-all duration-300 hover:border-[#7aa2f7]/40 hover:bg-[#2d3142]/60 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isMobile ? "←" : "← Previous"}
                </motion.button>

                <div className="flex items-center gap-2 px-4 py-2">
                  <span className="text-sm text-[#a9b1d6]">
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
                  className="rounded-xl border border-[#565f89]/40 px-4 py-2 text-sm font-medium text-[#a9b1d6] transition-all duration-300 hover:border-[#7aa2f7]/40 hover:bg-[#2d3142]/60 disabled:cursor-not-allowed disabled:opacity-40"
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
});

export default NotesGridUI;
