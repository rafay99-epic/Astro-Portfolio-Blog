import authorConfig from "../../config/info";

export async function GET({ request }: { request: Request }) {
  try {
    // Get the API key from the headers
    const apiKey = request.headers.get("x-api-key");

    // Compare with the environment API key
    if (apiKey !== import.meta.env.AuthorAPIKey) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid API Key" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://www.rafay99.com",
          },
        }
      );
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
