import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message, hCaptchaToken } = body;

    if (!name || !email || !message || !hCaptchaToken) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate field lengths
    const maxNameLength = 100;
    const maxEmailLength = 100;
    const maxMessageLength = 5000;
    if (
      name.length > maxNameLength ||
      email.length > maxEmailLength ||
      message.length > maxMessageLength
    ) {
      return new Response(
        JSON.stringify({ success: false, error: "Input exceeds maximum allowed length" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hCaptchaSecret = process.env.HCAPTCHA;
    const webformKey = process.env.WEBFORM_KEY;

    if (!hCaptchaSecret || !webformKey) {
      console.error("Server configuration is missing");
      return new Response(
        JSON.stringify({ success: false, error: "Server misconfiguration" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify hCaptcha token
    const hCaptchaResponse = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: hCaptchaSecret,
        response: hCaptchaToken,
      }),
    });

    const hCaptchaData = await hCaptchaResponse.json();

    if (!hCaptchaData.success) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid hCaptcha token" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Submit form data to Web3Forms
    const web3Response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: webformKey,
        name,
        email,
        message,
      }),
    });

    if (!web3Response.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Web3Forms submission failed",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Form submitted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
