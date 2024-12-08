import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  try {
    const { email, isAgreed } = await request.json();

    if (!email || !isAgreed) {
      return new Response(
        JSON.stringify({
          message: !email
            ? "Email is required."
            : "You must agree to the terms to subscribe.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.NewsletterSub;
    if (!apiKey) {
      console.error("API key is not defined in environment variables.");
      return new Response(
        JSON.stringify({
          message: "Internal server error. Please try again later.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: email,
        listIds: [4],
        updateEnabled: false,
        attributes: {},
        doubleOptin: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from Brevo API:", errorData);
      return new Response(
        JSON.stringify({
          message: errorData.message || "Error occurred. Please try again.",
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Subscription successful!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
