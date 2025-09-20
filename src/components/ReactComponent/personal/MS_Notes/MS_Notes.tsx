import React, { memo } from "react";
import { motion } from "framer-motion";
import type { Note } from "../../../../types/notes";
import { useNotesGrid } from "../../../../components/ReactComponent/personal/MS_Notes/MS_NotesLogic";
import NotesGridUI from "../../../../components/ReactComponent/personal/MS_Notes/MS_NotesUi";

interface NotesGridProps {
  notes: Note[];
}

const NotesGrid = memo(function NotesGrid({ notes }: NotesGridProps) {
  const {
    selectedTag,
    setSelectedTag,
    currentPage,
    setCurrentPage,
    allTags,
    totalPages,
    paginatedNotes,
  } = useNotesGrid(notes);

  if (notes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center"
        >
          {}
          <div className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-3xl p-8 md:p-12">
            {}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <div className="relative mx-auto w-24 h-24 md:w-32 md:h-32">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-2xl opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-2xl p-6 md:p-8 flex items-center justify-center">
                  <span className="text-3xl md:text-4xl">📚</span>
                </div>
              </div>
            </motion.div>

            {}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent">
                No Notes Available Yet
              </span>
            </motion.h2>

            {}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-[#a9b1d6] text-base md:text-lg mb-8 leading-relaxed"
            >
              Stay tuned! New lecture notes are coming soon. In the meantime,
              explore other sections or subscribe for updates.
            </motion.p>

            {}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white font-semibold rounded-xl shadow-lg shadow-[#7aa2f7]/25 hover:shadow-xl hover:shadow-[#7aa2f7]/30 transition-all duration-300"
              >
                <span>🏠</span>
                <span>Back to Home</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.a>

              <motion.a
                href="/newsletter-subscribe"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#a9b1d6] font-semibold rounded-xl hover:bg-[#24283b]/60 hover:border-[#7aa2f7]/40 hover:text-[#c0caf5] transition-all duration-300"
              >
                <span>📧</span>
                <span>Subscribe for Updates</span>
              </motion.a>
            </motion.div>

            {}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 pt-6 border-t border-[#565f89]/20"
            >
              <div className="flex items-center justify-center gap-4 text-sm text-[#565f89]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#9ece6a] rounded-full animate-pulse"></div>
                  <span>Coming Soon</span>
                </div>
                <span>•</span>
                <span>Stay Updated</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <NotesGridUI
      allTags={allTags}
      selectedTag={selectedTag}
      setSelectedTag={setSelectedTag}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      paginatedNotes={paginatedNotes}
    />
  );
});

export default NotesGrid;
