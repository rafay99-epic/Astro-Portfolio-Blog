import React, { useState } from "react";
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

export const SummaryBlogUI: React.FC<SummaryBlogUIProps> = ({
  summary,
  loading,
  error,
  retryCount,
  onRetry,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [designChoice, setDesignChoice] = useState(1);

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
        <div
          className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
          title="Loading summary..."
        />
      );
    }
    if (error) {
      if (error.code === "FEATURE_DISABLED") {
        return (
          <div
            className="w-2 h-2 bg-gray-400 rounded-full"
            title="Feature disabled"
          />
        );
      }
      return (
        <div
          className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
          title="Error occurred"
        />
      );
    }
    if (summary) {
      return (
        <div
          className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
          title="Summary loaded successfully"
        />
      );
    }
    return null;
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-white/20 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-sm text-white/80 mt-4 font-medium">
        Generating AI summary...
      </p>
      <p className="text-xs text-white/60 mt-1">This may take a few seconds</p>
    </div>
  );

  const ErrorDisplay = () => (
    <div
      className={`p-5 rounded-xl mt-4 border transition-all duration-300 backdrop-blur-md ${
        error?.code === "FEATURE_DISABLED"
          ? "bg-blue-500/10 border-[var(--accent)]/30 shadow-lg shadow-[var(--accent)]/5"
          : "bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/5"
      }`}
    >
      <div className="flex items-start space-x-3">
        <div
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
            error?.code === "FEATURE_DISABLED"
              ? "bg-[var(--accent)]/20"
              : "bg-red-500/20"
          }`}
        >
          {error?.code === "FEATURE_DISABLED" ? (
            <span className="text-[var(--accent)] text-sm">ℹ</span>
          ) : (
            <span className="text-red-400 text-sm">⚠</span>
          )}
        </div>
        <div className="flex-1">
          <p
            className={`text-sm font-medium mb-2 ${
              error?.code === "FEATURE_DISABLED"
                ? "text-[var(--accent)]"
                : "text-red-400"
            }`}
          >
            {error?.message}
          </p>
          {error?.retryable && (
            <div className="flex items-center space-x-3">
              <button
                onClick={onRetry}
                disabled={loading}
                className="px-4 py-2 text-sm bg-[var(--accent)]/80 backdrop-blur-sm text-white rounded-lg 
                         hover:bg-[var(--accent)] transition-all duration-200 disabled:opacity-50 
                         disabled:cursor-not-allowed font-medium shadow-md 
                         border border-[var(--accent)]/30"
              >
                {loading ? "Retrying..." : "Try Again"}
              </button>
              {retryCount > 0 && (
                <span className="text-xs text-white/60">
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
      className="mt-2 backdrop-blur-md bg-white/5 rounded-lg border border-white/10 
                 shadow-lg shadow-black/10 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[var(--accent)]/20 to-purple-500/20 px-4 py-2 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></div>
            <span className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide">
              AI Generated Summary
            </span>
          </div>
          <button
            onClick={handleCopySummary}
            disabled={!summary}
            className="flex items-center space-x-1.5 px-2 py-1 bg-white/10 hover:bg-white/20 
                     border border-white/20 rounded-md transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm
                     group text-xs font-medium"
            title="Copy summary to clipboard"
          >
            {copySuccess ? (
              <>
                <svg
                  className="w-3 h-3 text-green-400"
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
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <svg
                  className="w-3 h-3 text-white/70 group-hover:text-white transition-colors"
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
                <span className="text-white/70 group-hover:text-white transition-colors">
                  Copy
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-base leading-relaxed text-white/90 prose prose-invert prose-base max-w-none"
          aria-live="polite"
        >
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-4 text-white/90 leading-relaxed text-base">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-[var(--accent)]">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="italic text-white/95">{children}</em>
              ),
              code: ({ children }) => (
                <code className="px-1.5 py-0.5 bg-white/10 rounded text-sm font-mono text-[var(--accent)]">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto">
                  {children}
                </pre>
              ),
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-white mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-white mb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-medium text-white mb-2">
                  {children}
                </h3>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1 text-white/90 mb-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-1 text-white/90 mb-4">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-white/90">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[var(--accent)]/50 pl-4 italic text-white/80 bg-white/5 py-2 rounded-r">
                  {children}
                </blockquote>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-[var(--accent)] hover:text-[var(--accent)]/80 underline"
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

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
          <div className="flex items-center space-x-1.5 text-xs text-white/60">
            <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></span>
            <span>Powered by AI</span>
          </div>
          <span className="text-xs text-white/40">Summary cached for 24h</span>
        </div>
      </div>
    </motion.div>
  );

  const Option1 = () => (
    <div className="my-4">
      <div
        onClick={() => setExpanded(!expanded)}
        className="backdrop-blur-md bg-white/3 rounded-lg border border-white/8 
                   shadow-lg shadow-black/10 cursor-pointer transition-all duration-300
                   hover:bg-white/5 group"
      >
        <div className="flex items-center justify-between px-4 py-5">
          <div className="flex items-center space-x-3">
            {getStatusIndicator()}
            <span className="text-sm text-white/80 group-hover:text-white">
              AI Summary
            </span>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-white/60 group-hover:text-white/80"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
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

  return <Option1 />;
};
