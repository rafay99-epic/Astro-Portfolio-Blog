import { getCollection } from "astro:content";
import featureFlagConfig from "@config/featureFlag/featureFlag.json";

export async function GET({}: { request: Request }) {
  const header = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://www.rafay99.com",
    "Cache-Control": "public, max-age=3600",
    ETag: crypto.randomUUID(),
  };
  try {
    if (!featureFlagConfig.featureFlags.showNewsletter) {
      return new Response(
        JSON.stringify({ error: "Newsletter Read is disabled" }),
        {
          status: 403,
          headers: header,
        },
      );
    }

    const posts = await getCollection("newsletter");

    const filteredPosts = posts.filter((post) => !post.data.draft);
    return new Response(JSON.stringify(filteredPosts), {
      status: 200,
      headers: header,
    });
  } catch (error) {
    console.error("Error fetching newsletter posts:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch newsletter posts" }),
      {
        status: 500,
        headers: header,
      },
    );
  }
}
