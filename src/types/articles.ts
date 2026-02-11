import { z } from "zod";

export const PostDataSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	heroImage: z.string().optional(),
	draft: z.boolean(),
	archived: z.boolean().default(false),
	authorName: z.string(),
	authorAvatar: z.string().optional(),
	tags: z.array(z.string()).optional(),
});

export const PostSchema = z.object({
	id: z.string(),
	slug: z.string(),
	body: z.string(),
	collection: z.string(),
	data: PostDataSchema,
});

export type Post = z.infer<typeof PostSchema>;
export type PostData = z.infer<typeof PostDataSchema>;
