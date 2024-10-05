// tests/404-page.spec.ts

import { test, expect } from "@playwright/test";

test.describe("404 Error Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the 404 page
    await page.goto("http://localhost:4321/404");
  });

  test("should display the error component", async ({ page }) => {
    // Verify that the error page component is rendered
    const errorComponent = await page.locator(".animated-text-container");
    await expect(errorComponent).toBeVisible();
  });

  test("should display the Lottie animation", async ({ page }) => {
    // Wait for the Lottie animation container to appear
    const lottieContainer = await page.locator(".mx-auto");
    await expect(lottieContainer).toBeVisible();

    // Wait for the canvas element to appear inside the Lottie animation
    const lottieCanvas = await page.locator("canvas");
    await lottieCanvas.waitFor({ state: "visible", timeout: 10000 });

    // Verify the canvas is rendered correctly (if using canvas)
    await expect(lottieCanvas).toHaveCount(1);
  });
});
