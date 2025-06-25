import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import dotenv from "dotenv";
import robotsTxt from "astro-robots-txt";
import compress from "astro-compress";
dotenv.config();
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: "https://www.rafay99.com",
  output: "server",
  build: {
    format: "directory",
    inlineStylesheets: "auto",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  experimental: {
    optimizeHoistedScript: true,
  },
  markdown: {
    syntaxHighlight: {
      excludeLangs: ["mermaid"],
    },

    shikiConfig: {
      theme: "tokyo-night",
      defaultColor: false,
      langs: [],
      langAlias: {
        cjs: "javascript",
      },
      wrap: false,
      transformers: [],
    },
  },
  redirects: {
    "/snaprescue.sh": "/downloads/scripts/snaprescue.sh",
    "/Meaning-Mate-APK": "/downloads/app/meaning_mate/Meaning-Mate-APK.apk",
    "/MSBridge-APK": "/downloads/app/msbridge/release/MSBridge-release.apk",
    "/MSBridge-beta": "/downloads/app/msbridge/beta/app-release.apk",
    "/SimpleThread-APK": "/downloads/app/SimpleThread/simple_thread.apk",
    "/MeetTime-APK": "/downloads/app/meet_time/MeetTime.apk",
  },
  security: {
    checkOrigin: true,
  },
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push", "gtag"],
        debug: false,
      },
    }),
    mdx({}),
    sitemap({}),
    react({
      experimentalDisableStreaming: true,

      include: ["**/react/*"],
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwind(),
    robotsTxt({
      sitemap: true,
      host: "www.rafay99.com",
    }),
    compress({
      CSS: true,
      HTML: {
        removeAttributeQuotes: false,
      },
      Image: false,
      JavaScript: true,
      SVG: true,
      Logger: 1,
    }),
  ],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 3,
    imageService: true,
    devImageService: "sharp",
    isr: true,
    imagesConfig: {
      domains: ["www.rafay99.com"],
      formats: ["avif", "webp"],
      sizes: [640, 768, 1024, 1280],
      minimumCacheTTL: 60,
    },
  }),
  vite: {
    build: {
      cssMinify: true,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    resolve: {
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
