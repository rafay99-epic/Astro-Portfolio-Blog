import { getCollection } from "astro:content";
import { featureFlags } from "@config/featureFlag/featureFlag.json";
import { secureCompare } from "@util/security";

const AUTH_KEY = import.meta.env.AUTH_KEY;

if (!AUTH_KEY || AUTH_KEY.trim() === "") {
  console.error(
    "Critical Error: AUTH_KEY environment variable is missing or empty. Ensure it is properly set in your environment."
  );
  throw new Error(
    "Server cannot start: AUTH_KEY environment variable is required for API authentication."
  );
}

export async function GET({ request }: { request: Request }) {
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
