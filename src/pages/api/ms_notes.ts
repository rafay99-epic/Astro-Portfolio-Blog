import { getCollection } from "astro:content";
import featureFlagConfig from "@config/featureFlag/featureFlag.json";

export async function GET(_request: Request) {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=86400",
    "Access-Control-Allow-Origin": "https://www.rafay99.com",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  try {
    if (!featureFlagConfig.featureFlags.showNotes) {
      return new Response(
        JSON.stringify({ error: "Notes feature is disabled" }),
        {
          status: 403,
          headers: headers,
        },
      );
    }

    const posts = await getCollection("ms_notes");

    const filteredPosts = posts.filter((post) => !post.data.lecture_draft);

    return new Response(JSON.stringify(filteredPosts), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Error fetching MS notes:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch MS Notes" }), {
      status: 500,
      headers: headers,
    });
  }
}
