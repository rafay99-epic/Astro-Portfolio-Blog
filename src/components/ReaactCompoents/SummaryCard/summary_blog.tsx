import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SummaryCardProps = {
  title: string;
  description: string;
  author: string;
  content: string;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  description,
  author,
  content,
}) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const blogContent = `Title: ${title}\nAuthor: ${author}\nDescription: ${description}\n\nContent:\n${content}`;
  const cacheKey = `ai-summary-${title}-${author}`;
  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setSummary(cached);
      return;
    }

    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/ai_summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blogContent }),
        });

        if (!res.ok) throw new Error("Failed to fetch summary");

        const data = await res.json();
        setSummary(data.summary);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              summary: data.summary,
              timestamp: Date.now(),
            })
          );
        } catch (e) {
          console.warn("Could not save summary to localStorage:", e);
        }

        localStorage.setItem(cacheKey, data.summary);
      } catch (err: any) {
        console.error(err);
        setError("Error fetching summary");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [blogContent, cacheKey]);

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
              <p className="text-sm text-[#a9b1d6] italic animate-pulse">
                Generating summary...
              </p>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {summary && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.015 }}
                className="text-lg leading-relaxed bg-[#2e3440] p-4 rounded-lg"
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
