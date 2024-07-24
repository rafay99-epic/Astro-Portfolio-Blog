import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test("should load the about page and display content correctly", async ({
    page,
  }) => {
    // Navigate to the about page
    await page.goto("./about");

    // Check if the main title is present
    const mainTitle = await page.locator(".animated-text");
    await expect(mainTitle).toHaveText("So, who am I?");

    // Check if the image is present
    const image = await page.locator(".lottie-animation-container img");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("alt", "rafay");

    // Check if the paragraphs are present and contain the expected text
    const paragraphs = await page.locator("main p");
    await expect(paragraphs.nth(0)).toHaveText(
      "I'm a Full Stack Flutter Developer with a year's experience, transitioning from Machine Learning to crafting intuitive web experiences. Currently freelancing on platforms like Upwork, I deliver solutions that exceed client expectations"
    );
    await expect(paragraphs.nth(1)).toHaveText(
      "Beyond code, I find joy in life's simple pleasures – sipping coffee, engaging in video game battles, and embracing the challenge of new experiences. This holistic approach recharges my creativity and enriches my problem-solving perspective"
    );
    await expect(paragraphs.nth(2)).toHaveText(
      "In my free time, I'm passionate about continuous learning. Thriving on the tech industry's dynamic challenges, I expand my skill set, always seeking growth. Let's collaborate and create something extraordinary!"
    );

    // // Check if the JobExperience component is present
    // const jobExperience = await page.locator("main >> text=JobExperience");
    // await expect(jobExperience).toBeVisible();
  });
});
