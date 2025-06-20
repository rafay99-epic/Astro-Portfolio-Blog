import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  id: string;
  type: "question" | "answer" | "loading" | "error" | "user-question";
  content: string;
  timestamp: number;
  isUserGenerated?: boolean;
}

interface QAChatUIProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  hasGenerated: boolean;
  copyToClipboard: () => Promise<boolean>;
  regenerate: () => Promise<void>;
  askCustomQuestion: (question: string) => Promise<void>;
  onClose: () => void;
}

export function QAChatUI({
  messages,
  isLoading,
  error,
  hasGenerated,
  copyToClipboard,
  regenerate,
  askCustomQuestion,
  onClose,
}: QAChatUIProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [questionInput, setQuestionInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    const success = await copyToClipboard();
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim() || isLoading) return;

    const question = questionInput.trim();
    setQuestionInput("");
    await askCustomQuestion(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitQuestion(e);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-gradient-to-br from-[var(--glass-bg)] to-[var(--glass-bg-secondary)] border border-[var(--glass-border)] backdrop-blur-md shadow-[var(--glass-shadow)] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-600 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
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
          </div>
          <div>
            <h3 className="text-white font-medium text-xs">Q&A Helper</h3>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {hasGenerated && messages.length > 0 && (
            <>
              <button
                onClick={handleCopy}
                className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center transition-colors"
                title="Copy"
              >
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>

              <button
                onClick={regenerate}
                className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center transition-colors"
                title="Refresh"
                disabled={isLoading}
              >
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center transition-colors"
            title="Close"
          >
            <svg
              className="w-3 h-3 text-white"
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
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-64 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-white"
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
            </div>
            <h4 className="text-[var(--text-light)] font-medium mb-1 text-sm">
              Q&A Helper
            </h4>
            <p className="text-[var(--text-secondary)] text-xs">
              Auto-generated questions about this post
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {message.type === "question" ? (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">Q</span>
                </div>
              ) : message.type === "user-question" ? (
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              ) : message.type === "answer" ? (
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">A</span>
                </div>
              ) : message.type === "loading" ? (
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              )}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div
                className={`rounded-xl px-4 py-3 ${
                  message.type === "question"
                    ? "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800"
                    : message.type === "user-question"
                      ? "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800"
                      : message.type === "answer"
                        ? "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800"
                        : message.type === "loading"
                          ? "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-800"
                          : "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800"
                }`}
              >
                {message.type === "answer" ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="text-[var(--text-secondary)] mb-2 last:mb-0 leading-relaxed text-sm">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-[var(--text-light)]">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic text-[var(--text-secondary)]">
                            {children}
                          </em>
                        ),
                        code: ({ children }) => (
                          <code className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded px-1 py-0.5 text-xs font-mono text-[var(--text-light)]">
                            {children}
                          </code>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-2 text-sm">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside space-y-1 text-[var(--text-secondary)] mb-2 text-sm">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-[var(--text-secondary)] text-sm">
                            {children}
                          </li>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p
                    className={`text-sm ${
                      message.type === "question"
                        ? "text-blue-800 dark:text-blue-200 font-medium"
                        : message.type === "user-question"
                          ? "text-purple-800 dark:text-purple-200 font-medium"
                          : message.type === "loading"
                            ? "text-yellow-800 dark:text-yellow-200"
                            : "text-red-800 dark:text-red-200"
                    }`}
                  >
                    {message.content}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-[var(--text-secondary)]">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="border-t border-[var(--glass-border)] p-4">
        <form onSubmit={handleSubmitQuestion} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about this blog post..."
            className="flex-1 px-3 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-secondary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-400)] focus:border-transparent resize-none"
            disabled={isLoading}
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!questionInput.trim() || isLoading}
            className="px-4 py-2 bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] text-white rounded-lg hover:from-[var(--primary-600)] hover:to-[var(--primary-700)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium shadow-lg flex items-center justify-center min-w-[44px]"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </form>
        <p className="text-xs text-[var(--text-secondary)] mt-2">
          Ask questions about this blog post content only
        </p>
      </div>

      {/* Copy Success Message */}
      {copySuccess && (
        <div className="absolute top-16 right-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm shadow-lg animate-pulse">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
