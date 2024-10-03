// Multiple Authors Supports
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
    author: z.object({
      name: z.string(),
      image: z.string(),
    }),
  }),
});

export const collections = { blog };
