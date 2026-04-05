import type { CollectionEntry } from "astro:content";
import type { SeriesContext, SeriesMeta, SeriesPost } from "types/series";

// ─── Slug Helpers ───

/**
 * Convert a human-readable series name into a URL-safe slug.
 *
 * @example toSeriesSlug("Building a SaaS") → "building-a-saas"
 */
export function toSeriesSlug(name: string): string {
	return name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * Convert a URL slug back to a display-friendly title.
 *
 * @example fromSeriesSlug("building-a-saas") → "Building A Saas"
 */
export function fromSeriesSlug(slug: string): string {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

// ─── Post Filters ───

/** Type guard: narrows a collection entry to a `SeriesPost`. */
export function isSeriesPost(
	post: CollectionEntry<"blog">,
): post is SeriesPost {
	return (
		typeof post.data.series === "string" &&
		post.data.series.trim().length > 0 &&
		typeof post.data.seriesPart === "number" &&
		post.data.seriesPart > 0
	);
}

/**
 * From a full collection of blog posts, return only published, non-archived
 * posts that belong to a series. The result is typed as `SeriesPost[]`.
 */
export function getSeriesPosts(
	allPosts: CollectionEntry<"blog">[],
): SeriesPost[] {
	return allPosts
		.filter(
			(post) => !post.data.draft && !post.data.archived && isSeriesPost(post),
		)
		.sort((a, b) => {
			const seriesCmp = (a as SeriesPost).data.series.localeCompare(
				(b as SeriesPost).data.series,
			);
			if (seriesCmp !== 0) return seriesCmp;
			return (
				(a as SeriesPost).data.seriesPart - (b as SeriesPost).data.seriesPart
			);
		}) as SeriesPost[];
}

// ─── Grouping ───

/**
 * Group posts into a `Map` keyed by the normalised series slug.
 * Each value is an array of posts sorted by `seriesPart`.
 */
export function groupBySeries(posts: SeriesPost[]): Map<string, SeriesPost[]> {
	const map = new Map<string, SeriesPost[]>();
	for (const post of posts) {
		const slug = toSeriesSlug(post.data.series);
		const existing = map.get(slug);
		if (existing) {
			existing.push(post);
		} else {
			map.set(slug, [post]);
		}
	}
	// Ensure each group is sorted by part
	const entries = Array.from(map.values());
	for (const group of entries) {
		group.sort(
			(a: SeriesPost, b: SeriesPost) => a.data.seriesPart - b.data.seriesPart,
		);
	}
	return map;
}

// ─── Series Metadata ───

/**
 * Build an array of `SeriesMeta` objects — one per unique series.
 * Sorted by most-recent post date descending (latest series first).
 */
export function getAllSeriesMeta(
	allPosts: CollectionEntry<"blog">[],
): SeriesMeta[] {
	const seriesPosts = getSeriesPosts(allPosts);
	const grouped = groupBySeries(seriesPosts);

	const metas: SeriesMeta[] = [];

	const groupedEntries = Array.from(grouped.entries());
	for (const [slug, posts] of groupedEntries) {
		const first = posts[0];
		if (!first) continue;

		const tagSet = new Set<string>();
		for (const p of posts) {
			const postTags = p.data.tags ?? [];
			for (const tag of postTags) {
				tagSet.add(tag);
			}
		}
		const allTags = Array.from(tagSet).sort();

		const latestDate = posts.reduce<Date>(
			(max: Date, p: SeriesPost) =>
				p.data.pubDate > max ? p.data.pubDate : max,
			first.data.pubDate,
		);

		metas.push({
			slug,
			title: first.data.series,
			postCount: posts.length,
			latestDate,
			tags: allTags,
			description: first.data.description,
			heroImage: first.data.heroImage,
		});
	}

	return metas.sort((a, b) => b.latestDate.valueOf() - a.latestDate.valueOf());
}

// ─── Series Context (for in-post navigator) ───

/**
 * Build the full `SeriesContext` for a given post.
 * Returns `null` if the post does not belong to a series.
 */
export function getSeriesContext(
	currentPost: CollectionEntry<"blog">,
	allPosts: CollectionEntry<"blog">[],
): SeriesContext | null {
	if (!isSeriesPost(currentPost)) return null;

	const seriesName = currentPost.data.series;
	const slug = toSeriesSlug(seriesName);

	const seriesPosts = getSeriesPosts(allPosts).filter(
		(p) => toSeriesSlug(p.data.series) === slug,
	);

	if (seriesPosts.length === 0) return null;

	const currentIndex = seriesPosts.findIndex((p) => p.id === currentPost.id);

	const maxDeclaredTotal = seriesPosts.reduce<number>(
		(max: number, p: SeriesPost) =>
			Math.max(max, p.data.seriesTotal ?? p.data.seriesPart),
		0,
	);

	return {
		name: seriesName,
		slug,
		posts: seriesPosts,
		totalParts: Math.max(maxDeclaredTotal, seriesPosts.length),
		currentIndex,
	};
}
