import { GoogleGenerativeAI } from "@google/generative-ai";

const googleAIModelAPIKey = process.env.GOOGLE_AI_API_KEY;

const genAI = new GoogleGenerativeAI(googleAIModelAPIKey || "");

export async function POST({ request }: { request: Request }) {
  try {
    if (!googleAIModelAPIKey) {
      return new Response(
        JSON.stringify({
          error: "Sorry, API key is unreachable. Please try again.",
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
          error: "Invalid or empty content. Please provide valid content.",
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
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({
        error: "Something went wrong. Please try again later.",
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
