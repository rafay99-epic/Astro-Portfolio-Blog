import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";
import dotenv from "dotenv";

dotenv.config();
const enableHeavyCompression = process.env.HEAVY_COMPRESS === "true";

import partytown from "@astrojs/partytown";
import playformCompress from "@playform/compress";
import icon from "astro-icon";
import { remarkReadingTime } from "./remark-reading-time.mjs";

export default defineConfig({
	site: "https://www.rafay99.com",
	output: "server",
	build: {
		concurrency: 10,
		format: "directory",
	},
	prefetch: {
		prefetchAll: false,
	},
	experimental: {
		svgo: true,
	},
	markdown: {
		syntaxHighlight: {
			excludeLangs: ["mermaid"],
		},
		remarkPlugins: [remarkReadingTime],
		gfm: true,

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
		sitemap({}),
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
			// Keep compression lightweight by default for faster builds.
			CSS: false,
			HTML: {
				"html-minifier-terser": {
					removeAttributeQuotes: false,
					collapseWhitespace: true,
					removeComments: true,
				},
			},
			Image: enableHeavyCompression
				? {
						quality: 80,
						avif: {
							quality: 80,
							effort: 7,
						},
						webp: {
							quality: 80,
							effort: 5,
						},
					}
				: false,
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
			minify: "esbuild",
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				onwarn(warning, warn) {
					// Suppress empty chunk warnings for mermaid dependencies
					// These are harmless - tree-shaking removes unused code from dependencies
					if (
						warning.code === "EMPTY_BUNDLE" ||
						warning.message?.includes("Generated an empty chunk")
					) {
						return;
					}
					warn(warning);
				},
				output: {
					experimentalMinChunkSize: 30000,
					manualChunks(id) {
						if (!id.includes("node_modules")) return;
						// Keep manual chunking narrow; broad package-level splitting
						// can create circular chunk graphs for Astro/MDX/Mermaid trees.
						if (id.includes("react") || id.includes("scheduler")) {
							return "react-vendor";
						}
						if (
							id.includes("mermaid") ||
							id.includes("d3-") ||
							id.includes("@chevrotain") ||
							id.includes("langium")
						) {
							return "vendor-mermaid";
						}
					},
				},
			},
		},
		ssr: {
			noExternal: ["@astrojs/*"],
		},
		optimizeDeps: {
			exclude: ["@astrojs/image", "sharp"],
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
				"@package.json": "/package.json",
			},
		},
	},
});
