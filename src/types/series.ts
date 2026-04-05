import type { CollectionEntry } from "astro:content";
import { z } from "zod";

// ─── Zod Schemas ───

/** Schema for the series-related frontmatter fields on a blog post. */
export const SeriesFrontmatterSchema = z.object({
	series: z.string().optional(),
	seriesPart: z.number().int().positive().optional(),
	seriesTotal: z.number().int().positive().optional(),
});

/** Schema for a single series entry (derived at build time). */
export const SeriesMetaSchema = z.object({
	slug: z.string(),
	title: z.string(),
	postCount: z.number().int().positive(),
	latestDate: z.coerce.date(),
	tags: z.array(z.string()),
	description: z.string().optional(),
	heroImage: z.string().optional(),
});

// ─── TypeScript Types ───

export type SeriesFrontmatter = z.infer<typeof SeriesFrontmatterSchema>;
export type SeriesMeta = z.infer<typeof SeriesMetaSchema>;

/** A blog post that belongs to a series — guaranteed to have `series` defined. */
export type SeriesPost = CollectionEntry<"blog"> & {
	data: CollectionEntry<"blog">["data"] & {
		series: string;
		seriesPart: number;
	};
};

/** All data needed to render a full series page or navigator. */
export interface SeriesContext {
	/** Display name of the series. */
	readonly name: string;
	/** URL-safe slug for routing. */
	readonly slug: string;
	/** All posts in this series, sorted by part number. */
	readonly posts: ReadonlyArray<SeriesPost>;
	/** Total declared parts (may exceed published post count for WIP series). */
	readonly totalParts: number;
	/** The index of the current post inside `posts` (or -1 when browsing). */
	readonly currentIndex: number;
}
