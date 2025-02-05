import React from "react";
import type { Note } from "types/notes";
import { useNotesGrid } from "@components/ReaactCompoents/MS_Notes/MS_NotesLogic";
import NotesGridUI from "@components/ReaactCompoents/MS_Notes/MS_NotesUi";

interface NotesGridProps {
  notes: Note[];
}

const NotesGrid: React.FC<NotesGridProps> = ({ notes }) => {
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
      <div className="min-h-screen flex flex-col items-center justify-center mt-[-10vh] space-y-6 p-8 ">
        <h2 className="text-3xl font-bold text-[#7aa2f7] tracking-wide">
          No Blogs Available Yet
        </h2>
        <p className="text-lg text-gray-400">
          Stay tuned! New Notes is coming soon. In the meantime, check out the
          Newsletter or subscribe for updates.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#7aa2f7] text-white font-medium rounded-lg shadow-md hover:bg-[#5f90e8] transition duration-300"
        >
          Go Back to Home
        </a>
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
};

export default NotesGrid;
