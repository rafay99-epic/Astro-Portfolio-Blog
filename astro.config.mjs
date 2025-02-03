import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import dotenv from "dotenv";
import expressiveCode from "astro-expressive-code";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

// "remark-mermaidjs": "^7.0.0",
// "@playwright/test": "^1.49.1",
// import remarkMermaid from "remark-mermaidjs";
dotenv.config();

export default defineConfig({
  site: "https://www.rafay99.com",
  output: "server",
  build: {
    format: "directory",
  },
  markdown: {
    // remarkPlugins: [remarkMermaid],
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
    expressiveCode({
      themes: ["tokyo-night"],
      plugins: [pluginLineNumbers(), pluginCollapsibleSections({})],
      defaultProps: {
        showLineNumbers: true,
        startLineNumber: 1,
        foreground: "var(--accent)",
        highlightForeground: "#85c7ebb3",
      },
      styleOverrides: {
        codeFontFamily: "'Fira Code', monospace",
        codeFontSize: "1.5em",
        codeLineHeight: "1.5",
        codePaddingBlock: "4px",
        codeBorderRadius: "4px",
        codeWidth: "auto",
        codeMaxWidth: "auto",
        preColor: "#cddbf7",
        preFontFamily: "'Fira Code', monospace",
        preFontSize: "1em",
        preLineHeight: "1.5",
      },
    }),
    mdx(),
    sitemap(),
    react({
      include: ["**/react/*"],
    }),
    tailwind(),
  ],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
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
