import { useEffect, useState, useCallback } from "react";
import { FeatureFlagsApi } from "@config/featureFlag/featureFlag.json";

type ErrorState = {
  message: string;
  code: string;
  retryable: boolean;
};

type SummaryLogicProps = {
  title: string;
  description: string;
  author: string;
  content: string;
};

export const useSummaryLogic = ({
  title,
  description,
  author,
  content,
}: SummaryLogicProps) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const blogContent = `Title: ${title}\nAuthor: ${author}\nDescription: ${description}\n\nContent:\n${content}`;

  const generateCacheKey = (content: string): string => {
    let hash = 0;
    if (content.length === 0) return hash.toString();
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return `ai-summary-${Math.abs(hash)}-${title.replace(/[^a-zA-Z0-9]/g, "").substring(0, 20)}`;
  };

  const cacheKey = generateCacheKey(blogContent);

  const handleError = useCallback(
    (err: any, statusCode?: number) => {
      const errorState: ErrorState = {
        message: "Failed to generate summary",
        code: "UNKNOWN_ERROR",
        retryable: true,
      };

      if (statusCode === 500) {
        errorState.message =
          "Sorry, AI summary is not working due to server issues. Please try again later.";
        errorState.code = "SERVER_ERROR";
        errorState.retryable = true;
        try {
          localStorage.removeItem(cacheKey);
        } catch (e) {
          console.warn("Could not clear cache:", e);
        }
      } else if (err.code === "FEATURE_DISABLED") {
        errorState.message = "AI Summary feature is coming soon!";
        errorState.code = err.code;
        errorState.retryable = false;
      } else if (err.code === "RATE_LIMIT_EXCEEDED") {
        errorState.message = "Too many requests. Please try again in a minute.";
        errorState.code = err.code;
        errorState.retryable = true;
      } else if (err.code === "QUOTA_EXCEEDED") {
        errorState.message =
          "AI service quota exceeded. Please try again later.";
        errorState.code = err.code;
        errorState.retryable = false;
      } else if (err.code === "AUTH_ERROR") {
        errorState.message = "Authentication error. Please contact support.";
        errorState.code = err.code;
        errorState.retryable = false;
      }

      setError(errorState);
      setLoading(false);
    },
    [cacheKey]
  );

  const validateCacheData = useCallback(
    (cachedData: any): boolean => {
      if (!cachedData || !cachedData.metadata) {
        return false;
      }

      const { metadata } = cachedData;
      return (
        metadata.title === title &&
        metadata.author === author &&
        metadata.description === description &&
        metadata.contentHash === generateCacheKey(blogContent)
      );
    },
    [title, author, description, blogContent]
  );

  const fetchSummary = useCallback(
    async (forceRefresh = false) => {
      if (loading) return;

      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached && !forceRefresh) {
          try {
            const parsedCache = JSON.parse(cached);
            if (
              Date.now() - parsedCache.timestamp < 24 * 60 * 60 * 1000 &&
              validateCacheData(parsedCache)
            ) {
              setSummary(parsedCache.summary);
              return;
            } else {
              localStorage.removeItem(cacheKey);
            }
          } catch (e) {
            console.warn("Could not parse cached summary:", e);
            localStorage.removeItem(cacheKey);
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
          throw {
            code: data.code,
            message: data.error,
            statusCode: res.status,
          };
        }

        setSummary(data.summary);

        try {
          const cacheData = {
            summary: data.summary,
            timestamp: Date.now(),
            metadata: {
              title,
              author,
              description,
              contentHash: generateCacheKey(blogContent),
              ...data.metadata,
            },
          };

          localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        } catch (e) {
          console.warn("Could not save summary to localStorage:", e);
        }
      } catch (err: any) {
        handleError(err, err.statusCode);
      } finally {
        setLoading(false);
      }
    },
    [
      blogContent,
      cacheKey,
      loading,
      handleError,
      title,
      author,
      description,
      validateCacheData,
    ]
  );

  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
    fetchSummary(true);
  }, [fetchSummary]);

  const initializeSummary = useCallback(() => {
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

  useEffect(() => {
    initializeSummary();
  }, [initializeSummary]);

  return {
    summary,
    loading,
    error,
    retryCount,
    handleRetry,
    refetch: () => fetchSummary(true),
  };
};
