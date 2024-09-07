import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://rafay99.com",
  build: {
    format: "file",
  },
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    maxDuration: 8,
  }),
  integrations: [
    mdx(),
    sitemap(),
    pagefind(),
    react({
      include: ["**/react/*"],
    }),
    tailwind(),
  ],
});
