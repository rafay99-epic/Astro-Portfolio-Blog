import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should display header, title, and description", async ({ page }) => {
    // Check if header is visible
    await expect(page.locator("header")).toBeVisible();

    // Verify title and description
    await expect(page).toHaveTitle(/SITE_TITLE/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /SITE_DESCRIPTION/
    );
  });

  test("should display author image", async ({ page }) => {
    // Check if the author image is visible
    await expect(page.locator('img[alt="author image"]')).toBeVisible();
  });

  test('should display "Who am I?" section', async ({ page }) => {
    // Check for the presence of "Who am I?" text
    await expect(page.locator("h2.animated-text")).toContainText(
      "So, who am I?"
    );

    // Check if descriptions are visible
    const descriptions = page.locator(".description");
    await expect(descriptions.nth(0)).toBeVisible();
    await expect(descriptions.nth(1)).toBeVisible();
    await expect(descriptions.nth(2)).toBeVisible();
  });

  test("should display job experience section", async ({ page }) => {
    // Check if JobExperience component is rendered
    await expect(page.locator("jobexperience")).toBeVisible(); // Adjust selector if needed
  });

  test("should display footer", async ({ page }) => {
    // Check if footer is visible
    await expect(page.locator("footer")).toBeVisible();
  });
});
