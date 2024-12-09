import authorConfig from "@config/siteConfig/info.json";
import { FeatureFlagsApi } from "@config/featureFlag/featureFlag.json";

const AUTH_KEY = import.meta.env.AUTH_KEY;

export async function GET({ request }: { request: Request }) {
  try {
    if (!FeatureFlagsApi.enableauthorInfoAPI) {
      return new Response(
        JSON.stringify({ error: "Author Profile is disabled" }),
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

    const responseData = {
      author: authorConfig,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://www.rafay99.com",
      },
    });
  } catch (error) {
    console.error("Error fetching author data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch author data" }),
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
