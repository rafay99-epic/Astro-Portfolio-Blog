import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import dotenv from "dotenv";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: "https://www.rafay99.com",
  output: "server",
  build: {
    format: "directory",
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
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),

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
    },
  },
});
