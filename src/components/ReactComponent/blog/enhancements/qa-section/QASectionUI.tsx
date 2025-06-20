import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface QAItem {
  question: string;
  answer: string;
}

interface QASectionUIProps {
  qaItems: QAItem[];
  isLoading: boolean;
  error: string | null;
  isFeatureEnabled: boolean;
  hasGenerated: boolean;
  generateQA: () => Promise<void>;
  copyToClipboard: () => Promise<boolean>;
}

export function QASectionUI({
  qaItems,
  isLoading,
  error,
  isFeatureEnabled,
  hasGenerated,
  generateQA,
  copyToClipboard,
}: QASectionUIProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const handleCopy = async () => {
    const success = await copyToClipboard();
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getStatusColor = () => {
    if (!isFeatureEnabled) return "var(--gray-400)";
    if (error) return "var(--red-400)";
    if (isLoading) return "var(--yellow-400)";
    if (hasGenerated && qaItems.length > 0) return "var(--green-400)";
    return "var(--blue-400)";
  };

  const getStatusAnimation = () => {
    if (isLoading || (error && !error.includes("disabled"))) {
      return "animate-pulse";
    }
    return "";
  };

  if (!isFeatureEnabled) {
    return (
      <div className="relative rounded-2xl bg-gradient-to-br from-[var(--glass-bg)] to-[var(--glass-bg-secondary)] border border-[var(--glass-border)] backdrop-blur-md shadow-[var(--glass-shadow)] p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getStatusColor() }}
          />
          <h3 className="text-lg font-semibold text-[var(--text-light)]">
            Q&A Section
          </h3>
        </div>
        <p className="text-[var(--text-secondary)] text-sm">
          Q&A feature is currently under development.
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-[var(--glass-bg)] to-[var(--glass-bg-secondary)] border border-[var(--glass-border)] backdrop-blur-md shadow-[var(--glass-shadow)] p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${getStatusAnimation()}`}
            style={{ backgroundColor: getStatusColor() }}
          />
          <h3 className="text-lg font-semibold text-[var(--text-light)]">
            Frequently Asked Questions
          </h3>
        </div>

        {!hasGenerated && !isLoading && !error && (
          <button
            onClick={generateQA}
            className="px-4 py-2 bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-600)] text-white rounded-lg hover:from-[var(--primary-500)] hover:to-[var(--primary-700)] transition-all duration-200 text-sm font-medium shadow-lg"
          >
            Generate Q&A
          </button>
        )}

        {hasGenerated && qaItems.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-gradient-to-r from-[var(--glass-bg)] to-[var(--glass-bg-secondary)] border border-[var(--glass-border)] backdrop-blur-sm text-[var(--text-light)] rounded-lg hover:border-[var(--primary-400)] transition-all duration-200 text-sm font-medium shadow-md"
              title="Copy Q&A"
            >
              {copySuccess ? "Copied!" : "📋"}
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center gap-3 py-4">
          <div className="w-5 h-5 border-2 border-[var(--primary-400)] border-t-transparent rounded-full animate-spin" />
          <span className="text-[var(--text-secondary)] text-sm">
            Generating Q&A...
          </span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            <span className="text-red-700 dark:text-red-300 text-sm">
              {error}
            </span>
          </div>
        </div>
      )}

      {/* Q&A Content */}
      {hasGenerated && qaItems.length > 0 && (
        <div className="space-y-4">
          <p className="text-[var(--text-secondary)] text-sm mb-4">
            Here are some frequently asked questions about this blog post:
          </p>

          {qaItems.map((item, index) => (
            <div
              key={index}
              className="border border-[var(--glass-border)] rounded-lg bg-gradient-to-br from-[var(--glass-bg)] to-[var(--glass-bg-secondary)] backdrop-blur-sm overflow-hidden"
            >
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--glass-bg-secondary)] transition-colors duration-200"
              >
                <span className="font-medium text-[var(--text-light)] pr-4">
                  Q{index + 1}: {item.question}
                </span>
                <span className="text-[var(--text-secondary)] text-xl flex-shrink-0">
                  {expandedItems.includes(index) ? "−" : "+"}
                </span>
              </button>

              {expandedItems.includes(index) && (
                <div className="border-t border-[var(--glass-border)] p-4 bg-[var(--glass-bg-secondary)]">
                  <div className="prose prose-sm max-w-none dark:prose-invert text-[var(--text-secondary)]">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-xl font-bold text-[var(--text-light)] mb-4">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-lg font-semibold text-[var(--text-light)] mb-3">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-base font-medium text-[var(--text-light)] mb-2">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-[var(--text-secondary)] mb-3 leading-relaxed">
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
                          <code className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded px-2 py-1 text-sm font-mono text-[var(--text-light)]">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg p-4 overflow-x-auto">
                            {children}
                          </pre>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-3">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside space-y-1 text-[var(--text-secondary)] mb-3">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-[var(--text-secondary)]">
                            {children}
                          </li>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-[var(--primary-400)] pl-4 italic text-[var(--text-secondary)] bg-[var(--glass-bg)] rounded-r-lg py-2">
                            {children}
                          </blockquote>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className="text-[var(--primary-400)] hover:text-[var(--primary-600)] underline transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {item.answer}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {hasGenerated && qaItems.length === 0 && !isLoading && !error && (
        <p className="text-[var(--text-secondary)] text-sm">
          No Q&A items were generated for this content.
        </p>
      )}
    </div>
  );
}
