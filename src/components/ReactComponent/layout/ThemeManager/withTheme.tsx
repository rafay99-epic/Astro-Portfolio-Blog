import React, { memo } from "react";
import { ThemeContext, useThemeProvider } from "../../../../hooks/useTheme";

/**
 * Theme Provider component optimized for React 19
 * Uses React.memo for component memoization
 */
const ThemeProvider = memo(function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeValue = useThemeProvider();

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
});

/**
 * Higher-Order Component that wraps a component with ThemeProvider
 * Optimized with React.memo for React 19 performance
 */
export function withTheme<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  // Memoize the wrapped component to prevent unnecessary re-renders
  const MemoizedComponent = memo(Component);

  const WrappedComponent = memo(function WrappedComponent(props: P) {
    return (
      <ThemeProvider>
        <MemoizedComponent {...props} />
      </ThemeProvider>
    );
  });

  WrappedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Simple wrapper component for inline usage
 * Memoized for React 19 performance
 */
interface ThemedWrapperProps {
  children: React.ReactNode;
}

export const ThemedWrapper = memo(function ThemedWrapper({
  children,
}: ThemedWrapperProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
});

export default ThemeProvider;
