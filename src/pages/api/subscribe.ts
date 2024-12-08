import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
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

    const apiKey = process.env.SUBSCRIBENEWSLETTER;

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

    // Handle Brevo API response
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
          error: errorData.message || "Unknown error occurred.",
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
