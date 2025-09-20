import { defineCollection, z } from "astro:content";
const blog = defineCollection({

  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().default(true),
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
const newsletter = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});

const projects = defineCollection({
  type: "content",
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

const ms_notes = defineCollection({
  type: "content",
  schema: z.object({
    lecture_title: z.string(),
    lecture_description: z.string(),
    pubDate: z.coerce.date(),
    lecture_draft: z.boolean().default(true),
    readTime: z.string().optional(),
    lectureNumber: z.string(),
    subject: z.string(),
  }),
});

export const collections = {
  blog: blog,
  newsletter: newsletter,
  projects: projects,
  ms_notes: ms_notes,
};
