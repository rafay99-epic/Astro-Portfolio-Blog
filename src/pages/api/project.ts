import { getCollection } from "astro:content";
import { featureFlags } from "@config/featureFlag/featureFlag.json";
import { checkAuthorization } from "@util/authUtils";

export async function GET({ request }: { request: Request }) {
  try {
    if (!featureFlags.showProjects) {
      return new Response(
        JSON.stringify({ error: "Projects API is disabled" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://www.rafay99.com",
          },
        }
      );
    }

    if (!checkAuthorization(request)) {
      return new Response(JSON.stringify({ error: "Unauthorized access" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://www.rafay99.com",
        },
      });
    }

    const posts = await getCollection("projects");

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://www.rafay99.com",
      },
    });
  } catch (error) {
    console.error("Error fetching Project posts:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch newsletter posts" }),
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
