import { useState, useEffect } from "react";
import {
  colors,
  getThemeColors,
  type ThemeName,
  type ColorPalette,
} from "../config/theme/colors";

export interface UseThemeReturn {
  currentTheme: ThemeName;
  colors: ColorPalette;
  switchTheme: (theme: ThemeName) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

/**
 * Custom hook for theme management
 * Provides access to current theme colors and switching capabilities
 */
export function useTheme(): UseThemeReturn {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("tokyo-night");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeName;
    const savedDarkMode = localStorage.getItem("darkMode");

    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }

    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Update CSS variables when theme changes
  useEffect(() => {
    const themeColors = getThemeColors(currentTheme);
    updateCSSVariables(themeColors);

    // Save to localStorage
    localStorage.setItem("theme", currentTheme);
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [currentTheme, isDarkMode]);

  const switchTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return {
    currentTheme,
    colors: getThemeColors(currentTheme),
    switchTheme,
    isDarkMode,
    toggleDarkMode,
  };
}

/**
 * Update CSS custom properties with theme colors
 */
function updateCSSVariables(palette: ColorPalette) {
  const root = document.documentElement;

  // Primary Colors
  root.style.setProperty("--color-primary", palette.primary);
  root.style.setProperty("--color-secondary", palette.secondary);
  root.style.setProperty("--color-accent", palette.accent);

  // Background Colors
  root.style.setProperty("--color-bg-primary", palette.background.primary);
  root.style.setProperty("--color-bg-secondary", palette.background.secondary);
  root.style.setProperty("--color-bg-tertiary", palette.background.tertiary);
  root.style.setProperty("--color-bg-card", palette.background.card);
  root.style.setProperty("--color-bg-overlay", palette.background.overlay);

  // Text Colors
  root.style.setProperty("--color-text-primary", palette.text.primary);
  root.style.setProperty("--color-text-secondary", palette.text.secondary);
  root.style.setProperty("--color-text-muted", palette.text.muted);
  root.style.setProperty("--color-text-accent", palette.text.accent);
  root.style.setProperty("--color-text-inverse", palette.text.inverse);

  // Border Colors
  root.style.setProperty("--color-border-primary", palette.border.primary);
  root.style.setProperty("--color-border-secondary", palette.border.secondary);
  root.style.setProperty("--color-border-accent", palette.border.accent);
  root.style.setProperty("--color-border-hover", palette.border.hover);

  // Status Colors
  root.style.setProperty("--color-success", palette.status.success);
  root.style.setProperty("--color-warning", palette.status.warning);
  root.style.setProperty("--color-error", palette.status.error);
  root.style.setProperty("--color-info", palette.status.info);

  // Interactive Colors
  root.style.setProperty("--color-hover", palette.interactive.hover);
  root.style.setProperty("--color-focus", palette.interactive.focus);
  root.style.setProperty("--color-active", palette.interactive.active);
  root.style.setProperty("--color-disabled", palette.interactive.disabled);

  // Gradients
  root.style.setProperty("--gradient-primary", palette.gradients.primary);
  root.style.setProperty("--gradient-secondary", palette.gradients.secondary);
  root.style.setProperty("--gradient-accent", palette.gradients.accent);
  root.style.setProperty("--gradient-rainbow", palette.gradients.rainbow);

  // Social Colors
  root.style.setProperty("--color-twitter", palette.social.twitter);
  root.style.setProperty("--color-facebook", palette.social.facebook);
  root.style.setProperty("--color-linkedin", palette.social.linkedin);
  root.style.setProperty("--color-whatsapp", palette.social.whatsapp);
  root.style.setProperty("--color-github", palette.social.github);
  root.style.setProperty("--color-youtube", palette.social.youtube);
  root.style.setProperty("--color-upwork", palette.social.upwork);
}

/**
 * Hook to get specific color values
 * Useful for inline styles or JS-based styling
 */
export function useThemeColors() {
  const { colors } = useTheme();

  return {
    // Quick access to commonly used colors (aliased for convenience)
    bgPrimary: colors.background.primary,
    bgSecondary: colors.background.secondary,
    bgCard: colors.background.card,

    // Text colors (aliased for convenience)
    textPrimary: colors.text.primary,
    textSecondary: colors.text.secondary,
    textMuted: colors.text.muted,

    // All colors (includes primary, secondary, accent, etc.)
    ...colors,
  };
}

/**
 * Hook for theme-aware styling
 * Returns className helpers and inline style functions
 */
export function useThemeStyles() {
  const { colors, isDarkMode } = useTheme();

  return {
    // CSS class helpers
    classes: {
      card: "bg-theme-card border-theme-secondary backdrop-blur-md",
      button: {
        primary:
          "bg-gradient-primary text-white hover:shadow-lg transition-all",
        secondary:
          "bg-transparent border-theme-accent text-theme-accent hover:bg-theme-hover",
      },
      text: {
        primary: "text-theme-primary",
        secondary: "text-theme-secondary",
        muted: "text-theme-muted",
        accent: "text-theme-accent",
      },
    },

    // Inline style functions
    styles: {
      card: (opacity = 0.4) => ({
        background: `${colors.background.card}${Math.round(opacity * 255)
          .toString(16)
          .padStart(2, "0")}`,
        backdropFilter: "blur(20px)",
        border: `1px solid ${colors.border.secondary}`,
      }),

      gradient: (type: "primary" | "secondary" | "accent" = "primary") => ({
        background: colors.gradients[type],
      }),

      glassmorphism: (opacity = 0.1) => ({
        background: `${colors.background.secondary}${Math.round(opacity * 255)
          .toString(16)
          .padStart(2, "0")}`,
        backdropFilter: "blur(20px) saturate(180%)",
        border: `1px solid ${colors.border.secondary}`,
      }),
    },

    // Theme state
    isDarkMode,
  };
}
