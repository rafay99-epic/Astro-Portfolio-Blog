import authorConfig from "@util/info";
import { FeatureFlagsApi } from "@util/featureFlag";

export async function GET() {
  try {
    const responseData = {
      author: authorConfig,
    };

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
