import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

type ErrorState = {
  message: string;
  code: string;
  retryable: boolean;
};

type SummaryBlogUIProps = {
  summary: string | null;
  loading: boolean;
  error: ErrorState | null;
  retryCount: number;
  onRetry: () => void;
};

export const SummaryBlogUI = memo(function SummaryBlogUI({
  summary,
  loading,
  error,
  retryCount,
  onRetry,
}: SummaryBlogUIProps) {
  const [expanded, setExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopySummary = async () => {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getStatusIndicator = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#9ece6a] rounded-full animate-pulse" />
          <span className="text-xs text-[#a9b1d6]">Generating...</span>
        </div>
      );
    }
    if (error) {
      if (error.code === "FEATURE_DISABLED") {
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#565f89] rounded-full" />
            <span className="text-xs text-[#565f89]">Disabled</span>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#f7768e] rounded-full animate-pulse" />
          <span className="text-xs text-[#f7768e]">Error</span>
        </div>
      );
    }
    if (summary) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#9ece6a] rounded-full" />
          <span className="text-xs text-[#a9b1d6]">Ready</span>
        </div>
      );
    }
    return null;
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-[#565f89]/30 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-[#7aa2f7] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-sm text-[#c0caf5] mt-4 font-medium">
        🤖 AI is analyzing your content...
      </p>
      <p className="text-xs text-[#a9b1d6] mt-1">This may take a few seconds</p>
    </div>
  );

  const ErrorDisplay = () => (
    <div
      className={`p-4 rounded-xl mt-4 border backdrop-blur-xl transition-all duration-300 ${
        error?.code === "FEATURE_DISABLED"
          ? "bg-[#24283b]/40 border-[#565f89]/30"
          : "bg-[#24283b]/40 border-[#f7768e]/30"
      }`}
    >
      <div className="flex items-start space-x-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
            error?.code === "FEATURE_DISABLED"
              ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7]"
              : "bg-gradient-to-r from-[#f7768e] to-[#ff9e64]"
          }`}
        >
          {error?.code === "FEATURE_DISABLED" ? (
            <span className="text-white text-sm">ℹ️</span>
          ) : (
            <span className="text-white text-sm">⚠️</span>
          )}
        </div>
        <div className="flex-1">
          <p
            className={`text-sm font-medium mb-2 ${
              error?.code === "FEATURE_DISABLED"
                ? "text-[#7aa2f7]"
                : "text-[#f7768e]"
            }`}
          >
            {error?.message}
          </p>
          {error?.retryable && (
            <div className="flex items-center space-x-3">
              <button
                onClick={onRetry}
                disabled={loading}
                className="px-4 py-2 text-sm bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white rounded-lg 
                         hover:from-[#6a8ef7] hover:to-[#ab8af7] transition-all duration-200 disabled:opacity-50 
                         disabled:cursor-not-allowed font-medium shadow-lg
                         border border-[#7aa2f7]/30"
              >
                {loading ? "Retrying..." : "Try Again"}
              </button>
              {retryCount > 0 && (
                <span className="text-xs text-[#a9b1d6]">
                  Attempt {retryCount + 1}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const SummaryContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="mt-4 backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl 
                 shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[#7aa2f7]/20 to-[#bb9af7]/20 px-4 py-3 border-b border-[#565f89]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">🤖</span>
            </div>
            <div>
              <span className="text-sm font-semibold bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] bg-clip-text text-transparent">
                AI Generated Summary
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-1 h-1 bg-[#9ece6a] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#a9b1d6]">Powered by AI</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleCopySummary}
            disabled={!summary}
            className="flex items-center space-x-2 px-3 py-1.5 bg-[#2d3142]/60 hover:bg-[#2d3142] 
                     border border-[#565f89]/30 rounded-lg transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm
                     group text-xs font-medium"
            title="Copy summary to clipboard"
          >
            {copySuccess ? (
              <>
                <svg
                  className="w-3.5 h-3.5 text-[#9ece6a]"
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
                <span className="text-[#9ece6a]">Copied!</span>
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5 text-[#a9b1d6] group-hover:text-[#c0caf5] transition-colors"
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
                <span className="text-[#a9b1d6] group-hover:text-[#c0caf5] transition-colors">
                  Copy
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-base leading-relaxed text-[#c0caf5] prose prose-invert prose-base max-w-none"
          aria-live="polite"
        >
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-4 text-[#c0caf5] leading-relaxed text-base">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-[#7aa2f7]">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="italic text-[#bb9af7]">{children}</em>
              ),
              code: ({ children }) => (
                <code className="px-2 py-1 bg-[#2d3142]/60 border border-[#565f89]/30 rounded text-sm font-mono text-[#9ece6a]">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-[#1a1b26] border border-[#565f89]/30 rounded-lg p-4 overflow-x-auto">
                  {children}
                </pre>
              ),
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-[#c0caf5] mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-[#c0caf5] mb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-medium text-[#c0caf5] mb-2">
                  {children}
                </h3>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1 text-[#c0caf5] mb-4 ml-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-1 text-[#c0caf5] mb-4 ml-4">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-[#c0caf5] marker:text-[#7aa2f7]">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#7aa2f7]/50 pl-4 italic text-[#a9b1d6] bg-[#2d3142]/30 py-3 rounded-r-lg my-4">
                  {children}
                </blockquote>
              ),
              a: ({ children, href }) => (
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
            {summary || ""}
          </ReactMarkdown>
        </motion.div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#565f89]/20">
          <div className="flex items-center space-x-2 text-xs text-[#a9b1d6]">
            <div className="w-1.5 h-1.5 bg-[#9ece6a] rounded-full animate-pulse"></div>
            <span>Generated with AI technology</span>
          </div>
          <span className="text-xs text-[#565f89]">Summary cached for 24h</span>
        </div>
      </div>
    </motion.div>
  );

  const MainComponent = () => (
    <div className="my-6">
      <div
        onClick={() => setExpanded(!expanded)}
        className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl 
                   shadow-lg cursor-pointer transition-all duration-300
                   hover:bg-[#24283b]/60 hover:border-[#7aa2f7]/30 group"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">📝</span>
            </div>
            <div>
              <h3 className="text-base font-semibold">
                <span className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] bg-clip-text text-transparent">
                  AI Article Summary
                </span>
              </h3>
              <div className="flex items-center mt-1">
                {getStatusIndicator()}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {summary && !loading && (
              <div className="flex items-center space-x-1 text-xs text-[#9ece6a]">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Ready</span>
              </div>
            )}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-[#a9b1d6] group-hover:text-[#7aa2f7] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2">
              {loading && <LoadingSpinner />}
              {error && <ErrorDisplay />}
              <AnimatePresence>
                {summary && !loading && !error && <SummaryContent />}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return <MainComponent />;
});
