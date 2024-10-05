import { test, expect } from "@playwright/test";

test("404 page", async ({ page }) => {
  // Navigate to the 404 page
  await page.goto("/404");

  // Check if the page has the correct title
  await expect(page).toHaveTitle("Your Site Title");

  // Check if the main content is present
  const main = await page.locator("main");
  await expect(main).toBeVisible();

  // Check if the ErrorPageComponent is present
  const errorComponent = await page.locator(".animated-text-container");
  await expect(errorComponent).toBeVisible();

  // Check if the LottieReactComponent is present
  const lottieComponent = await page.locator(
    ".mx-auto.w-3/4.h-3/4.md\\:w-\\[400px\\].md\\:h-\\[400px\\]"
  );
  await expect(lottieComponent).toBeVisible();

  // Check for responsive layout
  // Desktop view
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.locator("main")).toHaveClass(
    /flex flex-1 justify-center items-center w-full h-screen/
  );

  // Mobile view
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator("main")).toHaveClass(
    /flex flex-1 justify-center items-center w-full h-screen/
  );

  // Check for Vercel Speed Insights
  const speedInsights = await page.locator(
    'script[src*="vercel/speed-insights"]'
  );
  await expect(speedInsights).toHaveCount(2); // One in head, one in body

  // Accessibility check
  await expect(await page.accessibility.snapshot()).toBeTruthy();
});
