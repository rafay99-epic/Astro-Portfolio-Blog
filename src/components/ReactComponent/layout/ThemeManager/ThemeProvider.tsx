import React from "react";
import { ThemeContext, useThemeProvider } from "../../../../hooks/useTheme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Optimized Theme Provider component that wraps the theme context
 * This component handles the React Context Provider pattern properly
 */
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const themeValue = useThemeProvider();

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}
