import { test, expect } from "@playwright/test";

test.describe("Terms and Conditions Page", () => {
  test("should load and display correct content", async ({ page }) => {
    // Navigate to the terms and conditions page

    // Check if the page title is correct
    await expect(page).toHaveTitle("Terms and Conditions");

    // Verify the main heading
    const heading = page.locator("h1");
    await expect(heading).toHaveText("Terms and Conditions");

    // Check if the last updated date is present
    const lastUpdated = page.locator("p.mb-4.text-justify").first();
    await expect(lastUpdated).toContainText("Last updated:");

    // Verify some key sections are present
    const sections = [
      "Interpretation and Definitions",
      "Acknowledgment",
      "Links to Other Websites",
      "Termination",
      "Limitation of Liability",
      '"AS IS" and "AS AVAILABLE" Disclaimer',
      "Governing Law",
      "Disputes Resolution",
      "For European Union (EU) Users",
      "United States Legal Compliance",
      "Severability and Waiver",
      "Translation Interpretation",
      "Changes to These Terms and Conditions",
      "Contact Us",
    ];

    for (const section of sections) {
      const sectionHeading = page.locator(`h2:has-text("${section}")`);
      await expect(sectionHeading).toBeVisible();
    }

    // Check if the definitions are present
    const definitions = [
      "Affiliate",
      "Country",
      "Company",
      "Device",
      "Service",
      "Terms and Conditions",
      "Third-party Social Media Service",
      "Website",
      "You",
    ];

    for (const definition of definitions) {
      const definitionElement = page.locator(
        `strong:has-text("${definition}")`
      );
      await expect(definitionElement).toBeVisible();
    }

    // Verify that important links are working
    const termsGeneratorLink = page.locator(
      'a[href="https://www.termsfeed.com/terms-conditions-generator/"]'
    );
    await expect(termsGeneratorLink).toBeVisible();

    const websiteLink = page.locator('a[href="https://rafay99.com"]');
    await expect(websiteLink).toBeVisible();

    // Check if the contact information is present
    const contactEmail = page.locator('li:has-text("99marafay@gmail.com")');
    await expect(contactEmail).toBeVisible();

    // Check if the page has the correct structure
    const mainContent = page.locator("main.max-w-7xl");
    await expect(mainContent).toBeVisible();

    // Verify that the header is present
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Check for the presence of the SpeedInsights component
    const speedInsights = page.locator("speed-insights");
    await expect(speedInsights).toBeVisible();
  });
});
