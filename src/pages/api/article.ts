import { getCollection } from "astro:content";
import { featureFlags } from "@config/featureFlag/featureFlag.json";

export async function GET({ request }: { request: Request }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://www.rafay99.com",
    "Cache-Control": "public, max-age=3600",
    ETag: crypto.randomUUID(),
  };

  try {
    if (!featureFlags.showBlog) {
      return new Response(
        JSON.stringify({ error: "Blog feature is disabled" }),
        {
          status: 403,
          headers: headers,
        }
      );
    }

    const posts = await getCollection("blog");

    const filteredPosts = posts.filter((post) => !post.data.draft);

    return new Response(JSON.stringify(filteredPosts), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch blog posts" }),
      {
        status: 500,
        headers: headers,
      }
    );
  }
}
