import React from "react";
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
  return (
    <div>
      {/* Tags Section */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          className={`px-4 py-2 text-sm font-bold rounded-full ${
            selectedTag === null
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => {
            setSelectedTag(null);
            setCurrentPage(1);
          }}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 text-sm font-bold rounded-full ${
              selectedTag === tag
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => {
              setSelectedTag(tag);
              setCurrentPage(1);
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* No Notes Message */}
      {paginatedNotes.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No notes available for this tag. Try another one!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedNotes.map((note) => (
            <a
              key={note.slug}
              href={`/ms_notes/${note.slug}`}
              className="block bg-[var(--accent-dark)] p-6 rounded-xl shadow-xl hover:bg-[var(--gray-light)] transition transform hover:scale-105 border border-[var(--accent)]"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-[var(--text-light)]">
                  {note.data.lecture_title}
                </h2>
                <span className="px-3 py-1 text-xs font-bold bg-[var(--accent)] text-white rounded-full">
                  Lecture {note.data.lectureNumber}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-3">
                {new Date(note.data.pubDate).toLocaleDateString()}
              </p>

              <p className="text-gray-300 text-sm mb-4">
                {note.data.lecture_description}
              </p>

              <span className="inline-block px-3 py-1 bg-[var(--accent)] text-white text-xs rounded-full">
                {note.data.subject}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="px-4 py-2 text-sm font-bold bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 text-sm font-bold bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesGridUI;
