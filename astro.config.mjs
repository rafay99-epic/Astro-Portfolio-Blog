import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import lottie from "astro-integration-lottie";
import pagefind from "astro-pagefind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://rafay99.com",
  // output: "hybrid",
  build: {
    format: "file",
  },
  integrations: [
    mdx(),
    sitemap(),
    lottie(),
    pagefind(),
    react({
      include: ["**/react/*"],
    }),
  ],
});
