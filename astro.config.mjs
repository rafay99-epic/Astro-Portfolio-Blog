import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import dotenv from "dotenv";
import robotsTxt from "astro-robots-txt";
dotenv.config();
import partytown from "@astrojs/partytown";
import compress from "astro-compress";

export default defineConfig({
  site: "https://www.rafay99.com",
  output: "server",
  build: {
    concurrency: 10,
    format: "directory",
  },
  prefetch: {
    prefetchAll: false,
  },
  experimental: {
    // svg: true,
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
    "/webwiki": "https://rafay99-docs.vercel.app/",
  },
  
  security: {
    checkOrigin: true,
  },
  integrations: [
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
    partytown({
      config: {
        forward: ["dataLayer.push"],
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
  ],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 3,
    imageService: true,
    isr: true,
  }),
  vite: {
    build: {
      cssMinify: true,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 3,
        },
        mangle: {
          toplevel: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "ui-components": [
              "@headlessui/react",
              "@heroicons/react",
              "framer-motion",
            ],
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
    resolve: {
      alias: {
        "@assets": "/src/assets",
        "@components": "/src/components",
        "@astro": "/src/components/AstroComponent",
        "@react": "/src/components/ReactComponent",
        "@content": "/src/content",
        "@layouts": "/src/layouts",
        "@pages": "/src/pages",
        "@styles": "/src/styles",
        "@types": "/src/types",
        "@util": "/src/util",
        "@config": "/src/config",
        "@server": "/src/server",
        "@hooks": "/src/hooks",
      },
    },
  },
});
