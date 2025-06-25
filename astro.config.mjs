import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import dotenv from "dotenv";
import robotsTxt from "astro-robots-txt";
import compress from "astro-compress";
import partytown from "@astrojs/partytown";
dotenv.config();

export default defineConfig({
  site: "https://www.rafay99.com",
  output: "server",
  build: {
    format: "file",
    inlineStylesheets: "always",
    assets: "assets",
    server: "./server",
    splitting: true,
    prebuild: true,
  },
  vite: {
    build: {
      cssMinify: true,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
          },
        },
      },
    },
    ssr: {
      noExternal: ["@astrojs/*"],
    },
    optimizeDeps: {
      exclude: ["@astrojs/image", "sharp"],
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  experimental: {
    // optimizeHoistedScript: true,
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
        collapseWhitespace: true,
        removeComments: true,
      },
      Image: {
        quality: 80,
        avif: {
          quality: 80,
          effort: 7,
        },
        webp: {
          quality: 80,
          effort: 5,
        },
      },
      JavaScript: true,
      SVG: true,
      Logger: 1,
    }),
  ],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    imageService: true,
    devImageService: "sharp",
  }),
});
