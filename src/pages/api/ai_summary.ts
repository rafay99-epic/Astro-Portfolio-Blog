import { GoogleGenerativeAI } from "@google/generative-ai";
import { FeatureFlagsApi } from "../../config/featureFlag/featureFlag.json";

const googleAIModelAPIKey = process.env.GOOGLE_AI_API_KEY;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

// Simple in-memory rate limiting
const requestCounts = new Map<string, { count: number; timestamp: number }>();

const genAI = googleAIModelAPIKey
  ? new GoogleGenerativeAI(googleAIModelAPIKey)
  : null;

if (!googleAIModelAPIKey) {
  console.warn("GOOGLE_AI_API_KEY environment variable is not set.");
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(ip);

  if (!userRequests) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - userRequests.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (userRequests.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  userRequests.count++;
  return false;
}

export async function POST({ request }: { request: Request }) {
  const clientIP = request.headers.get("x-forwarded-for") || "unknown";

  try {
    // Check if AI Summary feature is enabled
    if (!FeatureFlagsApi.enableAI_Summary) {
      return new Response(
        JSON.stringify({
          error: "AI Summary feature is currently under development",
          code: "FEATURE_DISABLED",
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!genAI) {
      console.error(
        "Google AI API instance is not available due to missing API key."
      );
      return new Response(
        JSON.stringify({
          error:
            "Server configuration error: Google AI API key is missing or invalid.",
          code: "CONFIG_ERROR",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please try again later.",
          code: "RATE_LIMIT_EXCEEDED",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }

    const body = await request.json();
    const { blogContent } = body;

    if (!blogContent || typeof blogContent !== "string") {
      return new Response(
        JSON.stringify({
          error:
            "Invalid request: blogContent is required and must be a string.",
          code: "INVALID_INPUT",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (blogContent.trim() === "") {
      return new Response(
        JSON.stringify({
          error: "Invalid request: blogContent cannot be empty.",
          code: "EMPTY_CONTENT",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (blogContent.length > 100000) {
      // ~100KB limit
      return new Response(
        JSON.stringify({
          error: "Content too long. Maximum length is 100,000 characters.",
          code: "CONTENT_TOO_LONG",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const sanitizedContent = blogContent
      .replace(/```/g, "")
      .replace(/`/g, "")
      .replace(/\[.*?\]/g, "")
      .replace(/[<>]/g, "")
      .trim();

    const prompt = `You are a blog summarization assistant. Your task is to create concise, accurate summaries of blog posts. Do not add any information not present in the original text. Do not include any opinions or interpretations.

Summarize the following blog post content. Focus only on the main points and key information present in the text. Do not add any external information or interpretations:

${sanitizedContent}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    if (!summary || summary.trim() === "") {
      throw new Error("Generated summary is empty");
    }

    if (summary.length > sanitizedContent.length) {
      throw new Error("Generated summary is longer than the original content");
    }

    return new Response(
      JSON.stringify({
        summary,
        metadata: {
          originalLength: sanitizedContent.length,
          summaryLength: summary.length,
          compressionRatio: (summary.length / sanitizedContent.length).toFixed(
            2
          ),
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  } catch (err: any) {
    console.error("Error during Google AI API call:", err);

    // Handle specific API errors
    if (err.message?.includes("API key")) {
      return new Response(
        JSON.stringify({
          error: "Authentication error with AI service.",
          code: "AUTH_ERROR",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (err.message?.includes("quota")) {
      return new Response(
        JSON.stringify({
          error: "AI service quota exceeded. Please try again later.",
          code: "QUOTA_EXCEEDED",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "3600",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Failed to generate summary. Please try again later.",
        code: "GENERATION_ERROR",
        details:
          process.env.NODE_ENV === "development" ? err.message : undefined,
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
