import { useState } from "react";

export const useNewsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusColor, setStatusColor] = useState<string>("");

  const apiKey = import.meta.env.PUBLIC_API_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatusMessage("Please enter an email.");
      setStatusColor("text-red-500");
      return;
    }

    if (!isAgreed) {
      setStatusMessage("You must agree to the terms to subscribe.");
      setStatusColor("text-red-500");
      return;
    }

    try {
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

      if (response.ok) {
        setStatusMessage(
          "Thank you! Please confirm your subscription via the email we just sent."
        );
        setStatusColor("text-[#7aa2f7]");
        setEmail("");
        setIsAgreed(false);
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setStatusMessage(`Error: ${errorData.message || "Please try again."}`);
        setStatusColor("text-red-500");
      }
    } catch (error) {
      console.error("Request failed:", error);
      setStatusMessage("Error, please try again.");
      setStatusColor("text-red-500");
    }
  };

  return {
    email,
    setEmail,
    isAgreed,
    setIsAgreed,
    statusMessage,
    statusColor,
    handleSubmit,
  };
};
