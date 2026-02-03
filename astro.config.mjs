import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import dotenv from "dotenv";
import robotsTxt from "astro-robots-txt";
dotenv.config();
import partytown from "@astrojs/partytown";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import playformCompress from "@playform/compress";

import icon from "astro-icon";

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
      JavaScript: true,
      SVG: true,
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
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 3,
        },
        mangle: {
          toplevel: true,
        },
      },
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress empty chunk warnings for mermaid dependencies
          // These are harmless - tree-shaking removes unused code from dependencies
          if (
            warning.code === "EMPTY_BUNDLE" ||
            (warning.message &&
              warning.message.includes("Generated an empty chunk"))
          ) {
            return;
          }
          warn(warning);
        },
        output: {
          experimentalMinChunkSize: 30000,
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react")) return "react-vendor";
              if (
                id.includes("@headlessui") ||
                id.includes("@heroicons") ||
                id.includes("framer-motion")
              ) {
                return "ui-components";
              }
              // Group mermaid and its dependencies together to reduce empty chunks
              if (
                id.includes("mermaid") ||
                id.includes("d3-") ||
                id.includes("@chevrotain") ||
                id.includes("lowlight") ||
                id.includes("delaunator") ||
                id.includes("robust-predicates") ||
                id.includes("fault") ||
                id.includes("format") ||
                id.includes("debug") ||
                id.includes("/ms")
              ) {
                return "vendor-mermaid";
              }
              const rel = id.split("node_modules/")[1] || "";
              const parts = rel.split("/");
              const pkg = rel.startsWith("@")
                ? `${parts[0]}/${parts[1]}`
                : parts[0];
              return `vendor-${pkg}`;
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
