import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should display correct title and meta description", async ({
    page,
  }) => {
    // Verify page title and description
    await expect(page).toHaveTitle(/SITE_TITLE/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /SITE_DESCRIPTION/
    );
  });

  test("should display header and social links", async ({ page }) => {
    // Check if header is visible
    await expect(page.locator("header")).toBeVisible();

    // Check if social links are visible
    await expect(page.locator(".social-links-container")).toBeVisible();
  });

  test("should display intro text", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    // Check for the presence of introductory text
    await expect(page.locator("h1.animated-text")).toContainText("Hi There!");
    await expect(page.locator("h2.animated-text")).toContainText(
      "I'm Abdul Rafay"
    );
    await expect(page.locator(".description")).toContainText(
      "Software Engineer | Full Stack & Flutter Developer"
    );
  });

  test("should display Lottie animation", async ({ page }) => {
    // Check if Lottie animation is visible
    await expect(page.locator(".lottie-animation-container")).toBeVisible();
  });

  test('should navigate to contact page when clicking "Connect with Me"', async ({
    page,
  }) => {
    // Click the "Connect with Me" button and verify redirection
    await page.locator("button.connect-button").click();
    await expect(page).toHaveURL(/\/contact-me/);
  });
});
