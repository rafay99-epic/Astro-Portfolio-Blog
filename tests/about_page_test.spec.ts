import { test, expect } from "@playwright/test";

test.describe("About Me Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should load the About Me page", async ({ page }) => {
    await expect(page).toHaveTitle(/Abdul Rafay/); // Replace with your actual site title
  });

  test("should display the main content", async ({ page }) => {
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible();
  });

  //Works on the non build website
  // test("should display the author image", async ({ page }) => {
  //   const authorImage = page.locator('img[alt="author image"]');
  //   await expect(authorImage).toBeVisible();
  //   await expect(authorImage).toHaveAttribute("src", /author\.jpg/);
  // });

  test("should display the author image", async ({ page }) => {
    const authorImage = page.locator('img[alt="author image"]');
    await expect(authorImage).toBeVisible();
    await expect(authorImage).toHaveAttribute(
      "src",
      /\/_astro\/author\.[a-zA-Z0-9_-]+\.(jpg|jpeg|png|avif)/
    );
  });

  test("should display the animated text", async ({ page }) => {
    const animatedText = page.locator(".animated-text");
    await expect(animatedText).toHaveText("So, who am I?");
  });

  test("should display the paragraphs with correct text", async ({ page }) => {
    const paragraphs = page.locator("main p");
    await expect(paragraphs.nth(0)).toHaveText(
      /I'm a Full Stack Flutter Developer/
    );
    await expect(paragraphs.nth(1)).toHaveText(
      /Beyond code, I find joy in life's simple pleasures/
    );
    await expect(paragraphs.nth(2)).toHaveText(
      /In my free time, I'm passionate about continuous learning/
    );
  });
});
