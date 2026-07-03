import getReadingTime from "reading-time";

// Astro 7's native Markdown engine (Sätteri) does not run remark plugins, so the
// old `remark-reading-time` plugin is reimplemented here as a Sätteri mdast
// visitor plugin. It sums the text of the document's top-level block nodes and
// stamps the reading time onto Astro's frontmatter, which still surfaces as
// `remarkPluginFrontmatter.minutesRead` in the blog pages — the same contract
// the previous remark plugin provided.
//
// Only *top-level* blocks are summed (parent is the document root); nested
// content such as a paragraph inside a list or blockquote is already included in
// its ancestor's text, so counting it again would inflate the estimate.
//
// Per-document state lives on `ctx.data`, not a module/closure variable: Sätteri
// reuses a single plugin object across every document in the build, so a shared
// variable would bleed one post's word count into the next.
function collectBlock(node, ctx) {
	const parent = ctx.parent(node);
	if (!parent || parent.type !== "root") return;
	const astro = ctx.data?.astro;
	if (!astro?.frontmatter) return;
	const text = `${ctx.data.__readingTimeText ?? ""} ${ctx.textContent(node)}`;
	ctx.data.__readingTimeText = text;
	astro.frontmatter.minutesRead = getReadingTime(text).text;
}

export const satteriReadingTime = {
	name: "reading-time",
	paragraph: collectBlock,
	heading: collectBlock,
	blockquote: collectBlock,
	list: collectBlock,
	table: collectBlock,
	code: collectBlock,
	html: collectBlock,
};
