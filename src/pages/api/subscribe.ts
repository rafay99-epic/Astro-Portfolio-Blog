import type { APIRoute } from "astro";
import featureFlagConfig from "@config/featureFlag/featureFlag.json";
export const POST: APIRoute = async ({ request }) => {
  try {
    if (!featureFlagConfig.FeatureFlagsApi.enableNewsletterSubscription) {
      return new Response(JSON.stringify({ error: "Newsletter subscription is currently disabled." }), {
        status: 503,
      });
    }

    let body: { email?: string; listId?: number };
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
        status: 400,
      });
    }
    const { email, listId } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required." }), {
        status: 400,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address." }), {
        status: 400,
      });
    }

    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      console.error("SUBSCRIBENEWSLETTER environment variable is missing.");
      return new Response(JSON.stringify({ error: "Internal server error." }), {
        status: 500,
      });
    }
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "api-key": apiKey,
      }),
      body: JSON.stringify({
        email,
        listIds: [listId || 4],
        updateEnabled: false,
        attributes: {},
        doubleOptin: true,
      }),
    });

    if (response.ok) {
      return new Response(
        JSON.stringify({
          message:
            "Subscription successful. Please check your email to verify.",
        }),
        { status: 200 }
      );
    } else {
      const errorData = await response.json();
      console.error("Brevo API error:", errorData);
      return new Response(
        JSON.stringify({
          error: "An error occurred while processing your request.",
        }),
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
    });
  }
};
