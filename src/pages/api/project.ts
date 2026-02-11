import { type CollectionEntry, getCollection } from "astro:content";
import { featureFlags } from "@config/featureFlag/featureFlag.json";
import { ProjectSchema } from "../../types/ProjectTypes";

export async function GET() {
	const headers = {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "https://www.rafay99.com",
		"Cache-Control": "public, max-age=3600",
		ETag: crypto.randomUUID(),
	};
	try {
		if (!featureFlags.showProjects) {
			return new Response(
				JSON.stringify({ error: "Projects API is disabled" }),
				{
					status: 403,
					headers: headers,
				},
			);
		}

		const posts = await getCollection("projects");
		const filteredPosts = posts.filter(
			(post: CollectionEntry<"projects">) => !post.data.draft,
		);

		// Validate projects with Zod before returning
		const validatedProjects = filteredPosts.map(
			(project: CollectionEntry<"projects">) => {
				try {
					return ProjectSchema.parse({
						slug: project.slug,
						data: project.data,
					});
				} catch (error) {
					console.error("Validation error for project:", project.slug, error);
					throw error;
				}
			},
		);

		return new Response(JSON.stringify(validatedProjects), {
			status: 200,
			headers: headers,
		});
	} catch (error) {
		console.error("Error fetching Project posts:", error);
		return new Response(
			JSON.stringify({ error: "Failed to fetch project posts" }),
			{
				status: 500,
				headers: headers,
			},
		);
	}
}
