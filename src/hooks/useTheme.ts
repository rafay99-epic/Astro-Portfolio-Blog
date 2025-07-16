import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
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
  isInitialized: boolean;
}

interface ThemeContextType extends UseThemeReturn {}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/**
 * Optimized Theme Hook with centralized state management
 * Prevents multiple localStorage reads and unnecessary re-renders
 */
export function useThemeProvider() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("tokyo-night");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const updateTimeoutRef = useRef<number | undefined>(undefined);

  // Memoized theme colors to prevent recalculation on every render
  const colors = useMemo(() => getThemeColors(currentTheme), [currentTheme]);

  // Debounced CSS variable update function
  const updateCSSVariables = useCallback((palette: ColorPalette) => {
    // Clear any pending updates
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Batch CSS updates using requestAnimationFrame for better performance
    updateTimeoutRef.current = window.setTimeout(() => {
      requestAnimationFrame(() => {
        const root = document.documentElement;
        const updates: [string, string][] = [
          // Primary Colors
          ["--color-primary", palette.primary],
          ["--color-secondary", palette.secondary],
          ["--color-accent", palette.accent],

          // Background Colors
          ["--color-bg-primary", palette.background.primary],
          ["--color-bg-secondary", palette.background.secondary],
          ["--color-bg-tertiary", palette.background.tertiary],
          ["--color-bg-card", palette.background.card],
          ["--color-bg-overlay", palette.background.overlay],

          // Text Colors
          ["--color-text-primary", palette.text.primary],
          ["--color-text-secondary", palette.text.secondary],
          ["--color-text-muted", palette.text.muted],
          ["--color-text-accent", palette.text.accent],
          ["--color-text-inverse", palette.text.inverse],

          // Border Colors
          ["--color-border-primary", palette.border.primary],
          ["--color-border-secondary", palette.border.secondary],
          ["--color-border-accent", palette.border.accent],
          ["--color-border-hover", palette.border.hover],

          // Status Colors
          ["--color-success", palette.status.success],
          ["--color-warning", palette.status.warning],
          ["--color-error", palette.status.error],
          ["--color-info", palette.status.info],

          // Interactive Colors
          ["--color-hover", palette.interactive.hover],
          ["--color-focus", palette.interactive.focus],
          ["--color-active", palette.interactive.active],
          ["--color-disabled", palette.interactive.disabled],

          // Gradients
          ["--gradient-primary", palette.gradients.primary],
          ["--gradient-secondary", palette.gradients.secondary],
          ["--gradient-accent", palette.gradients.accent],
          ["--gradient-rainbow", palette.gradients.rainbow],

          // Social Colors
          ["--color-twitter", palette.social.twitter],
          ["--color-facebook", palette.social.facebook],
          ["--color-linkedin", palette.social.linkedin],
          ["--color-whatsapp", palette.social.whatsapp],
          ["--color-github", palette.social.github],
          ["--color-youtube", palette.social.youtube],
          ["--color-upwork", palette.social.upwork],
        ];

        // Batch apply all CSS custom properties
        updates.forEach(([property, value]) => {
          root.style.setProperty(property, value);
        });
      });
    }, 16); // 60fps = ~16ms
  }, []);

  // Initialize theme from localStorage or system preference (only once)
  useEffect(() => {
    let mounted = true;

    // Use requestIdleCallback for non-critical initialization
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem("theme") as ThemeName;
        const savedDarkMode = localStorage.getItem("darkMode");

        if (mounted) {
          if (
            savedTheme &&
            ["tokyo-night", "cyberpunk", "ocean", "forest"].includes(savedTheme)
          ) {
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

          setIsInitialized(true);
        }
      } catch (error) {
        console.warn("Failed to initialize theme from localStorage:", error);
        if (mounted) {
          setIsInitialized(true);
        }
      }
    };

    // Use requestIdleCallback if available, otherwise use setTimeout
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(initializeTheme);
    } else {
      setTimeout(initializeTheme, 0);
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Update CSS variables when theme changes (debounced)
  useEffect(() => {
    if (isInitialized) {
      updateCSSVariables(colors);
    }
  }, [colors, updateCSSVariables, isInitialized]);

  // Save to localStorage (debounced)
  useEffect(() => {
    if (isInitialized) {
      const saveTimeout = setTimeout(() => {
        try {
          localStorage.setItem("theme", currentTheme);
          localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
        } catch (error) {
          console.warn("Failed to save theme to localStorage:", error);
        }
      }, 100); // Debounce localStorage writes

      return () => clearTimeout(saveTimeout);
    }
  }, [currentTheme, isDarkMode, isInitialized]);

  // Memoized switch theme function
  const switchTheme = useCallback((theme: ThemeName) => {
    setCurrentTheme(theme);
  }, []);

  // Memoized toggle dark mode function
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  // Return memoized theme state
  return useMemo(
    () => ({
      currentTheme,
      colors,
      switchTheme,
      isDarkMode,
      toggleDarkMode,
      isInitialized,
    }),
    [
      currentTheme,
      colors,
      switchTheme,
      isDarkMode,
      toggleDarkMode,
      isInitialized,
    ]
  );
}

/**
 * Optimized hook for theme management
 * Uses centralized context instead of individual state instances
 */
export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

/**
 * Optimized hook to get specific color values
 * Memoized to prevent unnecessary recalculations
 */
export function useThemeColors() {
  const { colors } = useTheme();

  return useMemo(
    () => ({
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
    }),
    [colors]
  );
}

/**
 * Optimized hook for theme-aware styling
 * Memoized style functions and class helpers
 */
export function useThemeStyles() {
  const { colors, isDarkMode } = useTheme();

  const classes = useMemo(
    () => ({
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
    }),
    []
  );

  const styles = useMemo(
    () => ({
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
    }),
    [colors]
  );

  return useMemo(
    () => ({
      classes,
      styles,
      isDarkMode,
    }),
    [classes, styles, isDarkMode]
  );
}
