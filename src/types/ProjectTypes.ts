import { z } from "zod";

export const ProjectDataSchema = z.object({
	draft: z.boolean(),
	ProjectImage: z.string().optional(),
	Projecttitle: z.string(),
	ProjectDescription: z.string(),
	ProjectTech: z.array(z.string()).optional(),
	ProjectCategory: z.array(z.string()).optional(),
	githubLink: z.string().optional(),
	deployedLink: z.string().optional(),
	ProjectRanking: z.string().optional(),
});

export const ProjectSchema = z.object({
	slug: z.string(),
	data: ProjectDataSchema,
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectData = z.infer<typeof ProjectDataSchema>;
