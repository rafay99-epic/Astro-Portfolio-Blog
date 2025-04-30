import { GoogleGenerativeAI } from "@google/generative-ai";

const googleAIModelAPIKey = process.env.GOOGLE_AI_API_KEY;

const genAI = googleAIModelAPIKey
  ? new GoogleGenerativeAI(googleAIModelAPIKey)
  : null;

if (!googleAIModelAPIKey) {
  console.warn("GOOGLE_AI_API_KEY environment variable is not set.");
}

/**
 * Handles HTTP POST requests to generate a summary of provided blog content using the Google Generative AI service.
 *
 * Expects a JSON request body with a `blogContent` string. Returns a JSON response containing the generated summary or an error message if the input is invalid or the AI service is unavailable.
 *
 * @returns A `Response` object with a JSON payload containing either the summary or an error message.
 *
 * @remark Returns a 500 error if the Google AI API key is missing or invalid, or if an internal error occurs during processing. Returns a 400 error if `blogContent` is missing or not a valid non-empty string.
 */
export async function POST({ request }: { request: Request }) {
  try {
    if (!genAI) {
      console.error(
        "Google AI API instance is not available due to missing API key."
      );
      return new Response(
        JSON.stringify({
          error:
            "Server configuration error: Google AI API key is missing or invalid. Check server logs.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const body = await request.json();
    const { blogContent } = body;

    if (
      !blogContent ||
      typeof blogContent !== "string" ||
      blogContent.trim() === ""
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Invalid or empty blogContent. Please provide valid string content.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `Summarize this blog:\n\n${blogContent}`
    );
    const response = await result.response;
    const summary = response.text();

    return new Response(JSON.stringify({ summary }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.error("Error during Google AI API call:", err);

    return new Response(
      JSON.stringify({
        error:
          "Something went wrong processing the request. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
