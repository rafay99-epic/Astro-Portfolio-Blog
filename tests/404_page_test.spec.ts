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
    // Verify that the Lottie animation container is rendered
    const lottieAnimation = await page.locator(".mx-auto");
    await expect(lottieAnimation).toBeVisible();

    // Optionally check for Lottie canvas (specific class might differ based on your setup)
    const lottieCanvas = await page.locator("canvas");
    await expect(lottieCanvas).toHaveCount(1); // Should load the canvas for Lottie
  });
});
