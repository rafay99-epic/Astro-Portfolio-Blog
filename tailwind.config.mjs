/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Atkinson", "sans-serif"] },
      // colors: {
      //   accent: "var(--accent)",
      //   "accent-dark": "var(--accent-dark)",
      //   black: "rgb(var(--black))",
      //   gray: "rgb(var(--gray))",
      //   "gray-light": "rgb(var(--gray-light))",
      //   "text-light": "var(--text-light)",
      //   "gray-dark": "rgb(var(--gray-dark))",
      //   "gray-gradient": "var(--gray-gradient)",
      // },
      boxShadow: {
        custom:
          "0 2px 6px rgba(76, 80, 106, 0.25), 0 8px 24px rgba(76, 80, 106, 0.33)",
      },
    },
  },
  // plugins: [require("@tailwindcss/typography")],
};
