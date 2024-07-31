import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the header", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("should display the greeting text", async ({ page }) => {
    const greeting = page.locator("h1.animated-text");
    await expect(greeting).toHaveText("Hi There!");
  });

  test("should display the author name", async ({ page }) => {
    const authorName = page.locator("h2.animated-text");
    await expect(authorName).toHaveText("I'm Abdul Rafay");
  });

  test("should display the description", async ({ page }) => {
    const description = page.locator("p.description");
    await expect(description).toHaveText(
      "Software Engineer | Full Stack & Flutter Developer"
    );
  });

  test("should display the social links", async ({ page }) => {
    const socialLinks = page.locator(".social-links-container");
    await expect(socialLinks).toBeVisible();
  });

  test("should display the connect button", async ({ page }) => {
    const connectButton = page.locator("button.connect-button");
    await expect(connectButton).toBeVisible();
  });

  test("should display the Lottie animation", async ({ page }) => {
    const lottieAnimation = page.locator(".lottie-animation-container");
    await expect(lottieAnimation).toBeVisible();
  });
});
