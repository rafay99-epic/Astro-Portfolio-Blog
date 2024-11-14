import { getCollection } from "astro:content";
import { featureFlags } from "../../util/featureFlag";

export async function GET() {
  try {
    if (!featureFlags.showBlog) {
      return new Response(
        JSON.stringify({ error: "Blog feature is disabled" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://www.rafay99.com",
          },
        }
      );
    }

    const posts = await getCollection("blog");

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://www.rafay99.com",
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch blog posts" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://www.rafay99.com",
        },
      }
    );
  }
}
