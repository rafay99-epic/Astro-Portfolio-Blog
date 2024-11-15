// ProjectTypes.ts
export interface Project {
  slug: string;
  data: {
    draft: boolean;
    ProjectImage?: string;
    Projecttitle: string;
    ProjectDescription: string;
    ProjectTech?: string[];
    ProjectCategory?: string[];
    githubLink?: string;
    deployedLink?: string;
  };
}
