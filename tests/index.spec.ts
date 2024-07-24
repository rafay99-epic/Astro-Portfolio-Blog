import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page and check animated text", async ({
    page,
  }) => {
    // Navigate to the home page
    await page.goto("http://localhost:4322/");
    const animatedText = await page.locator(".animated-text");
    await expect(animatedText).toHaveCount(3);

    await expect(animatedText.nth(0)).toHaveText("Hi There!");
    await expect(animatedText.nth(1)).toHaveText("I'm Abdul Rafay");
    await expect(animatedText.nth(2)).toHaveText(
      "Software Engineer | Full Stack & Flutter Developer"
    );
  });
});
