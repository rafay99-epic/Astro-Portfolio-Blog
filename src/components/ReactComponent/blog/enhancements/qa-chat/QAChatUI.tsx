import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <span className="text-white text-sm">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">
              Interactive Q&A Chat
            </h3>
            <p className="text-white/80 text-xs">
              Ask questions about this blog post
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasGenerated && messages.length > 0 && (
            <>
              <button
                onClick={handleCopy}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200 group"
                title="Copy all Q&A"
              >
                {copySuccess ? (
                  <svg
                    className="w-4 h-4 text-[#9ece6a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-white group-hover:text-white/80"
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
                )}
              </button>

              <button
                onClick={regenerate}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200 group"
                title="Regenerate Q&A"
                disabled={isLoading}
              >
                <svg
                  className={`w-4 h-4 text-white group-hover:text-white/80 ${isLoading ? "animate-spin" : ""}`}
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
            className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200 group"
            title="Close chat"
          >
            <svg
              className="w-4 h-4 text-white group-hover:text-white/80"
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
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-[#1a1b26]/20">
        {messages.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-2xl flex items-center justify-center mb-4">
              <span className="text-white text-2xl">💬</span>
            </div>
            <h4 className="text-[#c0caf5] font-semibold mb-2 text-lg">
              Welcome to Interactive Q&A!
            </h4>
            <p className="text-[#a9b1d6] text-sm max-w-sm">
              Generated questions and your custom questions about this blog post
              will appear here.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-1.5 h-1.5 bg-[#9ece6a] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#565f89]">
                AI-powered conversations
              </span>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex gap-3"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {message.type === "question" ? (
                  <div className="w-8 h-8 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-xl flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Q</span>
                  </div>
                ) : message.type === "user-question" ? (
                  <div className="w-8 h-8 bg-gradient-to-r from-[#bb9af7] to-[#c0caf5] rounded-xl flex items-center justify-center">
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
                  <div className="w-8 h-8 bg-gradient-to-r from-[#9ece6a] to-[#73daca] rounded-xl flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">A</span>
                  </div>
                ) : message.type === "loading" ? (
                  <div className="w-8 h-8 bg-gradient-to-r from-[#ff9e64] to-[#e0af68] rounded-xl flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-[#f7768e] to-[#ff9e64] rounded-xl flex items-center justify-center">
                    <span className="text-white text-xs">⚠️</span>
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div
                  className={`rounded-2xl px-4 py-3 backdrop-blur-sm border ${
                    message.type === "question"
                      ? "bg-[#7aa2f7]/10 border-[#7aa2f7]/30"
                      : message.type === "user-question"
                        ? "bg-[#bb9af7]/10 border-[#bb9af7]/30"
                        : message.type === "answer"
                          ? "bg-[#9ece6a]/10 border-[#9ece6a]/30"
                          : message.type === "loading"
                            ? "bg-[#ff9e64]/10 border-[#ff9e64]/30"
                            : "bg-[#f7768e]/10 border-[#f7768e]/30"
                  }`}
                >
                  {message.type === "answer" ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="text-[#c0caf5] mb-2 last:mb-0 leading-relaxed text-sm">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-[#7aa2f7]">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic text-[#bb9af7]">
                              {children}
                            </em>
                          ),
                          code: ({ children }) => (
                            <code className="px-2 py-1 bg-[#1a1b26]/60 border border-[#565f89]/30 rounded text-xs font-mono text-[#9ece6a]">
                              {children}
                            </code>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside space-y-1 text-[#c0caf5] mb-2 text-sm ml-4">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside space-y-1 text-[#c0caf5] mb-2 text-sm ml-4">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-[#c0caf5] text-sm marker:text-[#7aa2f7]">
                              {children}
                            </li>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-[#7aa2f7]/50 pl-4 italic text-[#a9b1d6] bg-[#1a1b26]/30 py-2 rounded-r-lg my-2">
                              {children}
                            </blockquote>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              className="text-[#7aa2f7] hover:text-[#bb9af7] underline transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p
                      className={`text-sm font-medium ${
                        message.type === "question"
                          ? "text-[#7aa2f7]"
                          : message.type === "user-question"
                            ? "text-[#bb9af7]"
                            : message.type === "loading"
                              ? "text-[#ff9e64]"
                              : "text-[#f7768e]"
                      }`}
                    >
                      {message.content}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-[#565f89]">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {message.type === "user-question" && (
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-[#bb9af7] rounded-full"></div>
                      <span className="text-xs text-[#565f89]">You</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="border-t border-[#565f89]/20 p-4 bg-[#24283b]/20 backdrop-blur-sm">
        <form onSubmit={handleSubmitQuestion} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about this blog post..."
            className="flex-1 px-4 py-3 bg-[#2d3142]/60 border border-[#565f89]/30 rounded-xl text-[#c0caf5] 
                     placeholder-[#a9b1d6] text-sm focus:outline-none focus:ring-2 focus:ring-[#7aa2f7] 
                     focus:border-transparent backdrop-blur-sm transition-all duration-200"
            disabled={isLoading}
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!questionInput.trim() || isLoading}
            className="px-4 py-3 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white rounded-xl 
                     hover:from-[#6a8ef7] hover:to-[#ab8af7] disabled:opacity-50 disabled:cursor-not-allowed 
                     transition-all duration-200 text-sm font-medium shadow-lg flex items-center justify-center 
                     min-w-[52px] border border-[#7aa2f7]/30"
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
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#9ece6a] rounded-full animate-pulse"></div>
            <p className="text-xs text-[#a9b1d6]">
              Ask questions about this blog post content only
            </p>
          </div>
          <span className="text-xs text-[#565f89]">
            {questionInput.length}/500
          </span>
        </div>
      </div>

      {/* Copy Success Message */}
      <AnimatePresence>
        {copySuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute top-16 right-4 bg-gradient-to-r from-[#9ece6a] to-[#73daca] text-white px-4 py-2 rounded-xl text-sm shadow-lg border border-[#9ece6a]/30"
          >
            <div className="flex items-center gap-2">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied to clipboard!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
