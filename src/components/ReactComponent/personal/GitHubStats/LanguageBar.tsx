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
    <div className="space-y-3 lg:space-y-4">
      {/* Progress Bar */}
      <div className="flex h-2.5 lg:h-3 rounded-full overflow-hidden bg-[#1a1b26]">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            className="h-full"
            style={{ backgroundColor: lang.color }}
            initial={{ width: 0 }}
            animate={{ width: `${lang.percentage}%` }}
            transition={{
              delay: index * 0.03,
              duration: 0.4,
              ease: "easeOut",
            }}
          />
        ))}
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
              style={{ color: "#a9b1d6" }}
            >
              {lang.name}
            </span>
            <span
              className="text-xs lg:text-sm font-medium flex-shrink-0"
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
