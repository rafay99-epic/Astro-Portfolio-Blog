import { useState, useMemo, useCallback } from "react";
import type { Note } from "types/notes";

export function useNotesGrid(notes: Note[]) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  // Memoize expensive computations
  const allTags = useMemo(
    () => Array.from(new Set(notes.flatMap((note) => note.data.subject))),
    [notes]
  );

  const filteredNotes = useMemo(
    () =>
      selectedTag
        ? notes.filter((note) => note.data.subject.includes(selectedTag))
        : notes,
    [notes, selectedTag]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredNotes.length / notesPerPage),
    [filteredNotes.length, notesPerPage]
  );

  const paginatedNotes = useMemo(() => {
    const startIndex = (currentPage - 1) * notesPerPage;
    return filteredNotes.slice(startIndex, startIndex + notesPerPage);
  }, [filteredNotes, currentPage, notesPerPage]);

  // Memoize callback functions
  const memoizedSetSelectedTag = useCallback((tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1); // Reset to first page when tag changes
  }, []);

  const memoizedSetCurrentPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return useMemo(
    () => ({
      selectedTag,
      setSelectedTag: memoizedSetSelectedTag,
      currentPage,
      setCurrentPage: memoizedSetCurrentPage,
      allTags,
      totalPages,
      paginatedNotes,
    }),
    [
      selectedTag,
      memoizedSetSelectedTag,
      currentPage,
      memoizedSetCurrentPage,
      allTags,
      totalPages,
      paginatedNotes,
    ]
  );
}
