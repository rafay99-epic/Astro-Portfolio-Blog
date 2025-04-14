import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  site: "https://www.rafay99.com",
  output: "server",
  build: {
    format: "directory",
  },
  prefetch: {
    prefetchAll: true,
  },
  experimental: {
    svg: true,
  },
  markdown: {
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
  },
  security: {
    checkOrigin: true,
  },
  integrations: [
    mdx(),
    sitemap(),
    react({
      include: ["**/react/*"],
    }),
    tailwind(),
  ],
  adapter: vercel(),
  vite: {
    resolve: {
      alias: {
        "@assets": "/src/assets",
        "@components": "/src/components",
        "@astro": "/src/components/AstroCompoent",
        "@react": "/src/components/ReaactCompoents",
        "@content": "/src/content",
        "@layouts": "/src/layouts",
        "@pages": "/src/pages",
        "@styles": "/src/styles",
        "@types": "/src/types",
        "@util": "/src/util",
        "@config": "/src/config",
      },
      resolve: {
        alias: {
          "@assets": "/src/assets",
          "@components": "/src/components",
          "@astro": "/src/components/AstroCompoent",
          "@react": "/src/components/ReaactCompoents",
          "@content": "/src/content",
          "@layouts": "/src/layouts",
          "@pages": "/src/pages",
          "@styles": "/src/styles",
          "@types": "/src/types",
          "@util": "/src/util",
          "@config": "/src/config",
        },
      },
      optimizeDeps: {
        include: ["react-icons/fa"],
      },
    },
  },
});

// Worst Performance  Link
//  https://pagespeed.web.dev/analysis/https-rafay99-com/4535jegvpv?form_factor=desktop
