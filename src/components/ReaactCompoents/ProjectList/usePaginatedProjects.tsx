import { useState, useMemo } from "react";
import type { Project } from "../scheme/ProjectTypes";

interface UsePaginatedProjects {
  currentProjects: Project[];
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

export const usePaginatedProjects = (
  projects: Project[],
  projectsPerPage = 6
): UsePaginatedProjects => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(
    () => projects.filter((project) => !project.data.draft),
    [projects]
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const currentProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  }, [currentPage, filteredProjects, projectsPerPage]);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    currentProjects,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
  };
};
