import { test, expect } from "@playwright/test";

test.describe("404 Error Page", () => {
  test("should display correct title and description", async ({ page }) => {
    await expect(page).toHaveTitle(/SITE_TITLE/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /SITE_DESCRIPTION/
    );
  });

  test("should display error component and animation", async ({ page }) => {
    // Check for ErrorPage component
    await expect(page.locator(".animated-text-container")).toBeVisible();

    // Check for Lottie animation
    await expect(page.locator("canvas")).toBeVisible(); // Assuming animation renders in a canvas
  });
});
