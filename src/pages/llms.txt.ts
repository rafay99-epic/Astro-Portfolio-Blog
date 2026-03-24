import { type CollectionEntry, getCollection } from "astro:content";
import authorConfig from "@config/siteConfig/info.json";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
	try {
		const siteUrl = site?.href ?? "https://www.rafay99.com";

		// Get all published, non-archived blog posts sorted by date (newest first)
		const posts = (await getCollection("blog")).filter(
			(post: CollectionEntry<"blog">) =>
				!post.data.draft && !post.data.archived,
		);
		const sortedPosts = posts.sort(
			(a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
				new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf(),
		);

		// Get all published projects
		const projects = (await getCollection("projects")).filter(
			(project: CollectionEntry<"projects">) => !project.data.draft,
		);

		// Build the llms.txt content
		let content = "";

		// Title and description
		content += `# ${authorConfig.SiteName}\n\n`;
		content += `> ${authorConfig.SiteDescription}\n\n`;

		// Site overview
		content += `This is the personal website and blog of Abdul Rafay, a Software Engineer specializing in Full Stack & Team Lead roles. The site contains blog posts about software development, AI, web development, DevOps, and more.\n\n`;

		// Links to full content
		content += `## Full Content\n\n`;
		content += `- [Full Blog Content for LLMs](${siteUrl}llms-full.txt)\n`;
		content += `- [RSS Feed](${siteUrl}rss.xml)\n`;
		content += `- [Sitemap](${siteUrl}sitemap-index.xml)\n\n`;

		// Blog posts section
		content += `## Blog Posts\n\n`;
		for (const post of sortedPosts) {
			const url = `${siteUrl}blog/${post.id}/`;
			content += `- [${post.data.title}](${url}): ${post.data.description}\n`;
		}
		content += "\n";

		// Projects section
		if (projects.length > 0) {
			content += `## Projects\n\n`;
			for (const project of projects) {
				const url = `${siteUrl}project/${project.id}/`;
				content += `- [${project.data.Projecttitle}](${url}): ${project.data.ProjectDescription}\n`;
			}
			content += "\n";
		}

		// Optional sections
		content += `## Key Pages\n\n`;
		content += `- [Home](${siteUrl})\n`;
		content += `- [About](${siteUrl}about/)\n`;
		content += `- [Blog](${siteUrl}blog/)\n`;
		content += `- [Projects](${siteUrl}project/)\n`;
		content += `- [Experience](${siteUrl}experience/)\n`;
		content += `- [Contact](${siteUrl}contact-me/)\n`;

		return new Response(content.trim(), {
			headers: { "Content-Type": "text/plain; charset=utf-8" },
		});
	} catch (error) {
		console.error("Failed to generate llms.txt:", error);
		return new Response("Error generating llms.txt", { status: 500 });
	}
};
