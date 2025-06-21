import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "types/ProjectTypes";
import { usePaginatedProjects } from "@react/personal/ProjectList/usePaginatedProjects";
import { useIsMobile } from "@hooks/useIsMobile";

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const isMobile = useIsMobile();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredAndSortedProjects = useMemo(() => {
    try {
      let filtered = selectedTag
        ? projects.filter((project) =>
            project.data.ProjectCategory?.includes(selectedTag)
          )
        : projects;

      filtered = [...filtered].sort((a, b) => {
        const rankingA = parseInt(a.data.ProjectRanking || "9999", 10);
        const rankingB = parseInt(b.data.ProjectRanking || "9999", 10);
        return rankingA - rankingB;
      });

      return filtered;
    } catch (err) {
      setError("Failed to filter projects. Please try again.");
      return [];
    }
  }, [selectedTag, projects]);

  const {
    currentProjects,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    error: paginationError,
  } = usePaginatedProjects(filteredAndSortedProjects);

  useEffect(() => {
    if (paginationError) {
      setError("Failed to load projects. Please try again later.");
    }
  }, [paginationError]);

  const uniqueTags = useMemo(() => {
    return Array.from(
      new Set(projects.flatMap((project) => project.data.ProjectCategory || []))
    );
  }, [projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const tagVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  if (error) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-12 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center max-w-md">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h3 className="text-red-400 font-semibold text-lg mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="relative overflow-hidden py-8 px-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7aa2f7] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#bb9af7] rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-32 h-32 bg-[#9ece6a] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className={`font-bold mb-3 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent ${
              isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            className={`text-[#a9b1d6] max-w-2xl mx-auto ${
              isMobile ? "text-sm" : "text-lg"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Explore my portfolio of innovative solutions and creative projects
          </motion.p>

          <motion.div
            className="mx-auto mt-4 h-0.5 bg-gradient-to-r from-transparent via-[#7aa2f7] to-transparent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isMobile ? "120px" : "200px" }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>

        <motion.div
          className={`mb-8 ${isMobile ? "px-2" : "px-4"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-2xl p-4 shadow-xl">
            <div
              className={`flex gap-3 ${isMobile ? "overflow-x-auto pb-2" : "flex-wrap justify-center"}`}
            >
              <motion.button
                onClick={() => setSelectedTag(null)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  selectedTag === null
                    ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg shadow-[#7aa2f7]/25"
                    : "bg-[#1a1b26]/60 text-[#a9b1d6] border border-[#565f89]/40 hover:border-[#7aa2f7]/50 hover:text-[#c0caf5]"
                } ${isMobile ? "text-sm" : "text-base"}`}
                variants={tagVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All Projects
              </motion.button>

              {uniqueTags.map((tag, index) => (
                <motion.button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedTag === tag
                      ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg shadow-[#7aa2f7]/25"
                      : "bg-[#1a1b26]/60 text-[#a9b1d6] border border-[#565f89]/40 hover:border-[#7aa2f7]/50 hover:text-[#c0caf5]"
                  } ${isMobile ? "text-sm" : "text-base"}`}
                  variants={tagVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTag || "all"}
            className={`grid gap-6 ${
              isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <a
                  href={`/project/${project.slug}`}
                  className="block relative overflow-hidden rounded-2xl backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 shadow-xl hover:shadow-2xl hover:shadow-[#7aa2f7]/10 transition-all duration-500"
                >
                  {project.data.ProjectImage && (
                    <div
                      className={`relative overflow-hidden ${
                        isMobile ? "h-48" : "h-64"
                      }`}
                    >
                      <motion.img
                        src={project.data.ProjectImage}
                        alt={project.data.Projecttitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b26]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                      <div className="absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/20 via-transparent to-[#bb9af7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {project.data.ProjectRanking && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                          #{project.data.ProjectRanking}
                        </div>
                      )}
                    </div>
                  )}

                  <div className={`p-6 ${isMobile ? "p-4" : "p-6"}`}>
                    <motion.h3
                      className={`font-bold mb-3 bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent group-hover:from-[#7aa2f7] group-hover:to-[#bb9af7] transition-all duration-300 ${
                        isMobile ? "text-xl" : "text-2xl"
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {project.data.Projecttitle}
                    </motion.h3>

                    <p
                      className={`text-[#a9b1d6] mb-4 leading-relaxed group-hover:text-[#c0caf5] transition-colors duration-300 ${
                        isMobile
                          ? "text-sm line-clamp-3"
                          : "text-base line-clamp-4"
                      }`}
                    >
                      {project.data.ProjectDescription}
                    </p>

                    {project.data.ProjectTech && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.data.ProjectTech.slice(
                          0,
                          isMobile ? 4 : 6
                        ).map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="bg-[#1a1b26]/80 border border-[#565f89]/50 text-[#c0caf5] text-xs font-medium px-3 py-1 rounded-lg backdrop-blur-sm group-hover:border-[#7aa2f7]/50 group-hover:bg-[#7aa2f7]/10 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.data.ProjectTech.length >
                          (isMobile ? 4 : 6) && (
                          <span className="text-[#a9b1d6] text-xs px-2 py-1">
                            +
                            {project.data.ProjectTech.length -
                              (isMobile ? 4 : 6)}{" "}
                            more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {project.data.githubLink && (
                          <motion.a
                            href={project.data.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <i className="fab fa-github text-lg" />
                            {!isMobile && (
                              <span className="text-sm font-medium">Code</span>
                            )}
                          </motion.a>
                        )}
                        {project.data.deployedLink && (
                          <motion.a
                            href={project.data.deployedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#a9b1d6] hover:text-[#9ece6a] transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <i className="fas fa-external-link-alt text-lg" />
                            {!isMobile && (
                              <span className="text-sm font-medium">Demo</span>
                            )}
                          </motion.a>
                        )}
                      </div>

                      <motion.div
                        className="flex items-center gap-2 text-[#7aa2f7] font-medium text-sm group-hover:text-[#bb9af7] transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <span className={isMobile ? "hidden" : "block"}>
                          View Project
                        </span>
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>

                  <div className="h-1 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-6">
                <motion.button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    currentPage === 1
                      ? "text-[#565f89] cursor-not-allowed"
                      : "text-[#a9b1d6] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60"
                  } ${isMobile ? "text-sm px-3 py-1.5" : "text-base"}`}
                  whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                >
                  <span>←</span>
                  {!isMobile && <span>Previous</span>}
                </motion.button>

                <div className="flex items-center gap-3">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <motion.button
                        key={pageNum}
                        onClick={() => {}}
                        className={`w-8 h-8 rounded-lg font-semibold transition-all duration-300 ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg"
                            : "text-[#a9b1d6] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60"
                        } ${isMobile ? "w-6 h-6 text-xs" : "w-8 h-8 text-sm"}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}
                </div>

                <motion.button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    currentPage === totalPages
                      ? "text-[#565f89] cursor-not-allowed"
                      : "text-[#a9b1d6] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60"
                  } ${isMobile ? "text-sm px-3 py-1.5" : "text-base"}`}
                  whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                >
                  {!isMobile && <span>Next</span>}
                  <span>→</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectList;
