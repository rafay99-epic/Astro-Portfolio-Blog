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

const compilerConfig = {
  target: "19", // can be '17' | '18' | '19'
};

export default defineConfig({
  site: "https://www.rafay99.com",
  output: "server",
  build: {
    format: "directory",
  },
  prefetch: {
    prefetchAll: true,
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
  },
  security: {
    checkOrigin: true,
  },
  integrations: [
    partytown({}),
    mdx({}),
    sitemap({}),
    react({
      experimentalDisableStreaming: true,

      include: ["**/react/*"],
      babel: {
        plugins: ["babel-plugin-react-compiler", compilerConfig],
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
    devImageService: "sharp",
    isr: true,
  }),
  vite: {
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

// █████╗ ███████╗████████╗██████╗  ██████╗     ██████╗ ██╗ █████╗  ██████╗ ██████╗  █████╗ ███╗   ███╗
// ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗    ██╔══██╗██║██╔══██╗██╔════╝ ██╔══██╗██╔══██╗████╗ ████║
// ███████║███████╗   ██║   ██████╔╝██║   ██║    ██║  ██║██║███████║██║  ███╗██████╔╝███████║██╔████╔██║
// ██╔══██║╚════██║   ██║   ██╔══██╗██║   ██║    ██║  ██║██║██╔══██║██║   ██║██╔══██╗██╔══██║██║╚██╔╝██║
// ██║  ██║███████║   ██║   ██║  ██║╚██████╔╝    ██████╔╝██║██║  ██║╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║
// ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝     ╚═════╝ ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝

// So this is the issue
// Playwrite browser is required for astro diagram so I am removing it right now and
// it is under a feature flag but in the future I will enable it Once I have figure this out
// I have to figure out how to install playwright in the vercel build process
// if not then I would move from versel to another service

// import rehypeMermaid from "rehype-mermaid";
// here are the dependiences
// 1.     "puppeteer": "^24.10.2",
// 2.     "playwright": "^1.53.1",
// 3.     "rehype-mermaid": "^3.0.0",
// 4.     "mermaid": "^11.7.0",
// 5.     "astro-diagram": "^0.7.0",

// Here aare the react files
// 1.     src/components/ReactComponent/blog/enhancements/diagram-renderer/DiagramEnhancer.tsx
// 2.     src/components/ReactComponent/blog/enhancements/diagram-renderer/MermaidWrapper.tsx

// all the code will be commented out for now but not deleted

// Astro config

// MDX config
// rehypePlugins: [
//         [
//           rehypeMermaid,
//           {
//             strategy: "img-svg",
//             mermaidConfig: {
//               theme: "base",
//               themeVariables: {
//                 primaryColor: "#24283b",
//                 primaryTextColor: "#c0caf5",
//                 primaryBorderColor: "#7aa2f7",
//                 lineColor: "#7aa2f7",
//                 secondaryColor: "#414868",
//                 tertiaryColor: "#565f89",
//                 background: "#1a1b26",
//                 mainBkg: "#24283b",
//                 secondaryBkg: "#414868",
//                 tertiaryBkg: "#565f89",
//                 primaryTextColor: "#c0caf5",
//                 secondaryTextColor: "#a9b1d6",
//                 tertiaryTextColor: "#9aa5ce",
//                 primaryBorderColor: "#7aa2f7",
//                 secondaryBorderColor: "#bb9af7",
//                 tertiaryBorderColor: "#9ece6a",
//                 noteBkgColor: "#24283b",
//                 noteTextColor: "#c0caf5",
//                 noteBorderColor: "#7aa2f7",
//                 darkMode: true,
//                 fontFamily: "Poppins, sans-serif",
//                 fontSize: "22px",
//                 cScale0: "#c0caf5",
//                 cScale1: "#a9b1d6",
//                 cScale2: "#9aa5ce",
//                 cScale3: "#7aa2f7",
//                 cScale4: "#bb9af7",
//                 cScale5: "#9ece6a",
//                 cScale6: "#f7768e",
//                 cScale7: "#ff9e64",
//                 cScale8: "#e0af68",
//                 cScale9: "#73daca",
//                 cScale10: "#24283b",
//                 cScale11: "#414868",
//               },
//               flowchart: {
//                 nodeTextSize: 18,
//                 htmlLabels: true,
//                 curve: "basis",
//               },
//               sequence: {
//                 noteFontSize: 18,
//                 messageFontSize: 18,
//               },
//             },
//           },
//         ],
//       ],

// MD Config
// rehypePlugins: [
//   [
//     rehypeMermaid,
//     {
//       strategy: "img-svg",
//       mermaidConfig: {
//         theme: "base",
//         themeVariables: {
//           primaryColor: "#24283b",
//           primaryTextColor: "#c0caf5",
//           primaryBorderColor: "#7aa2f7",
//           lineColor: "#7aa2f7",
//           secondaryColor: "#414868",
//           tertiaryColor: "#565f89",
//           background: "#1a1b26",
//           mainBkg: "#24283b",
//           secondaryBkg: "#414868",
//           tertiaryBkg: "#565f89",
//           primaryTextColor: "#c0caf5",
//           secondaryTextColor: "#a9b1d6",
//           tertiaryTextColor: "#9aa5ce",
//           primaryBorderColor: "#7aa2f7",
//           secondaryBorderColor: "#bb9af7",
//           tertiaryBorderColor: "#9ece6a",
//           noteBkgColor: "#24283b",
//           noteTextColor: "#c0caf5",
//           noteBorderColor: "#7aa2f7",
//           darkMode: true,
//           fontFamily: "Poppins, sans-serif",
//           fontSize: "22px",
//           cScale0: "#c0caf5",
//           cScale1: "#a9b1d6",
//           cScale2: "#9aa5ce",
//           cScale3: "#7aa2f7",
//           cScale4: "#bb9af7",
//           cScale5: "#9ece6a",
//           cScale6: "#f7768e",
//           cScale7: "#ff9e64",
//           cScale8: "#e0af68",
//           cScale9: "#73daca",
//           cScale10: "#24283b",
//           cScale11: "#414868",
//         },
//         flowchart: {
//           nodeTextSize: 18,
//           htmlLabels: true,
//           curve: "basis",
//         },
//         sequence: {
//           noteFontSize: 18,
//           messageFontSize: 18,
//         },
//       },
//     },
//   ],
// ],
