import { GoogleGenerativeAI } from "@google/generative-ai";
import { FeatureFlagsApi } from "@config/featureFlag/featureFlag.json";
import {
  MAX_CONTENT_LENGTH,
  MAX_REQUESTS_PER_WINDOW,
} from "./ai_summary/config";
import {
  generateContentHash,
  isRateLimited,
  sanitizeContent,
  createErrorResponse,
} from "./ai_summary/utils";
import type { RateLimitEntry } from "./ai_summary/types";
import { CACHE_DURATION } from "./ai_summary/config";

const googleAIModelAPIKey = process.env.GOOGLE_AI_API_KEY;
const genAI = googleAIModelAPIKey
  ? new GoogleGenerativeAI(googleAIModelAPIKey)
  : null;
const requestCounts = new Map<string, RateLimitEntry>();
const qaCache = new Map<string, QACacheEntry>();

interface QAItem {
  question: string;
  answer: string;
}

interface QACacheEntry {
  qaItems: QAItem[];
  hash: string;
  timestamp: number;
  metadata: {
    originalLength: number;
    questionCount: number;
  };
}

if (!googleAIModelAPIKey) {
  console.warn("GOOGLE_AI_API_KEY environment variable is not set.");
}

// Custom cache validation for Q&A
function isQACacheValid(
  cacheEntry: QACacheEntry,
  contentHash: string
): boolean {
  const now = Math.floor(Date.now() / 1000);
  return (
    cacheEntry.hash === contentHash &&
    now - cacheEntry.timestamp < CACHE_DURATION
  );
}

async function generateQA(
  content: string,
  title: string,
  description: string
): Promise<QAItem[]> {
  if (!genAI) throw new Error("AI service not configured");

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `You are a Q&A generation assistant. Your task is to create 3-5 relevant, insightful questions and comprehensive answers based on the blog post content provided.

Requirements:
1. Generate exactly 3-5 question-answer pairs
2. Questions should be naturally occurring questions readers might have
3. Answers should be comprehensive but concise (2-4 sentences each)
4. Focus on the main concepts, key takeaways, and practical applications
5. Questions should cover different aspects of the content
6. Use markdown formatting in answers when appropriate (bold, italic, lists, etc.)
7. Ensure answers are based ONLY on the content provided

Blog Title: ${title}
Blog Description: ${description}

Blog Content:
${content}

Format your response as a JSON array with this exact structure:
[
  {
    "question": "Question text here?",
    "answer": "Comprehensive answer with **markdown formatting** when appropriate."
  }
]

Do not include any text outside of the JSON array.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const responseText = response.text().trim();

  try {
    // Clean the response text to extract JSON
    let jsonText = responseText;

    // Remove any markdown code block formatting
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/, "").replace(/\n?```$/, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/, "").replace(/\n?```$/, "");
    }

    const qaItems = JSON.parse(jsonText);

    if (!Array.isArray(qaItems)) {
      throw new Error("Response is not an array");
    }

    // Validate structure
    for (const item of qaItems) {
      if (
        !item.question ||
        !item.answer ||
        typeof item.question !== "string" ||
        typeof item.answer !== "string"
      ) {
        throw new Error("Invalid Q&A item structure");
      }
    }

    return qaItems;
  } catch (parseError) {
    console.error("Failed to parse AI response:", responseText);
    throw new Error("Failed to parse AI response into valid Q&A format");
  }
}

function validateInput(
  blogContent: string,
  title: string,
  description: string
): void {
  if (!blogContent || typeof blogContent !== "string") {
    throw new Error(
      "Invalid request: blogContent is required and must be a string."
    );
  }

  if (!title || typeof title !== "string") {
    throw new Error("Invalid request: title is required and must be a string.");
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
        "Q&A generation feature is currently under development",
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

    const { blogContent, title, description } = await request.json();
    validateInput(blogContent, title, description || "");

    const sanitizedContent = sanitizeContent(blogContent);
    const contentHash = generateContentHash(sanitizedContent + title);
    const cachedQA = qaCache.get(contentHash);

    if (cachedQA && isQACacheValid(cachedQA, contentHash)) {
      return new Response(
        JSON.stringify({
          qaItems: cachedQA.qaItems,
          metadata: cachedQA.metadata,
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

    const qaItems = await generateQA(
      sanitizedContent,
      title,
      description || ""
    );

    if (!qaItems || qaItems.length === 0) {
      throw new Error("No Q&A items were generated");
    }

    if (qaItems.length > 8) {
      throw new Error("Too many Q&A items generated");
    }

    const metadata = {
      originalLength: sanitizedContent.length,
      questionCount: qaItems.length,
    };

    qaCache.set(contentHash, {
      qaItems,
      hash: contentHash,
      timestamp: Math.floor(Date.now() / 1000),
      metadata,
    });

    return new Response(
      JSON.stringify({
        qaItems,
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
    console.error("Error during Q&A generation:", err);

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
      "Failed to generate Q&A. Please try again later.",
      "GENERATION_ERROR",
      500,
      err.message
    );
  }
}
