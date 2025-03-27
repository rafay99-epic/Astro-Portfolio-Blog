import { useState } from "react";

export const useNewsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusColor, setStatusColor] = useState<string>("");

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
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          listId: 4,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(data.message || "Subscription successful!");
        setStatusColor("text-[#7aa2f7]");
        setEmail("");
        setIsAgreed(false);
      } else {
        setStatusMessage(data.error || "Error, please try again.");
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
