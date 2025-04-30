import React, { useState, useMemo } from "react";
import TagFilter from "./TagFilter";

import type { Version, WikiPageProps } from "../../../types/wiki";

const WikiPage: React.FC<WikiPageProps> = ({ versions }) => {
  const [error, setError] = useState<string | null>(null);

  const mappedVersions: Version[] = useMemo(() => {
    try {
      return versions.map((item) => ({
        title: item.data.title,
        description: item.data.description,
        pubDate: item.data.pubDate,
        version: item.data.version,
        versionreleasedate: item.data.versionreleasedate,
        tags: item.data.tags || [],
        slug: item.slug,
        draft: item.data.draft || false,
      }));
    } catch (err) {
      console.error("Error mapping versions:", err);
      setError("Failed to load version data.");
      return [];
    }
  }, [versions]);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const versionsPerPage = 6;

  const sortedVersions = useMemo(() => {
    try {
      return mappedVersions.sort((a, b) => {
        const parseVersion = (v: string) => {
          const parts = v.split(".").map(Number);
          if (parts.some(Number.isNaN)) {
            throw new Error(`Invalid version format: ${v}`);
          }
          return parts.reduce(
            (acc, part, i) => acc + part * Math.pow(100, 2 - i),
            0
          );
        };
        const versionA = parseVersion(a.version);
        const versionB = parseVersion(b.version);
        return versionB - versionA;
      });
    } catch (err) {
      console.error("Error sorting versions:", err);
      setError("Error sorting versions: Invalid version format detected");
      return [];
    }
  }, [mappedVersions]);

  const filteredVersions = useMemo(() => {
    try {
      return selectedTag
        ? sortedVersions.filter(
            (version) => !version.draft && version.tags.includes(selectedTag)
          )
        : sortedVersions.filter((version) => !version.draft);
    } catch (err) {
      console.error("Error filtering versions:", err);
      setError("Error occurred while filtering versions.");
      return [];
    }
  }, [selectedTag, sortedVersions]);

  const totalPages = Math.ceil(filteredVersions.length / versionsPerPage);
  const paginatedVersions = useMemo(() => {
    try {
      if (currentPage < 1) {
        setCurrentPage(1);
        return [];
      }
      const startIndex = (currentPage - 1) * versionsPerPage;
      const endIndex = startIndex + versionsPerPage;
      if (startIndex >= filteredVersions.length) {
        setCurrentPage(
          Math.max(1, Math.ceil(filteredVersions.length / versionsPerPage))
        );
        return [];
      }
      return filteredVersions.slice(startIndex, endIndex);
    } catch (err) {
      console.error("Error paginating versions:", err);
      setError("Error occurred while paginating versions.");
      return [];
    }
  }, [currentPage, filteredVersions, versionsPerPage]);

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const uniqueTags = Array.from(
    new Set(sortedVersions.flatMap((version) => version.tags || []))
  );

  if (error) {
    return (
      <div className="min-h-screen p-6 flex justify-center items-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (filteredVersions.length === 0) {
    return (
      <div className="min-h-screen p-6 flex justify-center items-center text-[var(--text-light)]">
        <p>Sorry, no versions released yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-10  text-[var(--text-light)]">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Filter by Tags:</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleTagSelect(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              selectedTag === null
                ? "bg-[var(--accent)] text-white border-transparent"
                : "bg-transparent border-[var(--gray)] hover:bg-[var(--gray-dark)]"
            }`}
          >
            All
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                selectedTag === tag
                  ? "bg-[var(--accent)] text-white border-transparent"
                  : "bg-transparent border-[var(--gray)] hover:bg-[var(--gray-dark)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {paginatedVersions.map((version) => (
          <a
            key={version.slug}
            href={`/webwiki/${version.slug}`}
            className="rounded-xl border border-[#4C506A40] bg-[#2b2d41] hover:bg-[#32344a] p-5 shadow-lg transition-transform transform hover:-translate-y-1"
            aria-label={`Version ${version.version}: ${version.title}`}
            role="Wiki Post Link"
          >
            <h2 className="text-xl font-bold mb-2">{version.title}</h2>
            <div className="text-sm text-[var(--gray)] space-y-1 mb-3">
              <p>
                <strong className="text-[var(--text-light)]">Version:</strong>{" "}
                {version.version}
              </p>
              <p>
                <strong className="text-[var(--text-light)]">
                  Release Date:
                </strong>{" "}
                {new Date(version.versionreleasedate).toLocaleDateString()}
              </p>
              {version.pubDate && (
                <p>
                  <strong className="text-[var(--text-light)]">
                    Published:
                  </strong>{" "}
                  {new Date(version.pubDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <p className="text-sm text-[var(--gray)] mb-4 line-clamp-3">
              {version.description}
            </p>
            {version.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {version.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[#3b3d58] text-xs text-white px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-6 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded border text-sm transition hover:bg-[#3c3f5c] disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-sm">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded border text-sm transition hover:bg-[#3c3f5c] disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WikiPage;
