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
  }),
});

export const collections = { blog };
