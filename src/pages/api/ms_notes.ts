import { getCollection } from "astro:content";
import { featureFlags } from "@config/featureFlag/featureFlag.json";

export async function GET({ request }: { request: Request }) {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=86400",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  try {
    if (!featureFlags.showNotes) {
      return new Response(
        JSON.stringify({ error: "Notes feature is disabled" }),
        {
          status: 403,
          headers: headers,
        }
      );
    }

    const posts = await getCollection("ms_notes");

    // Filter notes where lectureDraft is false
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
