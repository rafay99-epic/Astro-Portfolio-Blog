import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import lottie from "astro-integration-lottie";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://rafay99.com",
  build: {
    format: "file",
  },
  integrations: [mdx(), sitemap(), lottie(), pagefind()],
});
