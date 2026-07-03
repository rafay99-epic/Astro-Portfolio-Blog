import { readdirSync, readFileSync } from "node:fs";
import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import playformCompress from "@playform/compress";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import yaml from "js-yaml";
import { satteriReadingTime } from "./satteri-reading-time.mjs";

// Map each published blog post's URL path -> last-modified ISO date, read
// straight from frontmatter at config time. Used to stamp <lastmod> on the
// sitemap so Google recrawls updated posts instead of treating them as stale.
function buildBlogLastmod() {
	const dir = new URL("./src/content/blog/", import.meta.url);
	const map = new Map();
	let files = [];
	try {
		files = readdirSync(dir);
	} catch {
		return map;
	}
	for (const file of files) {
		if (!/\.(md|mdx)$/.test(file)) continue;
		let raw;
		try {
			raw = readFileSync(new URL(file, dir), "utf8");
		} catch {
			continue;
		}
		const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
		if (!fm) continue;
		let data;
		try {
			data = yaml.load(fm[1]) ?? {};
		} catch {
			continue;
		}
		if (data.draft || data.archived) continue;
		const date = data.updatedDate ?? data.pubDate;
		if (!date) continue;
		const ts = new Date(date).getTime();
		if (Number.isNaN(ts)) continue;
		const id = file.replace(/\.(md|mdx)$/, "");
		map.set(`/blog/${id}/`, new Date(ts).toISOString());
	}
	return map;
}
const blogLastmod = buildBlogLastmod();

export default defineConfig({
	site: "https://www.rafay99.com",
	output: "server",
	image: {
		remotePatterns: [
			{ protocol: "https", hostname: "7huqjqx8yo.ufs.sh" },
			{ protocol: "https", hostname: "utfs.io" },
		],
	},
	build: {
		concurrency: 10,
		format: "directory",
	},
	trailingSlash: "always",
	prefetch: {
		prefetchAll: false,
	},
	markdown: {
		// Astro 7's native Rust Markdown engine. GFM and frontmatter are on by
		// default, so the old `gfm: true` is dropped. Reading time is provided as a
		// Sätteri mdast plugin (remark plugins no longer run under Sätteri).
		processor: satteri({
			mdastPlugins: [satteriReadingTime],
		}),
		syntaxHighlight: {
			excludeLangs: ["mermaid"],
		},

		shikiConfig: {
			theme: "tokyo-night",
			defaultColor: false,
			langAlias: {
				cjs: "javascript",
			},
			wrap: false,
			transformers: [],
		},
	},

	redirects: {
		"/snaprescue.sh": "/downloads/scripts/snaprescue.sh",
		"/MSBridge": "https://msbridge.rafay99.com",
		"/Meaning-Mate-APK": "/downloads/app/meaning_mate/Meaning-Mate-APK.apk",
		"/MSBridge-APK":
			"https://msbridge.rafay99.com/downloads/ms-bridge-stable.apk",
		"/MSBridge-beta":
			"https://msbridge.rafay99.com/downloads/ms-bridge-beta.apk",
		"/SimpleThread-APK": "/downloads/app/SimpleThread/simple_thread.apk",
		"/MeetTime-APK": "/downloads/app/meet_time/MeetTime.apk",
		"/webwiki": "https://rafay99-docs.vercel.app/",
	},

	security: {
		checkOrigin: true,
	},
	integrations: [
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),

		mdx({}),
		sitemap({
			filter: (page) =>
				!page.includes("/blog/archive/") &&
				!page.includes("/access-denied") &&
				!page.match(/\/(blog|tag)\/page\/\d+/),
			serialize(item) {
				const lastmod = blogLastmod.get(new URL(item.url).pathname);
				if (lastmod) item.lastmod = lastmod;
				return item;
			},
		}),
		react({
			experimentalDisableStreaming: true,

			include: ["**/ReactComponent/**", "**/*.{jsx,tsx}"],
			babel: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
		tailwind(),
		robotsTxt({
			sitemap: true,
			host: "www.rafay99.com",
		}),
		playformCompress({
			CSS: true,
			HTML: {
				"html-minifier-terser": {
					removeAttributeQuotes: false,
					collapseWhitespace: true,
					removeComments: true,
				},
			},
			Image: {
				quality: 80,
				avif: {
					quality: 80,
					effort: 7,
				},
				webp: {
					quality: 80,
					effort: 5,
				},
			},
			JavaScript: false,
			SVG: false,
			Logger: 2,
		}),
		icon(),
	],
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
		speedInsights: {
			enabled: true,
		},
		maxDuration: 3,
		imageService: true,
		isr: true,
	}),
	vite: {
		build: {
			cssMinify: true,
			chunkSizeWarningLimit: 2500,
			rollupOptions: {
				onwarn(warning, warn) {
					if (
						warning.code === "EMPTY_BUNDLE" ||
						warning.code === "CIRCULAR_DEPENDENCY" ||
						warning.message?.includes("Generated an empty chunk") ||
						warning.message?.includes("Circular chunk")
					) {
						return;
					}
					warn(warning);
				},
				output: {
					// Vite 8 bundles with Rolldown, which deprecated `manualChunks`
					// (superseded by `codeSplitting`) and dropped Rollup's
					// `experimentalMinChunkSize`. This is the Rolldown-native
					// equivalent: groups are matched in array order (ties broken by
					// smaller index), preserving the original first-match behavior —
					// e.g. `dagre-d3-es` matches `vendor-d3` before `vendor-graph`,
					// exactly as the old `if` chain did.
					codeSplitting: {
						groups: [
							{
								name: "vendor-d3",
								test: (id) => id.includes("node_modules") && id.includes("d3-"),
							},
							{
								name: "vendor-parser",
								test: (id) =>
									id.includes("node_modules") &&
									(id.includes("@chevrotain") || id.includes("langium")),
							},
							{
								name: "vendor-graph",
								test: (id) =>
									id.includes("node_modules") &&
									(id.includes("cytoscape") ||
										id.includes("dagre-d3-es") ||
										id.includes("dagre")),
							},
							{
								name: "vendor-mermaid",
								test: (id) =>
									id.includes("node_modules") && id.includes("mermaid"),
							},
							{
								name: "vendor-katex",
								test: (id) =>
									id.includes("node_modules") && id.includes("katex"),
							},
							{
								name: "vendor-framer",
								test: (id) =>
									id.includes("node_modules") && id.includes("framer-motion"),
							},
							{
								name: "vendor-lucide",
								test: (id) =>
									id.includes("node_modules") && id.includes("lucide-react"),
							},
							{
								name: "react-vendor",
								test: (id) =>
									id.includes("node_modules") &&
									(id.includes("/react/") ||
										id.includes("/react-dom/") ||
										id.includes("/scheduler/")),
							},
						],
					},
				},
			},
		},
		ssr: {
			noExternal: ["@astrojs/*"],
		},
		optimizeDeps: {
			exclude: ["sharp"],
		},
		resolve: {
			dedupe: ["react", "react-dom"],
			alias: {
				"@assets": "/src/assets",
				"@components": "/src/components",
				"@astro": "/src/components/AstroComponent",
				"@react": "/src/components/ReactComponent",
				"@content": "/src/content",
				"@layouts": "/src/layouts",
				"@pages": "/src/pages",
				"@styles": "/src/styles",
				"@types": "/src/types",
				"@util": "/src/util",
				"@config": "/src/config",
				"@server": "/src/server",
				"@hooks": "/src/hooks",
			},
		},
	},
});
