import React, { memo } from "react";
import { motion } from "framer-motion";
import type { ViewMode, ViewOption } from "types/githubStatis";

interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const viewOptions: ViewOption[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
      </svg>
    ),
    description:
      "Comprehensive dashboard with detailed metrics and visualizations",
  },
  {
    id: "minimal",
    label: "Minimal",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    ),
    description: "Clean and simple view with essential stats",
  },
  {
    id: "classic",
    label: "Classic",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
      </svg>
    ),
    description: "Traditional layout with cards and language bar",
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description: "Developer-friendly terminal-style view",
  },
];

const ViewSwitcher = memo(function ViewSwitcher({
  currentView,
  onViewChange,
}: ViewSwitcherProps) {
  return (
    <div className="flex flex-col space-y-4 mb-8">
      <div className="flex justify-center space-x-2">
        {viewOptions.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => onViewChange(option.id)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
              currentView === option.id
                ? "bg-[#7aa2f7] text-white"
                : "bg-[#1a1b26] text-[#a9b1d6] hover:bg-[#7aa2f7]/10"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-current">{option.icon}</span>
            <span className="hidden md:inline">{option.label}</span>
          </motion.button>
        ))}
      </div>
      <motion.p
        key={currentView}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-sm text-[#a9b1d6]"
      >
        {viewOptions.find((opt) => opt.id === currentView)?.description}
      </motion.p>
    </div>
  );
});

export default ViewSwitcher;
