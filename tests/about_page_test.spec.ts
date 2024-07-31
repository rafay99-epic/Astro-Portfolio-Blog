import { test, expect } from "@playwright/test";
import jobData from "../src/data/jobData.json" assert { type: "json" };

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should display the header", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("should display the author image", async ({ page }) => {
    const authorImage = page.locator('img[alt="author image"]');
    await expect(authorImage).toBeVisible();
    await expect(authorImage).toHaveAttribute(
      "src",
      /\/_astro\/author\.[a-zA-Z0-9_-]+\.(jpg|jpeg|png|avif)/
    );
  });

  test('should display the "So, who am I?" text', async ({ page }) => {
    const heading = page.locator("h2.animated-text");
    await expect(heading).toHaveText("So, who am I?");
  });

  test("should display the first description paragraph", async ({ page }) => {
    const firstParagraph = page.locator("p").nth(0);
    await expect(firstParagraph).toHaveText(
      "I'm a Full Stack Flutter Developer with a year's experience, transitioning from Machine Learning to crafting intuitive web experiences. Currently freelancing on platforms like Upwork, I deliver solutions that exceed client expectations"
    );
  });

  test("should display the second description paragraph", async ({ page }) => {
    const secondParagraph = page.locator("p").nth(1);
    await expect(secondParagraph).toHaveText(
      "Beyond code, I find joy in life's simple pleasures – sipping coffee, engaging in video game battles, and embracing the challenge of new experiences. This holistic approach recharges my creativity and enriches my problem-solving perspective"
    );
  });

  test("should display the third description paragraph", async ({ page }) => {
    const thirdParagraph = page.locator("p").nth(2);
    await expect(thirdParagraph).toHaveText(
      "In my free time, I'm passionate about continuous learning. Thriving on the tech industry's dynamic challenges, I expand my skill set, always seeking growth. Let's collaborate and create something extraordinary!"
    );
  });

  test("should display the correct number of job cards", async ({ page }) => {
    await page.waitForSelector(".card");

    const jobCards = page.locator(".card");

    const count = await jobCards.count();
    console.log(`Found ${count} job cards`);

    await expect(jobCards).toHaveCount(jobData.length);
  });

  jobData.forEach((job, index) => {
    test(`should display correct information for job card ${index + 1}`, async ({
      page,
    }) => {
      const jobCard = page.locator(".card").nth(index);

      const header = jobCard.locator(".card-header");
      await expect(header).toHaveText(`${job.position} at ${job.companyName}`);

      const subheader = jobCard.locator(".card-subheader");
      await expect(subheader).toHaveText(job.employmentTime);

      const rolesList = jobCard.locator(".roles-list li");
      await expect(rolesList).toHaveCount(job.roles.length);
      for (let i = 0; i < job.roles.length; i++) {
        await expect(rolesList.nth(i)).toHaveText(job.roles[i]);
      }

      const techList = jobCard.locator(".tech-list .tech-item");
      await expect(techList).toHaveCount(job.toolsUsed.length);
      for (let i = 0; i < job.toolsUsed.length; i++) {
        await expect(techList.nth(i)).toHaveText(job.toolsUsed[i]);
      }

      const footer = jobCard.locator(".card-footer");
      await expect(footer).toHaveText(`Employment Date: ${job.employmentTime}`);
    });
  });

  test("should display the footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
