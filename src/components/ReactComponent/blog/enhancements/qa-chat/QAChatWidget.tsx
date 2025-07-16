import React, { useState, useEffect, memo } from "react";
import { QAChatLogic } from "./QAChatLogic";
import { QAChatUI } from "./QAChatUI";

interface QAChatWidgetProps {
  title: string;
  description: string;
  author: string;
  content: string;
}

export const QAChatWidget = memo(function QAChatWidget({
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
          className={`relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl ${
            isOpen
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/25"
              : "bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] hover:from-[var(--primary-600)] hover:to-[var(--primary-700)] shadow-[var(--primary-500)]/25"
          } border-2 border-white/20 backdrop-blur-sm`}
          title={isOpen ? "Close Q&A Chat" : "Open Q&A Chat"}
          style={{
            boxShadow: isOpen
              ? "0 25px 50px -12px rgba(239, 68, 68, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
              : "0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-full h-full text-white">
            {isOpen ? (
              <svg
                className="w-6 h-6"
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
                className="w-6 h-6"
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
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-40">
          <QAChatUI {...qaLogic} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
});
