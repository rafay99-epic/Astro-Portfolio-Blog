import { useState } from "react";
import type { Note } from "types/notes";

export const useNotesGrid = (notes: Note[]) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  const allTags = Array.from(
    new Set(notes.flatMap((note) => note.data.subject))
  );

  const filteredNotes = selectedTag
    ? notes.filter((note) => note.data.subject.includes(selectedTag))
    : notes;

  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const startIndex = (currentPage - 1) * notesPerPage;
  const paginatedNotes = filteredNotes.slice(
    startIndex,
    startIndex + notesPerPage
  );

  return {
    selectedTag,
    setSelectedTag,
    currentPage,
    setCurrentPage,
    allTags,
    totalPages,
    paginatedNotes,
  };
};
