import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://www.rafay99.com",
  output: "server",
  build: {
    format: "file",
  },
  markdown: {
    shikiConfig: {
      theme: "tokyo-night",
      defaultColor: false,
      langs: [],
      langAlias: {
        cjs: "javascript",
      },
      wrap: true,
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
  }),
});
