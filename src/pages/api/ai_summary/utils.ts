import crypto from "crypto";
import { CACHE_DURATION, RATE_LIMIT_WINDOW } from "./config";
import type { CacheEntry, RateLimitEntry } from "./types";

export function generateContentHash(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex");
}

export function isCacheValid(
  cacheEntry: CacheEntry,
  contentHash: string
): boolean {
  const now = Math.floor(Date.now() / 1000);
  return (
    cacheEntry.hash === contentHash &&
    now - cacheEntry.timestamp < CACHE_DURATION
  );
}

export function cleanupRateLimits(
  requestCounts: Map<string, RateLimitEntry>
): void {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      requestCounts.delete(ip);
    }
  }
}

export function isRateLimited(
  ip: string,
  requestCounts: Map<string, RateLimitEntry>
): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(ip);

  cleanupRateLimits(requestCounts);

  if (!userRequests) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - userRequests.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (userRequests.count >= 10) {
    return true;
  }

  userRequests.count++;
  return false;
}

export function sanitizeContent(content: string): string {
  return content
    .replace(/```/g, "")
    .replace(/`/g, "")
    .replace(/\[.*?\]/g, "")
    .replace(/[<>]/g, "")
    .trim();
}

export function createErrorResponse(
  error: string,
  code: string,
  status: number,
  details?: string
) {
  return new Response(
    JSON.stringify({
      error,
      code,
      details: process.env.NODE_ENV === "development" ? details : undefined,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
