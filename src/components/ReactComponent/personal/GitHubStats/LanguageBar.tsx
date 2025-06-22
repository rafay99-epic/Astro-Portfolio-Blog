import React, { useMemo } from "react";
import { memo } from "react";
import { motion } from "framer-motion";

interface Language {
  name: string;
  percentage: number;
  color: string;
}

interface LanguageBarProps {
  languages: Language[];
}

const LanguageBar = memo(function LanguageBar({ languages }: LanguageBarProps) {
  const displayLanguages = useMemo(() => languages.slice(0, 6), [languages]);

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="flex h-3 rounded-full overflow-hidden bg-[#1a1b26]">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            className="h-full will-change-transform"
            style={{ backgroundColor: lang.color }}
            initial={{ width: 0 }}
            animate={{ width: `${lang.percentage}%` }}
            transition={{
              delay: index * 0.05,
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Language List */}
      <div className="grid grid-cols-2 gap-2">
        {displayLanguages.map((lang, index) => (
          <motion.div
            key={lang.name}
            className="flex items-center space-x-2 min-w-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.3, duration: 0.3 }}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: lang.color }}
            />
            <span
              className="text-sm truncate flex-1"
              style={{ color: "#a9b1d6" }}
            >
              {lang.name}
            </span>
            <span
              className="text-sm font-medium flex-shrink-0"
              style={{ color: "#c0caf5" }}
            >
              {lang.percentage}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

export default LanguageBar;
