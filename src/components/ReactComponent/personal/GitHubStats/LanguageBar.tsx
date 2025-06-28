import React, { useMemo } from "react";
import { memo } from "react";
import { motion } from "framer-motion";
import type { LanguageBarProps } from "types/githubStatis";

const MAX_DISPLAY_LANGUAGES = 6;

const LanguageBar = memo(function LanguageBar({ languages }: LanguageBarProps) {
  // Memoize the display languages and calculations
  const { displayLanguages, totalPercentage } = useMemo(() => {
    const sorted = [...languages].sort((a, b) => b.percentage - a.percentage);
    const display = sorted.slice(0, MAX_DISPLAY_LANGUAGES);
    const total = display.reduce((sum, lang) => sum + lang.percentage, 0);
    return { displayLanguages: display, totalPercentage: total };
  }, [languages]);

  // Memoize style objects
  const languageNameStyle = useMemo(() => ({ color: "#a9b1d6" }), []);
  const percentageStyle = useMemo(() => ({ color: "#c0caf5" }), []);

  return (
    <div className="space-y-3 lg:space-y-4">
      {/* Progress Bar */}
      <div className="flex h-2.5 lg:h-3 rounded-full overflow-hidden bg-[#1a1b26]">
        {displayLanguages.map((lang, index) => {
          const adjustedPercentage = (lang.percentage / totalPercentage) * 100;
          return (
            <motion.div
              key={lang.name}
              className="h-full"
              style={{ backgroundColor: lang.color }}
              initial={{ width: 0 }}
              animate={{ width: `${adjustedPercentage}%` }}
              transition={{
                delay: index * 0.03,
                duration: 0.4,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>

      {/* Language List */}
      <div className="grid grid-cols-2 gap-1.5 lg:gap-2">
        {displayLanguages.map((lang, index) => (
          <motion.div
            key={lang.name}
            className="flex items-center space-x-2 min-w-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.03 + 0.2, duration: 0.2 }}
          >
            <div
              className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: lang.color }}
            />
            <span
              className="text-xs lg:text-sm truncate flex-1"
              style={languageNameStyle}
            >
              {lang.name}
            </span>
            <span
              className="text-xs lg:text-sm font-medium flex-shrink-0"
              style={percentageStyle}
            >
              {lang.percentage.toFixed(1)}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

export default LanguageBar;
