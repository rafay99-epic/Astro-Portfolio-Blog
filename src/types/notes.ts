import { z } from "zod";

export const NoteDataSchema = z.object({
  lecture_title: z.string(),
  lecture_description: z.string(),
  pubDate: z.coerce.date(),
  lecture_draft: z.boolean(),
  readTime: z.string().optional(),
  lectureNumber: z.string(),
  subject: z.string(),
});

export const NoteSchema = z.object({
  id: z.string(),
  slug: z.string(),
  body: z.string(),
  collection: z.literal("ms_notes"),
  data: NoteDataSchema,
});

export type Note = z.infer<typeof NoteSchema>;
export type NoteData = z.infer<typeof NoteDataSchema>;
