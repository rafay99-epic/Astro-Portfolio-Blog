import { GoogleGenerativeAI } from "@google/generative-ai";
import { FeatureFlagsApi } from "@config/featureFlag/featureFlag.json";
import {
  MAX_CONTENT_LENGTH,
  MAX_REQUESTS_PER_WINDOW,
} from "./ai_summary/config";
import {
  generateContentHash,
  isCacheValid,
  isRateLimited,
  sanitizeContent,
  createErrorResponse,
} from "./ai_summary/utils";
import type {
  CacheEntry,
  RateLimitEntry,
  ApiResponse,
} from "./ai_summary/types";

const googleAIModelAPIKey = process.env.GOOGLE_AI_API_KEY;
const genAI = googleAIModelAPIKey
  ? new GoogleGenerativeAI(googleAIModelAPIKey)
  : null;
const requestCounts = new Map<string, RateLimitEntry>();
const summaryCache = new Map<string, CacheEntry>();

if (!googleAIModelAPIKey) {
  console.warn("GOOGLE_AI_API_KEY environment variable is not set.");
}

async function generateSummary(content: string): Promise<string> {
  if (!genAI) throw new Error("AI service not configured");

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `You are a blog summarization assistant. Your task is to create concise, accurate summaries of blog posts. Do not add any information not present in the original text. Do not include any opinions or interpretations.

Summarize the following blog post content. Focus only on the main points and key information present in the text. Do not add any external information or interpretations:

${content}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

function validateInput(blogContent: string): void {
  if (!blogContent || typeof blogContent !== "string") {
    throw new Error(
      "Invalid request: blogContent is required and must be a string."
    );
  }

  if (blogContent.trim() === "") {
    throw new Error("Invalid request: blogContent cannot be empty.");
  }

  if (blogContent.length > MAX_CONTENT_LENGTH) {
    throw new Error(
      `Content too long. Maximum length is ${MAX_CONTENT_LENGTH} characters.`
    );
  }
}

export async function POST({ request }: { request: Request }) {
  const clientIP = request.headers.get("x-forwarded-for") || "unknown";

  try {
    if (!FeatureFlagsApi.enableAI_Summary) {
      return createErrorResponse(
        "AI Summary feature is currently under development",
        "FEATURE_DISABLED",
        403
      );
    }

    if (!genAI) {
      return createErrorResponse(
        "Server configuration error: Google AI API key is missing or invalid.",
        "CONFIG_ERROR",
        500
      );
    }

    if (isRateLimited(clientIP, requestCounts)) {
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

    const { blogContent } = await request.json();
    validateInput(blogContent);

    const sanitizedContent = sanitizeContent(blogContent);
    const contentHash = generateContentHash(sanitizedContent);
    const cachedSummary = summaryCache.get(contentHash);

    if (cachedSummary && isCacheValid(cachedSummary, contentHash)) {
      return new Response(
        JSON.stringify({
          summary: cachedSummary.summary,
          metadata: cachedSummary.metadata,
          cached: true,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
            "X-Cache": "HIT",
          },
        }
      );
    }

    const summary = await generateSummary(sanitizedContent);

    if (!summary || summary.trim() === "") {
      throw new Error("Generated summary is empty");
    }

    if (summary.length > sanitizedContent.length) {
      throw new Error("Generated summary is longer than the original content");
    }

    const metadata = {
      originalLength: sanitizedContent.length,
      summaryLength: summary.length,
      compressionRatio: (summary.length / sanitizedContent.length).toFixed(2),
    };

    summaryCache.set(contentHash, {
      summary,
      hash: contentHash,
      timestamp: Math.floor(Date.now() / 1000),
      metadata,
    });

    return new Response(
      JSON.stringify({
        summary,
        metadata,
        cached: false,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
          "X-Cache": "MISS",
        },
      }
    );
  } catch (err: any) {
    console.error("Error during Google AI API call:", err);

    if (err.message?.includes("API key")) {
      return createErrorResponse(
        "Authentication error with AI service.",
        "AUTH_ERROR",
        401
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

    return createErrorResponse(
      "Failed to generate summary. Please try again later.",
      "GENERATION_ERROR",
      500,
      err.message
    );
  }
}
