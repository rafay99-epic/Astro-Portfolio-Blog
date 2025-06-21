// Playwright configuration for Vercel deployment
// This config helps rehype-mermaid work properly on Vercel

module.exports = {
  // Global settings for all browsers
  use: {
    // Use headless mode in production
    headless: true,
    // Browser launch options for Vercel compatibility
    launchOptions: {
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
      ],
    },
  },

  // Configure for chromium (what rehype-mermaid uses)
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
};
