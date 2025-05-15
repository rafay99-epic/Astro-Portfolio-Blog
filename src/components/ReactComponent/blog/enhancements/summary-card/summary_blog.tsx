import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FeatureFlagsApi } from "@config/featureFlag/featureFlag.json";

type SummaryCardProps = {
  title: string;
  description: string;
  author: string;
  content: string;
};

type ErrorState = {
  message: string;
  code: string;
  retryable: boolean;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  description,
  author,
  content,
}) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const blogContent = `Title: ${title}\nAuthor: ${author}\nDescription: ${description}\n\nContent:\n${content}`;
  const cacheKey = `ai-summary-${title}-${author}-${description.substring(0, 20)}`;

  const handleError = useCallback((err: any) => {
    const errorState: ErrorState = {
      message: "Failed to generate summary",
      code: "UNKNOWN_ERROR",
      retryable: true,
    };

    if (err.code === "FEATURE_DISABLED") {
      errorState.message = "AI Summary feature is coming soon!";
      errorState.code = err.code;
      errorState.retryable = false;
    } else if (err.code === "RATE_LIMIT_EXCEEDED") {
      errorState.message = "Too many requests. Please try again in a minute.";
      errorState.code = err.code;
      errorState.retryable = true;
    } else if (err.code === "QUOTA_EXCEEDED") {
      errorState.message = "AI service quota exceeded. Please try again later.";
      errorState.code = err.code;
      errorState.retryable = false;
    } else if (err.code === "AUTH_ERROR") {
      errorState.message = "Authentication error. Please contact support.";
      errorState.code = err.code;
      errorState.retryable = false;
    }

    setError(errorState);
    setLoading(false);
  }, []);

  const fetchSummary = useCallback(
    async (forceRefresh = false) => {
      if (loading) return;

      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached && !forceRefresh) {
          try {
            const parsedCache = JSON.parse(cached);
            if (Date.now() - parsedCache.timestamp < 24 * 60 * 60 * 1000) {
              setSummary(parsedCache.summary);
              return;
            }
          } catch (e) {
            console.warn("Could not parse cached summary:", e);
          }
        }

        setLoading(true);
        setError(null);

        const res = await fetch("/api/ai_summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blogContent }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw { code: data.code, message: data.error };
        }

        setSummary(data.summary);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              summary: data.summary,
              timestamp: Date.now(),
              metadata: data.metadata,
            })
          );
        } catch (e) {
          console.warn("Could not save summary to localStorage:", e);
        }
      } catch (err: any) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [blogContent, cacheKey, loading, handleError]
  );

  useEffect(() => {
    if (FeatureFlagsApi.enableAI_Summary) {
      fetchSummary();
    } else {
      setError({
        message: "AI Summary feature is coming soon!",
        code: "FEATURE_DISABLED",
        retryable: false,
      });
    }
  }, [fetchSummary]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    fetchSummary(true);
  };

  return (
    <div className="bg-[#1f2335] text-white p-4 rounded-2xl border border-[#3b4252] my-6 transition-all">
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="cursor-pointer flex justify-between items-center"
      >
        <h2 className="text-xl font-semibold">AI Summary</h2>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="summary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mt-4"
          >
            {loading && (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7aa2f7] mb-2"></div>
                <p className="text-sm text-[#a9b1d6]">Generating summary...</p>
              </div>
            )}

            {error && (
              <div
                className={`p-4 rounded-lg mt-2 ${
                  error.code === "FEATURE_DISABLED"
                    ? "bg-[#2e3440] border border-[#7aa2f7]"
                    : "bg-red-900/20 border border-red-500"
                }`}
              >
                <p
                  className={`text-sm mb-2 ${
                    error.code === "FEATURE_DISABLED"
                      ? "text-[#7aa2f7]"
                      : "text-red-400"
                  }`}
                >
                  {error.message}
                </p>
                {error.retryable && (
                  <button
                    onClick={handleRetry}
                    className="text-sm text-[#7aa2f7] hover:text-[#a1c4fd] transition-colors"
                    disabled={loading}
                  >
                    Try Again
                  </button>
                )}
              </div>
            )}

            {summary && !loading && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.015 }}
                className="text-lg leading-relaxed bg-[#2e3440] p-4 rounded-lg"
                aria-live="polite"
              >
                {summary.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.01 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SummaryCard;
