import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import dotenv from "dotenv";

// import expressiveCode from "astro-expressive-code";
// import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
// import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

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
  experimental: {
    svg: true,
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
  redirects: {
    "/snaprescue.sh": "/downloads/scripts/snaprescue.sh",
    "/Meaning-Mate-APK": "/downloads/app/meaning_mate/Meaning-Mate-APK.apk",
    "/MSBridge-V1": "/downloads/app/msbridge/v1/MSBridge-V1.apk",
    "/MSBridge-V2": "/downloads/app/msbridge/v2/MSBridge-V2.apk",
    "/MSBridge-V3": "/downloads/app/msbridge/v3/MSBridge-V3.apk",
    "/MSBridge-release": "/downloads/app/msbridge/release/MSBridge-release.apk",
  },
  security: {
    checkOrigin: true,
  },
  integrations: [
    //  expressiveCode block
    // expressiveCode({
    //   themes: ["tokyo-night"],
    //   plugins: [pluginLineNumbers(), pluginCollapsibleSections({})],
    //   defaultProps: {
    //     showLineNumbers: true,
    //     startLineNumber: 1,
    //     foreground: "var(--accent)",
    //     highlightForeground: "#85c7ebb3",
    //   },
    //   styleOverrides: {
    //     codeFontFamily: "'Poppins', sans-serif", // Changed to Poppins
    //     codeFontSize: "1.1em", // Reduced font size (was 1.5em)
    //     codeLineHeight: "1.4", // Adjusted line height
    //     codePaddingBlock: "4px",
    //     codeBorderRadius: "4px",
    //     codeWidth: "auto",
    //     codeMaxWidth: "auto",
    //     preColor: "#cddbf7",
    //     preFontFamily: "'Poppins', sans-serif", // Changed to Poppins
    //     preFontSize: "0.9em", // Reduced pre font size (was 1em)
    //     preLineHeight: "1.4", //Adjusted pre line height to match
    //   },
    // }),
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
