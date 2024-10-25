import { usePaginatedProjects } from "./usePaginatedProjects";

interface Project {
  slug: string;
  data: {
    draft: boolean;
    ProjectImage?: string;
    Projecttitle: string;
    ProjectDescription: string;
    ProjectTech?: string[];
    githubLink?: string;
    deployedLink?: string;
  };
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const {
    currentProjects,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
  } = usePaginatedProjects(projects);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {currentProjects.map((project) => (
          <a
            key={project.slug}
            href={`/project/${project.slug}`}
            className="project-card bg-[#1f2335] border border-[#4C506A40] rounded-[15px] overflow-hidden shadow-lg flex flex-col max-w-[400px] mx-auto transform transition-transform duration-300 hover:scale-105"
            style={{
              boxShadow: "var(--box-shadow)",
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
            }}
          >
            {project.data.ProjectImage && (
              <div className="image-container">
                <img
                  src={project.data.ProjectImage}
                  alt={project.data.Projecttitle}
                  className="w-full h-[200px] object-cover"
                />
              </div>
            )}
            <div className="content p-4 text-[#f8f8f8]">
              <h3 className="mt-0 text-[#7aa2f7] text-xl font-semibold">
                {project.data.Projecttitle}
              </h3>
              <p className="text-gray-300 mb-3">
                {project.data.ProjectDescription}
              </p>
              {project.data.ProjectTech && (
                <div className="technologies flex flex-wrap">
                  {project.data.ProjectTech.map((technology, index) => (
                    <span
                      key={index}
                      className="technology-chip inline-block m-1 px-2 py-1 bg-[#3b4252] text-[#f8f8f8] rounded-lg text-sm"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              )}
              <div className="links mt-3 flex items-center">
                {project.data.githubLink && (
                  <a
                    href={project.data.githubLink}
                    target="_blank"
                    aria-label="GitHub"
                    rel="noopener noreferrer"
                    className="inline-block mr-3 text-[#7aa2f7] hover:text-[#4c88f7]"
                  >
                    <i className="fab fa-github" />{" "}
                  </a>
                )}
                {project.data.deployedLink && (
                  <a
                    href={project.data.deployedLink}
                    target="_blank"
                    aria-label="Deployed Project"
                    rel="noopener noreferrer"
                    className="inline-block text-[#7aa2f7] hover:text-[#4c88f7]"
                  >
                    <i className="fas fa-external-link-alt" />{" "}
                  </a>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="pagination mt-4 flex justify-center items-center space-x-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="text-[#7aa2f7] hover:text-[#4c88f7] disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="text-[#7aa2f7] hover:text-[#4c88f7] disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectList;
