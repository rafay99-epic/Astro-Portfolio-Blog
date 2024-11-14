import axios, { AxiosError } from "axios";
import { FeatureFlagsApi } from "../../util/featureFlag";

// Constants
const UMAMI_API_URL = "https://api.umami.is/api";
const UMAMI_API_KEY = process.env.UMAMI_API_KEY;
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const REQUEST_TIMEOUT = 5000;
const RATE_LIMIT_INTERVAL = 60000;
const MAX_REQUESTS = 5;

let requestCount = 0;
let lastRequestTime = Date.now();

interface PageView {
  page: string;
  pageviews: number;
}

interface TrendingPostResponse {
  message?: string;
  posts?: PageView[];
}

/**
 * Check if the rate limit has been exceeded.
 * @returns {boolean} - True if rate limit is exceeded, false otherwise.
 */
function isRateLimited(): boolean {
  const currentTime = Date.now();

  // Reset request count after the interval
  if (currentTime - lastRequestTime > RATE_LIMIT_INTERVAL) {
    requestCount = 0;
    lastRequestTime = currentTime;
  }

  return requestCount >= MAX_REQUESTS;
}

export async function getTrendingPosts(
  startDate: string,
  endDate: string
): Promise<TrendingPostResponse> {
  if (!FeatureFlagsApi.enableUmamiServiceAPI) {
    console.warn("Trending posts feature is disabled via config.");
    return { message: "Trending posts feature is disabled." };
  }

  if (!UMAMI_API_KEY || !WEBSITE_ID) {
    console.warn(
      "Warning: UMAMI_API_KEY or WEBSITE_ID environment variable is missing. Skipping Umami API call."
    );
    return {
      message:
        "Umami API configuration is missing. No trending posts available.",
    };
  }

  if (isRateLimited()) {
    console.warn("Rate limit exceeded. Please try again later.");
    return { message: "Rate limit exceeded. Please try again later." };
  }

  try {
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

    const data = response.data;

    if (!data || data.length === 0) {
      console.warn("No page views data returned from Umami API.");
      return { message: "No trending posts available." };
    }

    const trendingPosts = data
      .sort((a, b) => b.pageviews - a.pageviews)
      .slice(0, 5);

    return { posts: trendingPosts };
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    console.error(
      "Error fetching page views from Umami:",
      axiosError.message || error
    );

    if (axiosError.response) {
      console.error(
        `Umami API Error - Status: ${axiosError.response.status}, Data: ${JSON.stringify(
          axiosError.response.data
        )}`
      );
    }

    return { message: "Failed to fetch trending posts due to an error." };
  }
}
