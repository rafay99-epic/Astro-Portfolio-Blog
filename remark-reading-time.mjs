import { toString as mdToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function remarkReadingTime() {
	let done = false;
	return {
		name: "reading-time",
		// Sätteri calls this for every text node; climb to root once.
		text(_node, ctx) {
			if (done) return;
			done = true;

			// No root visitor exists, so climb to the document root.
			let root = _node;
			let parent = ctx.parent(root);
			while (parent) {
				root = parent;
				parent = ctx.parent(root);
			}

			const textOnPage = mdToString(root);
			const readingTime = getReadingTime(textOnPage);

			const frontmatter = ctx.data.astro?.frontmatter;
			if (frontmatter) {
				frontmatter.minutesRead = readingTime.text;
			}
		},
	};
}
