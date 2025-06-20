import { useState, useEffect, useRef } from "react";
import { FeatureFlagsApi } from "@config/featureFlag/featureFlag.json";

interface QAItem {
  question: string;
  answer: string;
}

interface QASectionState {
  qaItems: QAItem[];
  isLoading: boolean;
  error: string | null;
  isFeatureEnabled: boolean;
  hasGenerated: boolean;
}

interface QASectionLogicProps {
  title: string;
  description: string;
  author: string;
  content: string;
}

export function QASectionLogic({
  title,
  description,
  author,
  content,
}: QASectionLogicProps) {
  const [state, setState] = useState<QASectionState>({
    qaItems: [],
    isLoading: false,
    error: null,
    isFeatureEnabled: FeatureFlagsApi.enableAI_Summary, // Using same feature flag
    hasGenerated: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const contentHashRef = useRef<string>("");
  const cacheKeyRef = useRef<string>("");

  // Single hash generation utility
  const generateHash = (input: string): string => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  };

  // Initialize hashes once
  const initializeHashes = (): void => {
    if (!contentHashRef.current) {
      contentHashRef.current = generateHash(content.slice(0, 1000)); // Use first 1000 chars
      cacheKeyRef.current = `qa_${contentHashRef.current}`;
    }
  };

  // Check if cached Q&A exists and is valid
  const getCachedQA = (): QAItem[] | null => {
    try {
      initializeHashes();
      const cached = localStorage.getItem(cacheKeyRef.current);
      if (!cached) return null;

      const parsedCache = JSON.parse(cached);
      const now = Math.floor(Date.now() / 1000);
      const cacheAge = now - parsedCache.timestamp;
      const maxAge = 24 * 60 * 60; // 24 hours

      if (cacheAge > maxAge) {
        localStorage.removeItem(cacheKeyRef.current);
        return null;
      }

      // Validate cached content belongs to current blog
      if (parsedCache.contentHash !== contentHashRef.current) {
        localStorage.removeItem(cacheKeyRef.current);
        return null;
      }

      return parsedCache.qaItems;
    } catch (error) {
      console.error("Error reading Q&A cache:", error);
      return null;
    }
  };

  // Cache Q&A items
  const cacheQAItems = (qaItems: QAItem[]): void => {
    try {
      initializeHashes();
      const cacheData = {
        qaItems,
        timestamp: Math.floor(Date.now() / 1000),
        contentHash: contentHashRef.current,
      };
      localStorage.setItem(cacheKeyRef.current, JSON.stringify(cacheData));
    } catch (error) {
      console.error("Error caching Q&A:", error);
    }
  };

  // Generate Q&A items
  const generateQA = async (): Promise<void> => {
    if (!state.isFeatureEnabled || state.isLoading || state.hasGenerated) {
      return;
    }

    initializeHashes();

    // Check cache first
    const cachedQA = getCachedQA();
    if (cachedQA && cachedQA.length > 0) {
      setState((prev) => ({
        ...prev,
        qaItems: cachedQA,
        hasGenerated: true,
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      const response = await fetch("/api/qa_generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogContent: content,
          title,
          description,
          author,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 500) {
          // Clear potentially corrupted cache
          localStorage.removeItem(cacheKeyRef.current);
          throw new Error(
            errorData.message || "Server error occurred. Please try again."
          );
        }

        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.qaItems || !Array.isArray(data.qaItems)) {
        throw new Error("Invalid response format");
      }

      const qaItems = data.qaItems;
      cacheQAItems(qaItems);

      setState((prev) => ({
        ...prev,
        qaItems,
        isLoading: false,
        hasGenerated: true,
      }));
    } catch (error: any) {
      if (error.name === "AbortError") {
        return; // Request was cancelled, don't update state
      }

      console.error("Error generating Q&A:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to generate Q&A. Please try again.",
      }));
    }
  };

  // Copy Q&A to clipboard
  const copyToClipboard = async (): Promise<boolean> => {
    try {
      const formattedQA = state.qaItems
        .map(
          (item, index) =>
            `**Q${index + 1}: ${item.question}**\n\n${item.answer}`
        )
        .join("\n\n---\n\n");

      await navigator.clipboard.writeText(formattedQA);
      return true;
    } catch (error) {
      console.error("Failed to copy Q&A:", error);
      return false;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    generateQA,
    copyToClipboard,
  };
}
