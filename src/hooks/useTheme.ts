import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
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
  undefined,
);

export function useThemeProvider() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("tokyo-night");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const updateTimeoutRef = useRef<number | undefined>(undefined);

  const colors = useMemo(() => getThemeColors(currentTheme), [currentTheme]);

  const updateCSSVariables = useCallback((palette: ColorPalette) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = window.setTimeout(() => {
      requestAnimationFrame(() => {
        const root = document.documentElement;
        const updates: [string, string][] = [
          ["--color-primary", palette.primary],
          ["--color-secondary", palette.secondary],
          ["--color-accent", palette.accent],

          ["--color-bg-primary", palette.background.primary],
          ["--color-bg-secondary", palette.background.secondary],
          ["--color-bg-tertiary", palette.background.tertiary],
          ["--color-bg-card", palette.background.card],
          ["--color-bg-overlay", palette.background.overlay],

          ["--color-text-primary", palette.text.primary],
          ["--color-text-secondary", palette.text.secondary],
          ["--color-text-muted", palette.text.muted],
          ["--color-text-accent", palette.text.accent],
          ["--color-text-inverse", palette.text.inverse],

          ["--color-border-primary", palette.border.primary],
          ["--color-border-secondary", palette.border.secondary],
          ["--color-border-accent", palette.border.accent],
          ["--color-border-hover", palette.border.hover],

          ["--color-success", palette.status.success],
          ["--color-warning", palette.status.warning],
          ["--color-error", palette.status.error],
          ["--color-info", palette.status.info],

          ["--color-hover", palette.interactive.hover],
          ["--color-focus", palette.interactive.focus],
          ["--color-active", palette.interactive.active],
          ["--color-disabled", palette.interactive.disabled],

          ["--gradient-primary", palette.gradients.primary],
          ["--gradient-secondary", palette.gradients.secondary],
          ["--gradient-accent", palette.gradients.accent],
          ["--gradient-rainbow", palette.gradients.rainbow],

          ["--color-twitter", palette.social.twitter],
          ["--color-facebook", palette.social.facebook],
          ["--color-linkedin", palette.social.linkedin],
          ["--color-whatsapp", palette.social.whatsapp],
          ["--color-github", palette.social.github],
          ["--color-youtube", palette.social.youtube],
          ["--color-upwork", palette.social.upwork],
        ];

        updates.forEach(([property, value]) => {
          root.style.setProperty(property, value);
        });
      });
    }, 16);
  }, []);

  useEffect(() => {
    let mounted = true;

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
            const prefersDark = window.matchMedia(
              "(prefers-color-scheme: dark)",
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

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(initializeTheme);
    } else {
      setTimeout(initializeTheme, 0);
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (isInitialized) {
      updateCSSVariables(colors);
    }
  }, [colors, updateCSSVariables, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      const saveTimeout = setTimeout(() => {
        try {
          localStorage.setItem("theme", currentTheme);
          localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
        } catch (error) {
          console.warn("Failed to save theme to localStorage:", error);
        }
      }, 100);

      return () => clearTimeout(saveTimeout);
    }
  }, [currentTheme, isDarkMode, isInitialized]);

  const switchTheme = useCallback((theme: ThemeName) => {
    setCurrentTheme(theme);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

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
    ],
  );
}

export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

export function useThemeColors() {
  const { colors } = useTheme();

  return useMemo(
    () => ({
      bgPrimary: colors.background.primary,
      bgSecondary: colors.background.secondary,
      bgCard: colors.background.card,

      textPrimary: colors.text.primary,
      textSecondary: colors.text.secondary,
      textMuted: colors.text.muted,

      ...colors,
    }),
    [colors],
  );
}

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
    [],
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
    [colors],
  );

  return useMemo(
    () => ({
      classes,
      styles,
      isDarkMode,
    }),
    [classes, styles, isDarkMode],
  );
}
