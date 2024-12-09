import React, { useState, useMemo } from "react";
import TagFilter from "./TagFilter";

import type { Version, WikiPageProps } from "../../../types/wiki";

const WikiPage: React.FC<WikiPageProps> = ({ versions }) => {
  const mappedVersions: Version[] = versions.map((item) => ({
    title: item.data.title,
    description: item.data.description,
    pubDate: item.data.pubDate,
    version: item.data.version,
    versionreleasedate: item.data.versionreleasedate,
    tags: item.data.tags || [],
    slug: item.slug,
    draft: item.data.draft || false,
  }));

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const versionsPerPage = 6;

  const sortedVersions = useMemo(
    () =>
      mappedVersions.sort((a, b) => {
        const versionA = parseFloat(a.version);
        const versionB = parseFloat(b.version);
        return versionB - versionA;
      }),
    [mappedVersions]
  );

  const filteredVersions = useMemo(
    () =>
      selectedTag
        ? sortedVersions.filter(
            (version) => !version.draft && version.tags.includes(selectedTag)
          )
        : sortedVersions.filter((version) => !version.draft),
    [selectedTag, sortedVersions]
  );

  const totalPages = Math.ceil(filteredVersions.length / versionsPerPage);
  const paginatedVersions = useMemo(() => {
    const startIndex = (currentPage - 1) * versionsPerPage;
    const endIndex = startIndex + versionsPerPage;
    return filteredVersions.slice(startIndex, endIndex);
  }, [currentPage, filteredVersions, versionsPerPage]);

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const uniqueTags = Array.from(
    new Set(sortedVersions.flatMap((version) => version.tags || []))
  );

  return (
    <div className="min-h-screen p-6">
      {/* Tag Filter */}
      <TagFilter
        selectedTag={selectedTag}
        onTagSelect={handleTagSelect}
        uniqueTags={uniqueTags}
      />

      {/* Version List */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {paginatedVersions.map((version) => (
          <a
            key={version.slug}
            href={`/webwiki/${version.slug}`}
            className="bg-[#1f2335] transform transition-transform duration-300 hover:scale-105 border border-[#4C506A40] overflow-hidden shadow-lg flex-col rounded-[15px] block p-6 bg-[var(--accent-dark)] shadow-[var(--box-shadow), 0 4px 6px rgba(0, 0, 0, 0.1)]"
            style={{
              boxShadow: "var(--box-shadow)",
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
            }}
          >
            {/* Title */}
            <h2 className="text-3xl font-bold text-[var(--text-light)] mb-2">
              {version.title}
            </h2>

            {/* Metadata */}
            <div className="text-sm text-[var(--gray)] space-y-1 mb-4">
              <p>
                <span className="font-medium text-[var(--text-light)]">
                  Release Date:
                </span>{" "}
                {new Date(version.versionreleasedate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-[var(--text-light)]">
                  Version:
                </span>{" "}
                {version.version}
              </p>
              {version.pubDate && (
                <p>
                  <span className="font-medium text-[var(--text-light)]">
                    Published:
                  </span>{" "}
                  {new Date(version.pubDate).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Tags */}
            {Array.isArray(version.tags) && version.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {version.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[var(--gray-dark)] text-[var(--text-light)] text-xs font-semibold px-2 py-1 rounded-full border border-[var(--text-light)] shadow-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination mt-4 flex justify-center items-center space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="text-[#7aa2f7] hover:text-[#4c88f7] disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="text-[#7aa2f7] hover:text-[#4c88f7] disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WikiPage;
