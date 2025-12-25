import { z } from "zod";

export const NewsletterDataSchema = z.object({
  title: z.string(),
  summary: z.string(),
  pubDate: z.coerce.date(),
});

export const NewsletterSchema = z.object({
  slug: z.string(),
  data: NewsletterDataSchema,
});

export type Newsletter = z.infer<typeof NewsletterSchema>;
export type NewsletterData = z.infer<typeof NewsletterDataSchema>;
