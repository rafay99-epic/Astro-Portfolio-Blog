import { FeatureFlagsApi } from "@config/featureFlag/featureFlag.json";
import authorConfig from "@config/siteConfig/info.json";

export async function GET({ request }: { request: Request }) {
  const header = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://www.rafay99.com",
    "Cache-Control": "public, max-age=3600",
    ETag: crypto.randomUUID(),
  };
  try {
    if (!FeatureFlagsApi.enableauthorInfoAPI) {
      return new Response(
        JSON.stringify({ error: "Author Profile is disabled" }),
        {
          status: 403,
          headers: header,
        }
      );
    }

    const responseData = {
      author: authorConfig,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: header,
    });
  } catch (error) {
    console.error("Error fetching author data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch author data" }),
      {
        status: 500,
        headers: header,
      }
    );
  }
}
