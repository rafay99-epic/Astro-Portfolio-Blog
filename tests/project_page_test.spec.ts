import { test, expect } from "@playwright/test";
import projects from "../src/data/projectData.json" assert { type: "json" };

test.describe("Projects Page", () => {
  test("should load and display correct content", async ({ page }) => {
    // Navigate to the projects page

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Projects/);

    // Verify the main heading
    const heading = page.locator("h1");
    await expect(heading).toHaveText("Some Things I've Built");

    // Check if the header is present
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Check if the footer is present
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    // Check if the SpeedInsights component is present
    const speedInsights = page.locator("speed-insights");
    await expect(speedInsights).toBeVisible();

    // Verify the project cards
    const projectCards = page.locator(
      ".flex-1.bg-gray-100.rounded-lg.border.border-gray-300.overflow-hidden"
    );
    await expect(projectCards).toHaveCount(projects.length);

    // Check each project card
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const card = projectCards.nth(i);

      // Check project title
      const title = card.locator("h2");
      await expect(title).toHaveText(project.title);

      // Check project description
      const description = card.locator("p");
      await expect(description).toHaveText(project.description);

      // Check project image
      const image = card.locator("img");
      await expect(image).toHaveAttribute("src", project.imageUrl);
      await expect(image).toHaveAttribute("alt", project.title);

      // Check technologies
      for (const tech of project.technologies) {
        const techElement = card.locator(`span:has-text("${tech}")`);
        await expect(techElement).toBeVisible();
      }

      // Check GitHub link
      const githubLink = card.locator(`a[href="${project.githubLink}"]`);
      await expect(githubLink).toBeVisible();

      // Check deployed link
      const deployedLink = card.locator(`a[href="${project.deployedLink}"]`);
      await expect(deployedLink).toBeVisible();
    }
  });

  test("should have correct layout and styling", async ({ page }) => {
    // Check if the main container has the correct classes
    const main = page.locator("main");
    await expect(main).toBeVisible();

    // Check if the project cards container has the correct classes
    const cardContainer = page.locator(
      "div.flex.flex-wrap.gap-5.justify-center"
    );
    await expect(cardContainer).toBeVisible();

    // Check if each project card has the correct classes
    const projectCards = page.locator(
      ".flex-1.bg-gray-100.rounded-lg.border.border-gray-300.overflow-hidden"
    );
    for (const card of await projectCards.all()) {
      await expect(card).toHaveClass(
        /flex-1 bg-gray-100 rounded-lg border border-gray-300 overflow-hidden/
      );
    }
  });
});
