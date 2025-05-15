import { useState, useEffect, useMemo } from "react";
import type { Project } from "types/ProjectTypes";
import { usePaginatedProjects } from "@react/personal/ProjectList/usePaginatedProjects";

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
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

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold py-6">{error}</div>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-8">
      <div>
        <div className="overflow-x-auto whitespace-nowrap flex gap-2 py-4 px-2 sm:justify-center mb-6">
          <button
            onClick={() => setSelectedTag(null)}
            aria-pressed={selectedTag === null}
            className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 ${
              selectedTag === null
                ? "bg-[var(--accent)] text-[var(--text-light)]"
                : "bg-gray-600 text-gray-200 hover:bg-[var(--accent)] hover:text-[var(--text-light)]"
            }`}
          >
            All
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              aria-pressed={selectedTag === tag}
              className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 ${
                selectedTag === tag
                  ? "bg-[var(--accent)] text-[var(--text-light)]"
                  : "bg-gray-600 text-gray-200 hover:bg-[var(--accent)] hover:text-[var(--text-light)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 px-4 sm:px-6 lg:px-8">
          {currentProjects.map((project) => (
            <a
              key={project.slug}
              href={`/project/${project.slug}`}
              className="bg-[var(--accent-dark)] border border-[#4C506A40] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row gap-4"
              style={{ boxShadow: "var(--box-shadow)" }}
            >
              {project.data.ProjectImage && (
                <img
                  src={project.data.ProjectImage}
                  alt={project.data.Projecttitle}
                  className="w-full sm:w-1/3 h-60 object-cover"
                />
              )}

              <div className="flex flex-col justify-between p-4 sm:w-2/3">
                <div>
                  <h3 className="text-[var(--accent)] text-2xl font-bold mb-2">
                    {project.data.Projecttitle}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.data.ProjectDescription}
                  </p>
                  {project.data.ProjectTech && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.data.ProjectTech.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-[var(--text-light)] text-xs font-medium px-2 py-1 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-4">
                  {project.data.githubLink && (
                    <a
                      href={project.data.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-[var(--accent)] hover:text-blue-400 transition"
                    >
                      <i className="fab fa-github fa-lg" />
                    </a>
                  )}
                  {project.data.deployedLink && (
                    <a
                      href={project.data.deployedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live Preview"
                      className="text-[var(--accent)] hover:text-blue-400 transition"
                    >
                      <i className="fas fa-external-link-alt fa-lg" />
                    </a>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="pagination mt-10 flex justify-center items-center space-x-6">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="text-[var(--accent)] hover:text-blue-400 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="text-[var(--accent)] hover:text-blue-400 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
