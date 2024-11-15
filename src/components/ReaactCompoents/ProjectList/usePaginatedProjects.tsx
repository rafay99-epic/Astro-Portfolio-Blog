import { useState, useMemo, useEffect } from "react";
import type { Project } from "types/ProjectTypes";

interface UsePaginatedProjects {
  currentProjects: Project[];
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  error: string | null;
}

export const usePaginatedProjects = (
  projects: Project[],
  projectsPerPage = 6
): UsePaginatedProjects => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    try {
      return projects.filter((project) => !project.data.draft);
    } catch (e) {
      setError("Failed to filter projects");
      return [];
    }
  }, [projects]);

  const totalPages = useMemo(() => {
    const pages = Math.ceil(filteredProjects.length / projectsPerPage);
    if (pages === 0) setError("No projects available.");
    return pages;
  }, [filteredProjects.length, projectsPerPage]);

  const currentProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  }, [currentPage, filteredProjects, projectsPerPage]);
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setError("You are on the last page.");
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setError("You are on the first page.");
    }
  };

  useEffect(() => {
    setError(null);
  }, [currentPage]);

  return {
    currentProjects,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    error,
  };
};
