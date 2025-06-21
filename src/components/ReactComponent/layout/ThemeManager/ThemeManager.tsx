import React, { useState } from "react";
import { useTheme } from "../../../../hooks/useTheme";
import type { ThemeName } from "../../../../config/theme/colors";

interface ThemeManagerProps {
  className?: string;
  showLabel?: boolean;
}

const themeOptions: { value: ThemeName; label: string; preview: string[] }[] = [
  {
    value: "tokyo-night",
    label: "Tokyo Night",
    preview: ["#7aa2f7", "#bb9af7", "#9ece6a"],
  },
  {
    value: "cyberpunk",
    label: "Cyberpunk",
    preview: ["#ff0080", "#00ff80", "#8000ff"],
  },
  {
    value: "ocean",
    label: "Ocean (Coming Soon)",
    preview: ["#4a90e2", "#6bb6ff", "#87ceeb"],
  },
  {
    value: "forest",
    label: "Forest (Coming Soon)",
    preview: ["#228b22", "#32cd32", "#90ee90"],
  },
];

export default function ThemeManager({
  className = "",
  showLabel = true,
}: ThemeManagerProps) {
  const { currentTheme, switchTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSwitch = (theme: ThemeName) => {
    switchTheme(theme);
    setIsOpen(false);
  };

  const currentThemeData = themeOptions.find(
    (theme) => theme.value === currentTheme
  );

  return (
    <div className={`relative ${className}`}>
      {/* Theme Selector */}
      <div className="flex items-center gap-3">
        {showLabel && (
          <span className="text-theme-secondary text-sm font-medium">
            Theme:
          </span>
        )}

        {/* Current Theme Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-theme-card border border-theme-secondary
                     hover:border-theme-accent transition-all duration-300
                     backdrop-blur-md"
        >
          {/* Theme Preview Colors */}
          <div className="flex gap-1">
            {currentThemeData?.preview.map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border border-theme-secondary"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Theme Name */}
          <span className="text-theme-primary text-sm font-medium">
            {currentThemeData?.label}
          </span>

          {/* Dropdown Arrow */}
          <svg
            className={`w-4 h-4 text-theme-muted transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl bg-theme-card border border-theme-secondary
                     hover:border-theme-accent transition-all duration-300
                     backdrop-blur-md group"
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <svg
              className="w-4 h-4 text-theme-accent"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-theme-accent"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      {/* Theme Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div
            className="absolute top-full left-0 mt-2 w-64 z-50
                          bg-theme-card border border-theme-secondary rounded-xl
                          backdrop-blur-md shadow-xl"
          >
            <div className="p-2">
              <div className="text-theme-secondary text-xs font-medium mb-2 px-2">
                Choose Theme
              </div>

              {themeOptions.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => handleThemeSwitch(theme.value)}
                  disabled={theme.value === "ocean" || theme.value === "forest"}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg
                             transition-all duration-200 text-left
                             ${
                               currentTheme === theme.value
                                 ? "bg-theme-hover border-theme-accent"
                                 : "hover:bg-theme-hover border-transparent"
                             }
                             ${
                               theme.value === "ocean" ||
                               theme.value === "forest"
                                 ? "opacity-50 cursor-not-allowed"
                                 : "cursor-pointer"
                             }
                             border`}
                >
                  {/* Theme Preview */}
                  <div className="flex gap-1">
                    {theme.preview.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-theme-secondary"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Theme Info */}
                  <div className="flex-1">
                    <div className="text-theme-primary text-sm font-medium">
                      {theme.label}
                    </div>
                    {currentTheme === theme.value && (
                      <div className="text-theme-accent text-xs">
                        Currently active
                      </div>
                    )}
                  </div>

                  {/* Selected Indicator */}
                  {currentTheme === theme.value && (
                    <div className="w-2 h-2 bg-theme-accent rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-theme-secondary p-3">
              <div className="text-theme-muted text-xs">
                💡 More themes coming soon! You can create custom themes in{" "}
                <code className="text-theme-accent">
                  src/config/theme/colors.ts
                </code>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
