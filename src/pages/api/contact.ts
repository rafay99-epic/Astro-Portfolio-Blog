import type { APIRoute } from "astro";
import fetch from "node-fetch";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message, hCaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !message || !hCaptchaToken) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hCaptchaSecret = import.meta.env.HCAPTCHA_SECRET_KEY;
    const webformKey = import.meta.env.WEBFORM_KEY;

    if (!hCaptchaSecret || !webformKey) {
      console.error("Server configuration is missing");
      return new Response(
        JSON.stringify({ success: false, error: "Server misconfiguration" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify hCaptcha token
    const hCaptchaResponse = await fetch(`https://hcaptcha.com/siteverify`, {
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

    // Send data to Web3Forms
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
