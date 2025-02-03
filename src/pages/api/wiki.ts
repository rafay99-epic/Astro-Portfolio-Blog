import { getCollection } from "astro:content";
import { featureFlags } from "@config/featureFlag/featureFlag.json";

export async function GET({ request }: { request: Request }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://www.rafay99.com",
  };

  try {
    // Feature flag check
    if (!featureFlags?.showWiki) {
      return new Response(
        JSON.stringify({ error: "Wiki feature is currently disabled." }),
        {
          status: 403,
          headers,
        }
      );
    }

    // Fetch wiki posts
    const posts = await getCollection("webwiki");

    if (!posts || posts.length === 0) {
      return new Response(
        JSON.stringify({ message: "No Wiki posts available." }),
        {
          status: 404,
          headers,
        }
      );
    }

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error fetching Wiki posts:", error);

    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred while fetching Wiki posts.",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers,
      }
    );
  }
}
