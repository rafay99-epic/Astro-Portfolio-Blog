import { test, expect } from "@playwright/test";

test.describe("Privacy Policy Page", () => {
  test("should load and display correct content", async ({ page }) => {
    // Navigate to the privacy policy page

    // Check if the page title is correct
    await expect(page).toHaveTitle("Privacy Policy");

    // Verify the main heading
    const heading = page.locator("h1");
    await expect(heading).toHaveText("Privacy Policy");

    // Check if the last updated date is present
    const lastUpdated = page.locator("p.text-lg.mb-6.text-center");
    await expect(lastUpdated).toContainText("Last updated:");

    // Verify some key sections are present
    const sections = [
      "Interpretation and Definitions",
      "Collecting and Using Your Personal Data",
      "Use of Your Personal Data",
      "Retention of Your Personal Data",
      "Transfer of Your Personal Data",
      "Delete Your Personal Data",
      "Disclosure of Your Personal Data",
      "Security of Your Personal Data",
      "Children's Privacy",
      "Links to Other Websites",
      "Changes to this Privacy Policy",
      "Contact Us",
    ];

    for (const section of sections) {
      const sectionHeading = page.locator(`h2:has-text("${section}")`);
      await expect(sectionHeading).toBeVisible();
    }

    // Check if the contact information is present
    const contactEmail = page.locator('p:has-text("99marafay@gmail.com")');
    await expect(contactEmail).toBeVisible();

    const contactLink = page.locator(
      'a[href="https://www.rafay99.com/contact-me"]'
    );
    await expect(contactLink).toBeVisible();

    // Verify that important links are working
    const termsLink = page.locator(
      'a[href="https://www.termsfeed.com/privacy-policy-generator/"]'
    );
    await expect(termsLink).toBeVisible();

    // Check if the page has the correct structure
    const mainContent = page.locator("main.max-w-7xl");
    await expect(mainContent).toBeVisible();

    // Verify that the header is present
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });
});
