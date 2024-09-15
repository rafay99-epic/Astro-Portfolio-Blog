/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Atkinson", "sans-serif"] },
      // typography: (theme) => ({
      //   DEFAULT: {
      //     css: {
      //       "--tw-prose-body": "var(--text-light)",
      //       "--tw-prose-headings": "var(--text-light)",
      //       "--tw-prose-links": "var(--accent)",
      //       "--tw-prose-bold": "var(--text-light)",
      //       "--tw-prose-counters": "var(--text-light)",
      //       "--tw-prose-bullets": "var(--text-light)",
      //       "--tw-prose-hr": `rgba(var(--gray-light), 0.5)`,
      //       "--tw-prose-quotes": "var(--text-light)",
      //       "--tw-prose-quote-borders": "var(--accent)",
      //       "--tw-prose-code": "var(--text-light)",
      //       "--tw-prose-pre-code": "var(--text-light)",
      //       "--tw-prose-pre-bg": `rgba(var(--gray-light), 0.1)`,
      //       "--tw-prose-th-borders": `rgba(var(--gray-light), 0.2)`,
      //       "--tw-prose-td-borders": `rgba(var(--gray-light), 0.2)`,
      //     },
      //   },
      // }),
      boxShadow: {
        custom:
          "0 2px 6px rgba(76, 80, 106, 0.25), 0 8px 24px rgba(76, 80, 106, 0.33)",
      },
    },
  },
  // plugins: [require("@tailwindcss/typography")],
};
