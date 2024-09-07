import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://rafay99.com",
  build: {
    format: "file",
  },
  output: "hybrid",
  adapter: vercel({
  integrations: [
    mdx(),
    sitemap(),
    pagefind(),
    react({
      include: ["**/react/*"],
    }),
    tailwind(),
  ],
  adapter: vercel(),
});
