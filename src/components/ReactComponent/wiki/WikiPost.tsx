import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { Version, WikiPageProps } from "types/wiki";
import { useIsMobile } from "@hooks/useIsMobile";

const WikiPage = memo(function WikiPage({ versions }: WikiPageProps) {
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

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
  const versionsPerPage = isMobile ? 4 : 6;

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
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center max-w-md"
        >
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-400 mb-2">
            Error Occurred
          </h3>
          <p className="text-red-300 text-sm">{error}</p>
        </motion.div>
      </div>
    );
  }

  if (filteredVersions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-8 text-center max-w-md"
        >
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-[#c0caf5] mb-2">
            No Versions Yet
          </h3>
          <p className="text-[#a9b1d6] text-sm">
            Wiki versions will appear here once they're published.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent">
              📚 Wiki Versions
            </span>
          </h1>
          <p className="text-[#a9b1d6] text-sm md:text-base max-w-2xl mx-auto">
            Explore different versions of our documentation and development
            history
          </p>
        </motion.div>

        {/* Filter Tags Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-[#c0caf5] mb-4 text-center md:text-left">
            🏷️ Filter by Tags
          </h3>

          {isMobile ? (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTagSelect(null)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300 whitespace-nowrap ${
                  selectedTag === null
                    ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white border-transparent shadow-lg shadow-[#7aa2f7]/25"
                    : "bg-[#1a1b26]/60 border-[#565f89]/40 text-[#a9b1d6] hover:bg-[#24283b]/60 hover:border-[#565f89]/60"
                }`}
              >
                All
              </motion.button>
              {uniqueTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTagSelect(tag)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300 whitespace-nowrap ${
                    selectedTag === tag
                      ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white border-transparent shadow-lg shadow-[#7aa2f7]/25"
                      : "bg-[#1a1b26]/60 border-[#565f89]/40 text-[#a9b1d6] hover:bg-[#24283b]/60 hover:border-[#565f89]/60"
                  }`}
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
                onClick={() => handleTagSelect(null)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                  selectedTag === null
                    ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white border-transparent shadow-lg shadow-[#7aa2f7]/25"
                    : "bg-[#1a1b26]/60 border-[#565f89]/40 text-[#a9b1d6] hover:bg-[#24283b]/60 hover:border-[#565f89]/60"
                }`}
              >
                All
              </motion.button>
              {uniqueTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTagSelect(tag)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                    selectedTag === tag
                      ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white border-transparent shadow-lg shadow-[#7aa2f7]/25"
                      : "bg-[#1a1b26]/60 border-[#565f89]/40 text-[#a9b1d6] hover:bg-[#24283b]/60 hover:border-[#565f89]/60"
                  }`}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Versions Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-6 ${
              isMobile
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {paginatedVersions.map((version, index) => (
              <motion.a
                key={version.slug}
                href={`/webwiki/${version.slug}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="group relative backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-6 hover:bg-[#2d3142]/60 hover:border-[#7aa2f7]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7aa2f7]/10"
                aria-label={`Version ${version.version}: ${version.title}`}
              >
                {/* Version Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white text-xs font-bold px-3 py-1 rounded-full">
                    v{version.version}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-[#c0caf5] group-hover:text-[#7aa2f7] transition-colors duration-300 pr-16">
                    {version.title}
                  </h2>

                  {/* Metadata */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#a9b1d6]">
                      <span className="text-[#9ece6a]">📅</span>
                      <span className="font-medium">Release:</span>
                      <span>
                        {new Date(
                          version.versionreleasedate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    {version.pubDate && (
                      <div className="flex items-center gap-2 text-[#a9b1d6]">
                        <span className="text-[#bb9af7]">📝</span>
                        <span className="font-medium">Published:</span>
                        <span>
                          {new Date(version.pubDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[#a9b1d6] text-sm leading-relaxed line-clamp-3">
                    {version.description}
                  </p>

                  {/* Tags */}
                  {version.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {version.tags.slice(0, isMobile ? 2 : 3).map((tag, i) => (
                        <span
                          key={i}
                          className="bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#7aa2f7] text-xs px-2.5 py-1 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                      {version.tags.length > (isMobile ? 2 : 3) && (
                        <span className="bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#a9b1d6] text-xs px-2.5 py-1 rounded-lg">
                          +{version.tags.length - (isMobile ? 2 : 3)}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Read More Arrow */}
                  <div className="flex items-center justify-end pt-2">
                    <div className="flex items-center gap-2 text-[#7aa2f7] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                      <span>Read More</span>
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
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
});

export default WikiPage;
