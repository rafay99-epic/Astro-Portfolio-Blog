// umamiService.ts

import axios from "axios";
import { FeatureFlagsApi } from "../../util/featureFlag";

const UMAMI_API_URL = "https://api.umami.is/api";
const UMAMI_API_KEY = process.env.UMAMI_API_KEY;
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;

export async function getTrendingPosts(startDate: string, endDate: string) {
  if (!FeatureFlagsApi.enableTrendingPostsAPI) {
    console.warn("Trending posts feature is disabled via config.");
    return [];
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

  try {
    const response = await axios.get(
      `${UMAMI_API_URL}/websites/${WEBSITE_ID}/pageviews`,
      {
        headers: {
          Authorization: `Bearer ${UMAMI_API_KEY}`,
        },
        params: {
          startAt: new Date(startDate).toISOString(),
          endAt: new Date(endDate).toISOString(),
        },
      }
    );

    const data = response.data;

    if (!data || data.length === 0) {
      console.warn("No page views data returned from Umami API.");
      return { message: "No trending posts available." };
    }

    const trendingPosts = data
      .sort((a: any, b: any) => b.pageviews - a.pageviews)
      .slice(0, 5);

    return trendingPosts;
  } catch (error: any) {
    console.error(
      "Error fetching page views from Umami:",
      error.message || error
    );

    if (error.response) {
      console.error(
        `Umami API Error - Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`
      );
    }

    return { message: "Failed to fetch trending posts due to an error." };
  }
}
