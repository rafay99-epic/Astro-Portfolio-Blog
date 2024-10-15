import { defineCollection, z } from "astro:content";

// Blog Collection
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

export const collections = {
  blog: blog,
  newsletter: newsletter,
};
