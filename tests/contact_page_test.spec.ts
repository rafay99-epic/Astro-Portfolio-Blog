// import { test, expect } from "@playwright/test";

// test.describe("Contact Page", () => {
//   test("should load the contact page and submit the form", async ({ page }) => {
//     // Navigate to the contact page
//     await page.goto("./contact-me"); // Adjust the URL to match your local server

//     // Check if the main title is present
//     const mainTitle = await page.locator("main h2");
//     await expect(mainTitle).toHaveText("Contact Me");

//     // Check if the form is present
//     const form = await page.locator("#contactForm");
//     await expect(form).toBeVisible();

//     // Fill out the form
//     await page.fill("#name", "John Doe");
//     await page.fill("#email", "john.doe@example.com");
//     await page.fill("#message", "This is a test message.");

//     // Submit the form
//     await page.click('button[type="submit"]');
//   });
// });
