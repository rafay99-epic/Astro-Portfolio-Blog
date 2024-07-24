// import { test, expect } from "@playwright/test";

// test.describe("Projects Page", () => {
//   test("should load the projects page and check project cards", async ({
//     page,
//   }) => {
//     // Navigate to the projects page
//     await page.goto("http://localhost:4322/projects"); // Adjust the URL to match your local server

//     // Check if the header is present
//     const header = await page.locator("header");
//     await expect(header).toBeVisible();

//     // Check if the main title is present
//     const mainTitle = await page.locator("main h1");
//     await expect(mainTitle).toHaveText("Some Things I've build");

//     // Check if the project cards are present
//     const projectCards = await page.locator(".project-card");
//     await expect(projectCards).toHaveCount(3); // Adjust the count based on the number of projects in your JSON

//     // Check the content of the first project card
//     const firstProjectCard = projectCards.nth(0);
//     await expect(firstProjectCard.locator("h2")).toHaveText("Project Title 1"); // Adjust based on your project data
//     await expect(firstProjectCard.locator("p")).toHaveText(
//       "Project Description 1"
//     ); // Adjust based on your project data

//     // Check if the footer is present
//     const footer = await page.locator("footer");
//     await expect(footer).toBeVisible();
//   });
// });
