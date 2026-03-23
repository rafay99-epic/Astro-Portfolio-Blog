import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		draft: z.boolean().default(true),
		archived: z.boolean().default(false),
		authorName: z.string(),
		authorAvatar: z.string().optional(),
		tags: z.array(z.string()).default(["blog"]),
		readTime: z.string().optional(),
		keywords: z.array(z.string()).optional(),
		canonicalUrl: z.string().optional(),
		featured: z.boolean().default(false),
		excerpt: z.string().optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
	schema: z.object({
		Projecttitle: z.string(),
		ProjectDescription: z.string(),
		ProjectImage: z.string().optional(),
		draft: z.boolean().default(true),
		ProjectTech: z.array(z.string()).optional(),
		ProjectGithubLink: z.string().optional(),
		ProjectDeployedLink: z.string().optional(),
		ProjectCategory: z.array(z.string()).optional(),
		ProjectRanking: z.string().optional(),
	}),
});

const legal = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/legal" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		lastUpdated: z.coerce.date().optional(),
	}),
});

export const collections = {
	blog: blog,
	projects: projects,
	legal: legal,
};
