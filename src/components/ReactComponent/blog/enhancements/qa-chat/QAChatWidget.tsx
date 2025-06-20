import React, { useState, useEffect, useRef } from "react";
import { QAChatLogic } from "./QAChatLogic";
import { QAChatUI } from "./QAChatUI";

interface QAChatWidgetProps {
  title: string;
  description: string;
  author: string;
  content: string;
}

export default function QAChatWidget({
  title,
  description,
  author,
  content,
}: QAChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const qaLogic = QAChatLogic({
    title,
    description,
    author,
    content,
    onNewQA: () => setHasNewMessage(true),
  });

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  // Auto-generate Q&A when component mounts
  useEffect(() => {
    if (
      qaLogic.isFeatureEnabled &&
      !qaLogic.hasGenerated &&
      !qaLogic.isLoading
    ) {
      qaLogic.generateQA();
    }
  }, [qaLogic.isFeatureEnabled]);

  if (!qaLogic.isFeatureEnabled) {
    return null; // Don't show widget if feature is disabled
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className={`relative w-12 h-12 rounded-full shadow-md transition-all duration-200 hover:scale-105 ${
            isOpen
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-gray-500 hover:bg-gray-600"
          } border border-gray-400/30 backdrop-blur-sm opacity-75 hover:opacity-90`}
          title={isOpen ? "Close Q&A" : "Ask Questions"}
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-full h-full text-white">
            {isOpen ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>

          {/* Notification Badge */}
          {hasNewMessage && !isOpen && (
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border border-white" />
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 max-w-[calc(100vw-3rem)] z-40">
          <QAChatUI {...qaLogic} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
