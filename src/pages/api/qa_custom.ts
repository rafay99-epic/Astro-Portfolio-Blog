import { GoogleGenerativeAI } from "@google/generative-ai";
import { featureFlags } from "@config/featureFlag/featureFlag.json";
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

const googleAIModelAPIKey = process.env.GOOGLE_AI_API_KEY;
const genAI = googleAIModelAPIKey
  ? new GoogleGenerativeAI(googleAIModelAPIKey)
  : null;
const requestCounts = new Map<string, RateLimitEntry>();

if (!googleAIModelAPIKey) {
  console.warn("GOOGLE_AI_API_KEY environment variable is not set.");
}

// Detect potential prompt injection attempts
function detectPromptInjection(question: string): boolean {
  const suspiciousPatterns = [
    /ignore\s+(previous|all|the)\s+(instructions?|prompts?|context)/i,
    /forget\s+(everything|all|previous|your)/i,
    /you\s+are\s+(now|a)\s+(?!asking|wondering)/i,
    /system\s*[:;]\s*/i,
    /prompt\s*[:;]\s*/i,
    /instruction\s*[:;]\s*/i,
    /<\s*\/?system\s*>/i,
    /\[\s*system\s*\]/i,
    /act\s+as\s+(?!if)/i,
    /pretend\s+(you|to)/i,
    /roleplay\s+as/i,
    /simulate\s+(?!a\s+question)/i,
    /generate\s+(?!an?\s+answer)/i,
    /create\s+(?!a\s+question)/i,
    /write\s+(?!about|regarding)/i,
    /tell\s+me\s+about\s+(?!this\s+blog|the\s+blog|the\s+article|this\s+article|the\s+post|this\s+post)/i,
    /what\s+is\s+(?!.*(?:mentioned|discussed|explained|covered|described)\s+in)/i,
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(question));
}

// Check if question is related to the blog content
function isQuestionRelated(
  question: string,
  title: string,
  content: string
): boolean {
  const questionWords = question.toLowerCase().split(/\s+/);
  const titleWords = title.toLowerCase().split(/\s+/);
  const contentWords = content.toLowerCase().split(/\s+/).slice(0, 500); // First 500 words

  // Check for content-related keywords
  const blogKeywords = [...titleWords, ...contentWords];
  const keywordMatches = questionWords.filter(
    (word) =>
      word.length > 3 &&
      blogKeywords.some(
        (keyword) => keyword.includes(word) || word.includes(keyword)
      )
  );

  // Must have at least some keyword overlap or be asking about "this" content
  const hasContentReference =
    /\b(this|the)\s+(blog|post|article|content|topic|discussion)\b/i.test(
      question
    );
  const hasKeywordOverlap =
    keywordMatches.length >= Math.min(2, questionWords.length / 3);

  return hasContentReference || hasKeywordOverlap;
}

async function answerCustomQuestion(
  question: string,
  content: string,
  title: string,
  description: string
): Promise<string> {
  if (!genAI) throw new Error("AI service not configured");

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `You are a helpful assistant that answers questions about blog posts. You must ONLY answer questions that are directly related to the provided blog content below.

STRICT RULES:
1. Answer ONLY questions about the blog content provided
2. If the question is not related to this blog post, respond with: "I can only answer questions about this blog post. Please ask something related to the content."
3. Do not answer questions about other topics, even if asked directly
4. Base your answers ONLY on the information provided in the blog content
5. Keep answers concise but informative (2-4 sentences)
6. Use markdown formatting when appropriate

Blog Title: ${title}
Blog Description: ${description}

Blog Content:
${content}

User Question: ${question}

Remember: Only answer if the question is about this specific blog post content. If not, politely redirect the user to ask about the blog content.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
}

function validateInput(
  question: string,
  blogContent: string,
  title: string
): void {
  if (!question || typeof question !== "string") {
    throw new Error(
      "Invalid request: question is required and must be a string."
    );
  }

  if (!blogContent || typeof blogContent !== "string") {
    throw new Error(
      "Invalid request: blogContent is required and must be a string."
    );
  }

  if (!title || typeof title !== "string") {
    throw new Error("Invalid request: title is required and must be a string.");
  }

  if (question.trim() === "") {
    throw new Error("Invalid request: question cannot be empty.");
  }

  if (question.length > 500) {
    throw new Error("Question too long. Maximum length is 500 characters.");
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
    if (!featureFlags.showQASection) {
      return createErrorResponse(
        "Custom Q&A feature is currently disabled",
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

    const { question, blogContent, title, description } = await request.json();
    validateInput(question, blogContent, title);

    // Security checks
    if (detectPromptInjection(question)) {
      return createErrorResponse(
        "Invalid question format. Please ask a normal question about the blog post.",
        "INVALID_QUESTION",
        400
      );
    }

    const sanitizedContent = sanitizeContent(blogContent);

    // Check if question is related to blog content
    if (!isQuestionRelated(question, title, sanitizedContent)) {
      return new Response(
        JSON.stringify({
          answer:
            "I can only answer questions about this blog post. Please ask something related to the content discussed in this article.",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const answer = await answerCustomQuestion(
      question,
      sanitizedContent,
      title,
      description || ""
    );

    if (!answer || answer.trim() === "") {
      throw new Error("Generated answer is empty");
    }

    return new Response(
      JSON.stringify({
        answer: answer.trim(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache", // Don't cache custom Q&A
        },
      }
    );
  } catch (err: any) {
    console.error("Error during custom Q&A:", err);

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
      "Failed to answer question. Please try again later.",
      "GENERATION_ERROR",
      500,
      err.message
    );
  }
}
