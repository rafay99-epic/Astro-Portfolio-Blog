import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 4 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: "html",

  use: {
    // baseURL:
    //   "https://rafay99-git-new-development-rafay99epics-projects.vercel.app/",
    baseURL: "http://localhost:4321",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 8"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: "npm run dev",
  //   url: "http://127.0.0.1:4322",
  //   reuseExistingServer: !process.env.CI,
  //   stdout: "ignore",
  //   stderr: "pipe",
  //   timeout: 120 * 1000,
  // },
});
