import { getCollection } from "astro:content";
import { featureFlags } from "@config/featureFlag/featureFlag.json";

// Load the auth key from the environment variables
const AUTH_KEY = import.meta.env.AUTH_KEY;

export async function GET({ request }: { request: Request }) {
  try {
    if (!featureFlags.showProjects) {
      return new Response(JSON.stringify({ error: "Projects are  disabled" }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://www.rafay99.com",
        },
      });
    }

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || authHeader.trim() !== `Bearer ${AUTH_KEY}`) {
      console.error("Authorization failed: Headers do not match");
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
    console.error("Error fetching projects:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://www.rafay99.com",
      },
    });
  }
}
