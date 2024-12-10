import { getCollection } from "astro:content";
import { featureFlags } from "@config/featureFlag/featureFlag.json";

// Load the auth key from the environment variables
const AUTH_KEY = import.meta.env.AUTH_KEY;

// Timing-safe comparison function
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function GET({ request }: { request: Request }) {
  try {
    if (!featureFlags.showProjects) {
      return new Response(JSON.stringify({ error: "Projects are disabled" }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://www.rafay99.com",
        },
      });
    }

    const authHeader = request.headers.get("Authorization");

    if (
      !authHeader ||
      !secureCompare(authHeader.trim(), `Bearer ${AUTH_KEY}`)
    ) {
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
