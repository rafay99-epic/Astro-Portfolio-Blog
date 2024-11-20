import axios from "axios";
import { FeatureFlagsApi } from "@config/featureFlag/featureFlag.json";
import type {
  PageView,
  TrendingPostResponse,
} from "../../types/api/umamiInterfaces";
// Constants
const UMAMI_API_URL = "https://api.umami.is/api";
const UMAMI_API_KEY = process.env.UMAMI_API_KEY;
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const REQUEST_TIMEOUT = 5000;
const RATE_LIMIT_INTERVAL = 60000;
const MAX_REQUESTS = 5;

// Rate limiting variables
let requestCount = 0;
let lastRequestTime = Date.now();

// Check for valid Date
function isValidDate(date: string): boolean {
  return !isNaN(Date.parse(date));
}

// API config
function isUmamiAPIConfigured(): boolean {
  if (!FeatureFlagsApi.enableUmamiServiceAPI) {
    console.warn("Trending posts feature is disabled via config.");
    return false;
  }

  if (!UMAMI_API_KEY || !WEBSITE_ID) {
    console.warn(
      "Warning: UMAMI_API_KEY or WEBSITE_ID environment variable is missing."
    );
    return false;
  }

  return true;
}

// rate limit
function isRateLimited(): boolean {
  const currentTime = Date.now();

  // Reset request count after the interval
  if (currentTime - lastRequestTime > RATE_LIMIT_INTERVAL) {
    requestCount = 0;
    lastRequestTime = currentTime;
  }

  return requestCount >= MAX_REQUESTS;
}

// featching data
async function fetchPageViews(
  startDate: string,
  endDate: string
): Promise<PageView[]> {
  requestCount++;

  const response = await axios.get<PageView[]>(
    `${UMAMI_API_URL}/websites/${WEBSITE_ID}/pageviews`,
    {
      headers: {
        Authorization: `Bearer ${UMAMI_API_KEY}`,
      },
      params: {
        startAt: new Date(startDate).toISOString(),
        endAt: new Date(endDate).toISOString(),
      },
      timeout: REQUEST_TIMEOUT,
    }
  );

  return response.data;
}

//getting the trending page
function getTopTrendingPosts(data: PageView[], limit = 5): PageView[] {
  return data.sort((a, b) => b.pageviews - a.pageviews).slice(0, limit);
}

/**
 * Main function to get trending posts.
 * @param startDate - Start date for the data.
 * @param endDate - End date for the data.
 * @returns {Promise<TrendingPostResponse>} - Response with trending posts or an error message.
 */
export async function getTrendingPosts(
  startDate: string,
  endDate: string
): Promise<TrendingPostResponse> {
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return { message: "Invalid date parameters provided." };
  }

  if (!isUmamiAPIConfigured()) {
    return { message: "Umami API configuration is missing." };
  }

  if (isRateLimited()) {
    return { message: "Rate limit exceeded. Please try again later." };
  }

  try {
    const data = await fetchPageViews(startDate, endDate);

    if (!data || data.length === 0) {
      return { message: "No trending posts available." };
    }

    const trendingPosts = getTopTrendingPosts(data);
    return { posts: trendingPosts };
  } catch (error: unknown) {
    handleAPIError(error);
    return { message: "Failed to fetch trending posts due to an error." };
  }
}

// Error Handeling
function handleAPIError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    console.error("Error fetching page views from Umami:", error.message);
    if (error.response) {
      console.error(
        `Umami API Error - Status: ${error.response.status}, Data: ${JSON.stringify(
          error.response.data
        )}`
      );
    }
  } else {
    console.error("An unexpected error occurred:", error);
  }
}
