import { useState, useEffect, useRef } from "react";
import { FeatureFlagsApi } from "@config/featureFlag/featureFlag.json";

interface QAItem {
  question: string;
  answer: string;
}

interface ChatMessage {
  id: string;
  type: "question" | "answer" | "loading" | "error" | "user-question";
  content: string;
  timestamp: number;
  isUserGenerated?: boolean;
}

interface QAChatState {
  messages: ChatMessage[];
  qaItems: QAItem[];
  isLoading: boolean;
  error: string | null;
  isFeatureEnabled: boolean;
  hasGenerated: boolean;
}

interface QAChatLogicProps {
  title: string;
  description: string;
  author: string;
  content: string;
  onNewQA?: () => void;
}

export function QAChatLogic({
  title,
  description,
  author,
  content,
  onNewQA,
}: QAChatLogicProps) {
  const [state, setState] = useState<QAChatState>({
    messages: [],
    qaItems: [],
    isLoading: false,
    error: null,
    isFeatureEnabled: FeatureFlagsApi.enableAI_Summary,
    hasGenerated: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const cacheKeyRef = useRef<string>("");

  // Generate cache key based on content
  const generateCacheKey = (content: string): string => {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return `qa_chat_${Math.abs(hash).toString(36)}`;
  };

  // Generate content hash for validation
  const generateContentHash = (content: string): string => {
    const encoder = new TextEncoder();
    const data = encoder.encode(content.slice(0, 1000));
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  };

  // Check if cached Q&A exists and is valid
  const getCachedQA = (cacheKey: string): QAItem[] | null => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return null;

      const parsedCache = JSON.parse(cached);
      const now = Math.floor(Date.now() / 1000);
      const cacheAge = now - parsedCache.timestamp;
      const maxAge = 24 * 60 * 60; // 24 hours

      if (cacheAge > maxAge) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      // Validate cached content belongs to current blog
      if (parsedCache.contentHash !== generateContentHash(content)) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return parsedCache.qaItems;
    } catch (error) {
      console.error("Error reading Q&A cache:", error);
      return null;
    }
  };

  // Cache Q&A items
  const cacheQAItems = (cacheKey: string, qaItems: QAItem[]): void => {
    try {
      const cacheData = {
        qaItems,
        timestamp: Math.floor(Date.now() / 1000),
        contentHash: generateContentHash(content),
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error("Error caching Q&A:", error);
    }
  };

  // Convert Q&A items to chat messages
  const convertQAToMessages = (qaItems: QAItem[]): ChatMessage[] => {
    const messages: ChatMessage[] = [];

    qaItems.forEach((item, index) => {
      messages.push({
        id: `q_${index}`,
        type: "question",
        content: item.question,
        timestamp: Date.now() + index * 1000,
      });

      messages.push({
        id: `a_${index}`,
        type: "answer",
        content: item.answer,
        timestamp: Date.now() + index * 1000 + 500,
      });
    });

    return messages;
  };

  // Generate Q&A items
  const generateQA = async (): Promise<void> => {
    if (!state.isFeatureEnabled || state.isLoading || state.hasGenerated) {
      return;
    }

    const cacheKey = generateCacheKey(content);
    cacheKeyRef.current = cacheKey;

    // Check cache first
    const cachedQA = getCachedQA(cacheKey);
    if (cachedQA && cachedQA.length > 0) {
      const messages = convertQAToMessages(cachedQA);
      setState((prev) => ({
        ...prev,
        qaItems: cachedQA,
        messages,
        hasGenerated: true,
      }));
      onNewQA?.();
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      messages: [
        {
          id: "loading",
          type: "loading",
          content: "Generating questions about this blog post...",
          timestamp: Date.now(),
        },
      ],
    }));

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
          localStorage.removeItem(cacheKey);
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
      const messages = convertQAToMessages(qaItems);

      cacheQAItems(cacheKey, qaItems);

      setState((prev) => ({
        ...prev,
        qaItems,
        messages,
        isLoading: false,
        hasGenerated: true,
      }));

      onNewQA?.();
    } catch (error: any) {
      if (error.name === "AbortError") {
        return;
      }

      console.error("Error generating Q&A:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to generate Q&A. Please try again.",
        messages: [
          {
            id: "error",
            type: "error",
            content:
              error.message || "Failed to generate Q&A. Please try again.",
            timestamp: Date.now(),
          },
        ],
      }));
    }
  };

  // Copy all Q&A to clipboard
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

  // Ask custom question
  const askCustomQuestion = async (question: string): Promise<void> => {
    if (!state.isFeatureEnabled || !question.trim() || state.isLoading) {
      return;
    }

    const userQuestionId = `user_q_${Date.now()}`;
    const loadingAnswerId = `loading_a_${Date.now()}`;

    // Add user question to chat
    setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: userQuestionId,
          type: "user-question",
          content: question.trim(),
          timestamp: Date.now(),
          isUserGenerated: true,
        },
        {
          id: loadingAnswerId,
          type: "loading",
          content: "Thinking...",
          timestamp: Date.now() + 100,
        },
      ],
      isLoading: true,
    }));

    try {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      const response = await fetch("/api/qa_custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
          blogContent: content,
          title,
          description,
          author,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.answer) {
        throw new Error("No answer received");
      }

      // Replace loading message with answer
      setState((prev) => ({
        ...prev,
        messages: prev.messages.map((msg) =>
          msg.id === loadingAnswerId
            ? {
                id: `answer_${Date.now()}`,
                type: "answer",
                content: data.answer,
                timestamp: Date.now(),
                isUserGenerated: true,
              }
            : msg
        ),
        isLoading: false,
      }));
    } catch (error: any) {
      if (error.name === "AbortError") {
        return;
      }

      console.error("Error answering custom question:", error);

      // Replace loading message with error
      setState((prev) => ({
        ...prev,
        messages: prev.messages.map((msg) =>
          msg.id === loadingAnswerId
            ? {
                id: `error_${Date.now()}`,
                type: "error",
                content:
                  error.message ||
                  "Failed to answer question. Please try again.",
                timestamp: Date.now(),
                isUserGenerated: true,
              }
            : msg
        ),
        isLoading: false,
      }));
    }
  };

  // Clear chat and regenerate
  const regenerate = async (): Promise<void> => {
    const cacheKey = generateCacheKey(content);
    localStorage.removeItem(cacheKey);

    setState((prev) => ({
      ...prev,
      messages: [],
      qaItems: [],
      hasGenerated: false,
      error: null,
    }));

    await generateQA();
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
    regenerate,
    askCustomQuestion,
  };
}
