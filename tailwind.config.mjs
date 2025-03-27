/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        fadeSlideIn: "fadeSlideIn 1s forwards",
      },
      screens: {
        mobile: { max: "767px" },
      },
      keyframes: {
        fadeSlideIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: { sans: ["Atkinson", "sans-serif"] },
      boxShadow: {
        custom:
          "0 2px 6px rgba(76, 80, 106, 0.25), 0 8px 24px rgba(76, 80, 106, 0.33)",
      },
    },
  },
};
