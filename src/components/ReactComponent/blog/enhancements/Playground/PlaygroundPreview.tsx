import React, { useState, useEffect, useRef, useMemo } from "react";
import { transform } from "sucrase";
import * as ReactNative from "react-native-web";
import { motion, AnimatePresence } from "framer-motion";

interface PlaygroundPreviewProps {
  code: string;
  language?: string;
}

const PlaygroundPreview = ({ code, language = "typescript" }: PlaygroundPreviewProps) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dartSyncKey, setDartSyncKey] = useState(0);
  const [activeDartCode, setActiveDartCode] = useState(code);

  // Initialize activeDartCode on mount if it's empty, or keeping it independent
  // We don't want to sync automatically on code change to prevent reload loops
  
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load iframe when visible
  useEffect(() => {
    if (language !== "dart") return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" } // Load slightly before view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [language]);

  // Encode code for DartPad
  const dartPadUrl = useMemo(() => {
    if (language !== "dart") return "";
    const encoded = encodeURIComponent(activeDartCode);
    // split=0 maximizes the output panel, hiding the internal editor
    return `https://dartpad.dev/embed-inline.html?id=&split=0&theme=dark&run=true&code=${encoded}&key=${dartSyncKey}`;
  }, [activeDartCode, language, dartSyncKey]);

  useEffect(() => {
    // ... rest of React logic
    if (language === "dart") {
      setComponent(null);
      setError(null);
      return;
    }
    // ...

    const timer = setTimeout(() => {
      try {
        // Transpile TSX/JSX to JS, including imports transform
        const compiled = transform(code, {
          transforms: ["typescript", "jsx", "imports"],
          jsxRuntime: "classic",
        }).code;

        // Create a safe execution environment
        // We avoid destructuring scope into local variables to prevent collisions with user-defined variables
        const scope: any = {
          React,
          ...ReactNative,
          motion,
          AnimatePresence,
          require: (moduleName: string) => {
            if (moduleName === 'react') return React;
            if (moduleName === 'react-native') return ReactNative;
            if (moduleName === 'framer-motion') return { motion, AnimatePresence };
            throw new Error(`Module "${moduleName}" not found in playground scope.`);
          },
          exports: {},
          console: {
            log: (...args: any[]) => console.log("Playground:", ...args),
            error: (...args: any[]) => console.error("Playground Error:", ...args),
          },
        };

        // Execution wrapper that provides modules via require rather than locals
        const wrappedCode = `
          const require = scope.require;
          const exports = scope.exports;
          const React = scope.React;
          ${compiled}
          return exports.default || (typeof App !== 'undefined' ? App : null);
        `;

        const renderFunc = new Function("scope", wrappedCode);
        const ExecutedComponent = renderFunc(scope);

        if (ExecutedComponent && (typeof ExecutedComponent === 'function' || (typeof ExecutedComponent === 'object' && ExecutedComponent.$$typeof))) {
          setComponent(() => typeof ExecutedComponent === 'function' ? ExecutedComponent : () => ExecutedComponent);
          setError(null);
        } else {
          setError("No valid default export or 'App' component found. Make sure to export your component (e.g., 'export default function App() { ... }').");
        }
      } catch (err: any) {
        setError(err.message);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [code, language]);

  if (language === "dart") {
    return (
      <div 
        ref={containerRef}
        className="relative h-full flex flex-col overflow-hidden rounded-xl bg-[#1a1b26]"
      >
        <div className="flex items-center justify-between border-b border-[#414868]/30 bg-[#1f2335] px-4 py-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7aa2f7]">Live Dart Preview</span>
          <button 
            onClick={() => {
              setActiveDartCode(code);
              setDartSyncKey(k => k + 1);
            }}
            className="flex items-center gap-1.5 rounded bg-[#7aa2f7] px-3 py-1.5 text-[10px] font-bold text-[#1a1b26] transition-all hover:bg-[#7aa2f7]/90 shadow-lg shadow-[#7aa2f7]/20"
          >
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Run Code
          </button>
        </div>
        <div className="flex-1 bg-[#1a1b26]">
          {isVisible ? (
            <iframe
              src={dartPadUrl}
              className="w-full h-full border-0"
              title="DartPad Preview"
            />
          ) : (
             <div className="flex h-full items-center justify-center text-[#565f89]">
               Loading preview...
             </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col overflow-hidden rounded-xl bg-[#24283b]">
      <div className="flex items-center justify-between border-b border-[#414868]/30 bg-[#1f2335] px-4 py-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7aa2f7]">Live Preview</span>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#f7768e]/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#e0af68]/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#9ece6a]/50" />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center min-h-[300px]">
        {error ? (
          <div className="w-full rounded-lg border border-[#f7768e]/30 bg-[#f7768e]/10 p-4 font-mono text-xs text-[#f7768e]">
            <p className="mb-2 font-bold">⚠️ Transpilation Error:</p>
            <pre className="whitespace-pre-wrap">{error}</pre>
          </div>
        ) : Component ? (
          <ErrorBoundary>
            <div className="w-full h-full flex items-center justify-center">
                <Component />
            </div>
          </ErrorBoundary>
        ) : (
          <div className="flex flex-col items-center gap-3 text-[#565f89]">
             <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7aa2f7] border-t-transparent" />
             <span className="text-sm">Initializing preview...</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Error Boundary to catch runtime errors in the user's code
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full rounded-lg border border-[#f7768e]/30 bg-[#f7768e]/10 p-4 font-mono text-xs text-[#f7768e]">
          <p className="mb-2 font-bold">❌ Runtime Error:</p>
          <pre className="whitespace-pre-wrap">{this.state.error?.message}</pre>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-3 text-[#7aa2f7] hover:underline"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default PlaygroundPreview;
