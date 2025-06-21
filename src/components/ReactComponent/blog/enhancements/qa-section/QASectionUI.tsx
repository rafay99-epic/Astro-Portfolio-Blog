import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

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

  const getStatusIndicator = () => {
    if (!isFeatureEnabled) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#565f89] rounded-full" />
          <span className="text-xs text-[#565f89]">Disabled</span>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#f7768e] rounded-full animate-pulse" />
          <span className="text-xs text-[#f7768e]">Error</span>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#9ece6a] rounded-full animate-pulse" />
          <span className="text-xs text-[#a9b1d6]">Generating...</span>
        </div>
      );
    }
    if (hasGenerated && qaItems.length > 0) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#9ece6a] rounded-full" />
          <span className="text-xs text-[#a9b1d6]">Ready</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-[#7aa2f7] rounded-full" />
        <span className="text-xs text-[#a9b1d6]">Ready to generate</span>
      </div>
    );
  };

  if (!isFeatureEnabled) {
    return (
      <div className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl shadow-lg p-6 my-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-xl flex items-center justify-center">
            <span className="text-white text-sm">❓</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              <span className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] bg-clip-text text-transparent">
                Q&A Section
              </span>
            </h3>
            <div className="flex items-center mt-1">{getStatusIndicator()}</div>
          </div>
        </div>
        <p className="text-[#a9b1d6] text-sm">
          Q&A feature is currently under development.
        </p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl shadow-lg p-6 my-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">❓</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              <span className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h3>
            <div className="flex items-center mt-1">{getStatusIndicator()}</div>
          </div>
        </div>

        {!hasGenerated && !isLoading && !error && (
          <button
            onClick={generateQA}
            className="px-4 py-2 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white rounded-lg 
                     hover:from-[#6a8ef7] hover:to-[#ab8af7] transition-all duration-200 text-sm font-medium 
                     shadow-lg border border-[#7aa2f7]/30"
          >
            Generate Q&A
          </button>
        )}

        {hasGenerated && qaItems.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-3 py-2 bg-[#2d3142]/60 hover:bg-[#2d3142] 
                       border border-[#565f89]/30 rounded-lg transition-all duration-200 
                       text-xs font-medium text-[#a9b1d6] hover:text-[#c0caf5]"
              title="Copy all Q&A"
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
                    className="w-3.5 h-3.5"
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
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-[#565f89]/30 rounded-full"></div>
            <div className="w-12 h-12 border-4 border-[#7aa2f7] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-sm text-[#c0caf5] mt-4 font-medium">
            🤖 Generating Q&A from article content...
          </p>
          <p className="text-xs text-[#a9b1d6] mt-1">
            This may take a few seconds
          </p>
        </div>
      )}

      {error && (
        <div className="bg-[#24283b]/40 border border-[#f7768e]/30 rounded-xl p-4 backdrop-blur-xl">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-[#f7768e] to-[#ff9e64] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">⚠️</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#f7768e] mb-2">{error}</p>
              <button
                onClick={generateQA}
                className="px-4 py-2 text-sm bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white rounded-lg 
                         hover:from-[#6a8ef7] hover:to-[#ab8af7] transition-all duration-200 font-medium 
                         shadow-lg border border-[#7aa2f7]/30"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {hasGenerated && qaItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 bg-[#9ece6a] rounded-full animate-pulse"></div>
            <p className="text-[#a9b1d6] text-sm">
              Here are some frequently asked questions about this blog post:
            </p>
          </div>

          <AnimatePresence>
            {qaItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-[#565f89]/30 rounded-2xl bg-[#24283b]/40 backdrop-blur-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-[#2d3142]/60 
                           transition-colors duration-200 group"
                >
                  <div className="flex items-start gap-3 flex-1 pr-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-medium">Q</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#c0caf5] text-sm">
                        {item.question}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#565f89]">
                          Question {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedItems.includes(index) ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-[#a9b1d6] group-hover:text-[#7aa2f7] transition-colors flex-shrink-0"
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
                </button>

                <AnimatePresence>
                  {expandedItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#565f89]/20 p-4 bg-[#2d3142]/30">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-gradient-to-r from-[#9ece6a] to-[#73daca] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-medium">
                              A
                            </span>
                          </div>
                          <div className="flex-1 prose prose-sm max-w-none dark:prose-invert">
                            try{" "}
                            {
                              <ReactMarkdown
                                components={{
                                  h1: ({ children }) => (
                                    <h1 className="text-xl font-bold text-[#c0caf5] mb-4">
                                      {children}
                                    </h1>
                                  ),
                                  h2: ({ children }) => (
                                    <h2 className="text-lg font-semibold text-[#c0caf5] mb-3">
                                      {children}
                                    </h2>
                                  ),
                                  h3: ({ children }) => (
                                    <h3 className="text-base font-medium text-[#c0caf5] mb-2">
                                      {children}
                                    </h3>
                                  ),
                                  p: ({ children }) => (
                                    <p className="text-[#c0caf5] mb-3 leading-relaxed text-sm">
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
                                    <code className="px-2 py-1 bg-[#1a1b26] border border-[#565f89]/30 rounded text-sm font-mono text-[#9ece6a]">
                                      {children}
                                    </code>
                                  ),
                                  pre: ({ children }) => (
                                    <pre className="bg-[#1a1b26] border border-[#565f89]/30 rounded-lg p-4 overflow-x-auto">
                                      {children}
                                    </pre>
                                  ),
                                  ul: ({ children }) => (
                                    <ul className="list-disc list-inside space-y-1 text-[#c0caf5] mb-3 ml-4">
                                      {children}
                                    </ul>
                                  ),
                                  ol: ({ children }) => (
                                    <ol className="list-decimal list-inside space-y-1 text-[#c0caf5] mb-3 ml-4">
                                      {children}
                                    </ol>
                                  ),
                                  li: ({ children }) => (
                                    <li className="text-[#c0caf5] marker:text-[#7aa2f7] text-sm">
                                      {children}
                                    </li>
                                  ),
                                  blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-[#7aa2f7]/50 pl-4 italic text-[#a9b1d6] bg-[#1a1b26]/50 py-3 rounded-r-lg my-4">
                                      {children}
                                    </blockquote>
                                  ),
                                  a: ({ href, children }) => (
                                    <a
                                      href={href}
                                      className="text-[#7aa2f7] hover:text-[#bb9af7] underline transition-colors duration-200"
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
                            }{" "}
                            catch (error){" "}
                            {
                              <p className="text-[#f7768e] text-sm">
                                Error rendering answer content
                              </p>
                            }
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {hasGenerated && qaItems.length === 0 && !isLoading && !error && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🤷</span>
          </div>
          <p className="text-[#a9b1d6] text-sm">
            No Q&A items were generated for this content.
          </p>
        </div>
      )}
    </div>
  );
}
