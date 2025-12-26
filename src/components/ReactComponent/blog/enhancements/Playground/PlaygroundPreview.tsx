import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  memo,
  useCallback,
} from "react";
import { transform } from "sucrase";
import * as ReactNative from "react-native-web";
import { motion, AnimatePresence } from "framer-motion";

interface PlaygroundPreviewProps {
  code: string;
  language?: string;
}

const PlaygroundPreview = memo(function PlaygroundPreview({
  code,
  language = "typescript",
}: PlaygroundPreviewProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dartSyncKey, setDartSyncKey] = useState(0);
  const [_pythonOutput, setPythonOutput] = useState<string>("");
  const [pythonLoading, setPythonLoading] = useState(false);
  const [_bashOutput, setBashOutput] = useState<string>("");
  const [bashLoading, setBashLoading] = useState(false);
  const pyodideRef = useRef<any>(null);

  // Use deferred value for React preview to unblock typing
  const deferredCode = React.useDeferredValue(code);

  const [activeDartCode, setActiveDartCode] = useState(code);

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pythonComponent, setPythonComponent] =
    useState<React.ComponentType | null>(null);
  const [bashComponent, setBashComponent] =
    useState<React.ComponentType | null>(null);

  // Execute Python code
  const executePython = useCallback(async () => {
    if (!pyodideRef.current) {
      setError("Python runtime not loaded yet. Please wait...");
      return;
    }

    setPythonLoading(true);
    setPythonOutput("");
    setError(null);

    try {
      // Set up stdout capture
      pyodideRef.current.runPython(`
import sys
from io import StringIO
_stdout_capture = StringIO()
sys.stdout = _stdout_capture
`);

      // Run user code
      pyodideRef.current.runPython(code);

      // Get output
      const output = pyodideRef.current.runPython("_stdout_capture.getvalue()");
      const outputText = output || "(No output)";
      setPythonOutput(outputText);

      // Create a React component to render the output (styled like React components)
      // Check if output contains visualization markers for enhanced rendering
      const isVisualization =
        outputText.includes("VISUAL RATE LIMITING DASHBOARD") ||
        outputText.includes("REQUEST #") ||
        outputText.includes("█");

      setPythonComponent(() => () => {
        if (isVisualization) {
          // Enhanced visual rendering for rate limiting dashboard
          const lines = outputText
            .split("\n")
            .filter((line: string) => line.trim());
          return (
            <div
              style={{
                padding: "20px",
                fontFamily: "monospace",
                width: "100%",
                maxWidth: "100%",
                color: "#c0caf5",
              }}
            >
              {lines.map((line: string, i: number) => {
                // Style different types of lines
                if (
                  line.includes("REQUEST #") ||
                  line.includes("DASHBOARD") ||
                  line.includes("=")
                ) {
                  return (
                    <div
                      key={i}
                      style={{
                        color: "#7aa2f7",
                        marginBottom: "12px",
                        padding: "12px",
                        backgroundColor: "#1f2335",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        border: "1px solid #414868",
                      }}
                    >
                      {line}
                    </div>
                  );
                } else if (line.includes("✅") || line.includes("ALLOWED")) {
                  return (
                    <div
                      key={i}
                      style={{
                        color: "#9ece6a",
                        marginBottom: "6px",
                        padding: "8px",
                        backgroundColor: "#1f2335",
                        borderRadius: "6px",
                        fontSize: "13px",
                        borderLeft: "4px solid #9ece6a",
                      }}
                    >
                      {line}
                    </div>
                  );
                } else if (line.includes("❌") || line.includes("BLOCKED")) {
                  return (
                    <div
                      key={i}
                      style={{
                        color: "#f7768e",
                        marginBottom: "6px",
                        padding: "8px",
                        backgroundColor: "#1f2335",
                        borderRadius: "6px",
                        fontSize: "13px",
                        borderLeft: "4px solid #f7768e",
                      }}
                    >
                      {line}
                    </div>
                  );
                } else if (line.includes("█") || line.includes("░")) {
                  // Progress bar styling
                  return (
                    <div
                      key={i}
                      style={{
                        color: "#c0caf5",
                        marginBottom: "8px",
                        padding: "10px",
                        backgroundColor: "#1f2335",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontFamily: "monospace",
                        letterSpacing: "2px",
                      }}
                    >
                      {line}
                    </div>
                  );
                } else if (line.includes("─")) {
                  return (
                    <div
                      key={i}
                      style={{
                        color: "#565f89",
                        marginBottom: "8px",
                        fontSize: "12px",
                      }}
                    >
                      {line}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      style={{
                        color: "#c0caf5",
                        marginBottom: "4px",
                        padding: "6px",
                        fontSize: "13px",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {line}
                    </div>
                  );
                }
              })}
            </div>
          );
        } else {
          // Standard rendering
          return (
            <div
              style={{
                padding: "20px",
                fontFamily: "sans-serif",
                width: "100%",
                maxWidth: "100%",
              }}
            >
              {outputText
                .split("\n")
                .filter((line: string) => line.trim())
                .map((line: string, i: number) => (
                  <div
                    key={i}
                    style={{
                      color: "#c0caf5",
                      marginBottom: "8px",
                      padding: "8px",
                      backgroundColor: "#1f2335",
                      borderRadius: "4px",
                      fontSize: "14px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {line}
                  </div>
                ))}
            </div>
          );
        }
      });
    } catch (err: any) {
      const errorMsg =
        err.message || err.toString() || "Python execution error";
      setError(errorMsg);
      setPythonOutput("");
      setPythonComponent(null);
    } finally {
      setPythonLoading(false);
    }
  }, [code]);

  // Execute Bash code (simulated - runs in browser context)
  const executeBash = useCallback(async () => {
    setBashLoading(true);
    setBashOutput("");
    setError(null);

    try {
      // Enhanced bash simulation - parse and execute common commands
      const lines = code.split("\n");
      const output: string[] = [];
      let env: Record<string, string> = {};

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;

        // Handle echo with color codes
        if (trimmed.startsWith("echo ")) {
          let text = trimmed.substring(5).replace(/^["']|["']$/g, "");
          // Replace environment variables
          text = text.replace(/\$\{(\w+)\}/g, (_, key) => env[key] || "");
          // Remove ANSI color codes for display (we'll style it ourselves)
          text = text.replace(/\u001b\[[0-9;]*m/g, "");
          output.push(text);
        }
        // Handle variable assignment
        else if (trimmed.includes("=") && !trimmed.includes(" ")) {
          const [key, value] = trimmed.split("=");
          env[key] = value.replace(/^["']|["']$/g, "");
        }
        // Handle mkdir
        else if (trimmed.startsWith("mkdir ")) {
          const dir = trimmed
            .substring(6)
            .replace(/^["']|["']$/g, "")
            .replace(/-p\s*/, "");
          output.push(`✓ Created directory: ${dir}`);
        }
        // Handle set -e (just skip, it's a flag)
        else if (trimmed === "set -e") {
          // Skip
        }
        // Handle other commands
        else if (
          trimmed.startsWith("npm ") ||
          trimmed.startsWith("tar ") ||
          trimmed.startsWith("if ") ||
          trimmed.startsWith("elif ") ||
          trimmed.startsWith("else") ||
          trimmed.startsWith("fi")
        ) {
          // Skip control flow for now, just show the command
          if (trimmed.startsWith("npm ") || trimmed.startsWith("tar ")) {
            output.push(`✓ ${trimmed}`);
          }
        }
      }

      const outputText =
        output.length > 0
          ? output.join("\n")
          : "✓ Script executed successfully";
      setBashOutput(outputText);

      // Create a React component to render the output (styled like React components)
      setBashComponent(() => () => (
        <div
          style={{
            padding: "20px",
            fontFamily: "sans-serif",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          {outputText
            .split("\n")
            .filter((line) => line.trim())
            .map((line, i) => {
              // Style different types of output
              if (line.startsWith("✓")) {
                return (
                  <div
                    key={i}
                    style={{
                      color: "#9ece6a",
                      marginBottom: "8px",
                      padding: "8px",
                      backgroundColor: "#1f2335",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {line}
                  </div>
                );
              } else if (line.includes("Error") || line.includes("Failed")) {
                return (
                  <div
                    key={i}
                    style={{
                      color: "#f7768e",
                      marginBottom: "8px",
                      padding: "8px",
                      backgroundColor: "#1f2335",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {line}
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    style={{
                      color: "#c0caf5",
                      marginBottom: "8px",
                      padding: "8px",
                      backgroundColor: "#1f2335",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {line}
                  </div>
                );
              }
            })}
        </div>
      ));
    } catch (err: any) {
      setError(err.message || "Bash execution error");
      setBashComponent(null);
    } finally {
      setBashLoading(false);
    }
  }, [code]);

  // Initialize Pyodide for Python execution
  useEffect(() => {
    if (language === "python" && !pyodideRef.current) {
      setPythonLoading(true);

      // Load Pyodide via script tag
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
      script.async = true;

      script.onload = () => {
        if (window.loadPyodide) {
          window
            .loadPyodide({
              indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
            })
            .then((pyodide: any) => {
              pyodideRef.current = pyodide;
              setPythonLoading(false);
              // Auto-execute once loaded
              if (code.trim()) {
                executePython();
              }
            })
            .catch((err: any) => {
              console.error("Failed to initialize Pyodide:", err);
              setPythonLoading(false);
              setError("Failed to initialize Python runtime");
            });
        } else {
          setPythonLoading(false);
          setError("Pyodide failed to load");
        }
      };

      script.onerror = () => {
        setPythonLoading(false);
        setError("Failed to load Python runtime");
      };

      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [language]);

  // Lazy load for Python and Bash (auto-execute when visible)
  useEffect(() => {
    if (language !== "python" && language !== "bash") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [language]);

  // Auto-execute Python when visible and Pyodide is loaded
  useEffect(() => {
    if (
      language === "python" &&
      isVisible &&
      pyodideRef.current &&
      code.trim()
    ) {
      const timer = setTimeout(() => {
        executePython();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [code, language, isVisible, executePython]);

  // Auto-execute Bash when visible
  useEffect(() => {
    if (language === "bash" && isVisible && code.trim()) {
      const timer = setTimeout(() => {
        executeBash();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [code, language, isVisible, executeBash]);

  // Sync activeDartCode with code prop changes
  useEffect(() => {
    if (language === "dart") {
      setActiveDartCode(code);
    }
  }, [code, language]);

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
      { rootMargin: "100px" },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [language]);

  // Encode code for DartPad
  const dartPadUrl = useMemo(() => {
    if (language !== "dart" || !activeDartCode) return "";

    const encoded = encodeURIComponent(activeDartCode);
    return `https://dartpad.dev/embed-inline.html?id=&split=0&theme=dark&run=true&code=${encoded}&key=${dartSyncKey}`;
  }, [activeDartCode, language, dartSyncKey]);

  // Auto-execute Python when visible and Pyodide is loaded
  useEffect(() => {
    if (
      language === "python" &&
      isVisible &&
      pyodideRef.current &&
      code.trim()
    ) {
      const timer = setTimeout(() => {
        executePython();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [code, language, isVisible, executePython]);

  // Auto-execute Bash when visible
  useEffect(() => {
    if (language === "bash" && isVisible && code.trim()) {
      const timer = setTimeout(() => {
        executeBash();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [code, language, isVisible, executeBash]);

  // React/TypeScript/JavaScript compilation
  useEffect(() => {
    if (language === "dart" || language === "bash" || language === "python") {
      setComponent(null);
      if (language !== "python" && language !== "bash") {
        setError(null);
      }
      return;
    }

    const timer = setTimeout(() => {
      if (!deferredCode || deferredCode.trim().length === 0) {
        setComponent(null);
        setError(null);
        return;
      }

      try {
        const compiled = transform(deferredCode, {
          transforms: ["typescript", "jsx", "imports"],
          jsxRuntime: "classic",
        }).code;

        const scope: any = {
          React,
          ...ReactNative,
          motion,
          AnimatePresence,
          require: (moduleName: string) => {
            if (moduleName === "react") return React;
            if (moduleName === "react-native") return ReactNative;
            if (moduleName === "framer-motion")
              return { motion, AnimatePresence };
            throw new Error(
              `Module "${moduleName}" not found in playground scope.`,
            );
          },
          exports: {},
          console: {
            log: (...args: any[]) => console.log("Playground:", ...args),
            error: (...args: any[]) =>
              console.error("Playground Error:", ...args),
          },
          // Mock fetch to prevent "Failed to fetch" errors
          fetch: async (url: string, options?: any) => {
            // Return mock data for common API patterns
            if (url.includes("api.example.com")) {
              // Check if it's a users list endpoint (plural)
              if (url.includes("/users") && !url.match(/\/users\/\d+$/)) {
                // Return array of users
                return {
                  ok: true,
                  status: 200,
                  json: async () => [
                    {
                      id: 1,
                      name: "Alice",
                      email: "alice@example.com",
                      role: "developer",
                    },
                    {
                      id: 2,
                      name: "Bob",
                      email: "bob@example.com",
                      role: "designer",
                    },
                    {
                      id: 3,
                      name: "Charlie",
                      email: "charlie@example.com",
                      role: "manager",
                    },
                  ],
                };
              }
              // Single user endpoint or other endpoints
              return {
                ok: true,
                status: 200,
                json: async () => ({
                  id: 123,
                  name: "John Doe",
                  email: "john@example.com",
                  role: "developer",
                }),
              };
            }
            // For other URLs, still try real fetch but catch errors gracefully
            try {
              return await window.fetch(url, options);
            } catch (err) {
              return {
                ok: false,
                status: 500,
                json: async () => ({ error: "Network error (mock mode)" }),
              };
            }
          },
        };

        const wrappedCode = `
            const require = scope.require;
            const exports = scope.exports;
            const React = scope.React;
            const fetch = scope.fetch;
            ${compiled}
            return exports.default || (typeof App !== 'undefined' ? App : null);
          `;

        const renderFunc = new Function("scope", wrappedCode);
        const ExecutedComponent = renderFunc(scope);

        if (
          ExecutedComponent &&
          (typeof ExecutedComponent === "function" ||
            (typeof ExecutedComponent === "object" &&
              ExecutedComponent.$$typeof))
        ) {
          setComponent(() =>
            typeof ExecutedComponent === "function"
              ? ExecutedComponent
              : () => ExecutedComponent,
          );
          setError(null);
        } else {
          setError(
            "No valid default export or 'App' component found. Make sure to export your component.",
          );
        }
      } catch (err: any) {
        setError(err.message);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [deferredCode, language]);

  // Dart rendering
  if (language === "dart") {
    return (
      <div
        ref={containerRef}
        className="relative flex h-full flex-col overflow-hidden bg-[#0C141D]"
      >
        <div className="relative z-10 flex items-center justify-between border-b border-[#414868]/30 bg-[#1f2335] px-4 py-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7aa2f7]">
            Live Dart Preview
          </span>
          <button
            onClick={() => {
              setActiveDartCode(code);
              setDartSyncKey((k) => k + 1);
            }}
            className="flex items-center gap-1.5 rounded bg-[#7aa2f7] px-3 py-1 text-[10px] font-bold text-[#1a1b26] shadow-lg shadow-[#7aa2f7]/20 transition-all hover:bg-[#7aa2f7]/90"
          >
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Run Code
          </button>
        </div>
        <div className="relative flex-1 overflow-hidden bg-[#0C141D]">
          {isVisible ? (
            <iframe
              src={dartPadUrl}
              className="absolute left-[-10px] top-[-10px] h-[calc(100%+20px)] w-[calc(100%+40px)] border-0"
              title="DartPad Preview"
              sandbox="allow-scripts allow-top-navigation allow-popups allow-popups-to-escape-sandbox allow-same-origin"
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

  // Python execution - render in same preview area as React components
  if (language === "python") {
    return (
      <div
        ref={containerRef}
        className="relative flex h-full flex-col overflow-hidden bg-[#24283b]"
      >
        <div className="flex items-center justify-between border-b border-[#414868]/30 bg-[#1f2335] px-4 py-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7aa2f7]">
            Live Preview
          </span>
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#f7768e]/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#e0af68]/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#9ece6a]/50" />
          </div>
        </div>

        <div className="flex min-h-[300px] flex-1 items-center justify-center overflow-auto p-4">
          {error ? (
            <div className="w-full rounded-lg border border-[#f7768e]/30 bg-[#f7768e]/10 p-4 font-mono text-xs text-[#f7768e]">
              <p className="mb-2 font-bold">⚠️ Python Error:</p>
              <pre className="whitespace-pre-wrap">{error}</pre>
            </div>
          ) : pythonLoading ? (
            <div className="flex flex-col items-center gap-3 text-[#565f89]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7aa2f7] border-t-transparent" />
              <span className="text-sm">Executing Python...</span>
            </div>
          ) : pythonComponent ? (
            <ErrorBoundary>
              <div className="flex h-full w-full items-center justify-center">
                {React.createElement(pythonComponent)}
              </div>
            </ErrorBoundary>
          ) : (
            <div className="flex flex-col items-center gap-3 text-[#565f89]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7aa2f7] border-t-transparent" />
              <span className="text-sm">Initializing Python runtime...</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Bash execution - render in same preview area as React components
  if (language === "bash") {
    return (
      <div
        ref={containerRef}
        className="relative flex h-full flex-col overflow-hidden bg-[#24283b]"
      >
        <div className="flex items-center justify-between border-b border-[#414868]/30 bg-[#1f2335] px-4 py-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7aa2f7]">
            Live Preview
          </span>
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#f7768e]/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#e0af68]/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#9ece6a]/50" />
          </div>
        </div>

        <div className="flex min-h-[300px] flex-1 items-center justify-center overflow-auto p-4">
          {error ? (
            <div className="w-full rounded-lg border border-[#f7768e]/30 bg-[#f7768e]/10 p-4 font-mono text-xs text-[#f7768e]">
              <p className="mb-2 font-bold">⚠️ Bash Error:</p>
              <pre className="whitespace-pre-wrap">{error}</pre>
            </div>
          ) : bashLoading ? (
            <div className="flex flex-col items-center gap-3 text-[#565f89]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7aa2f7] border-t-transparent" />
              <span className="text-sm">Executing script...</span>
            </div>
          ) : bashComponent ? (
            <ErrorBoundary>
              <div className="flex h-full w-full items-center justify-center">
                {React.createElement(bashComponent)}
              </div>
            </ErrorBoundary>
          ) : (
            <div className="flex flex-col items-center gap-3 text-[#565f89]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7aa2f7] border-t-transparent" />
              <span className="text-sm">Initializing...</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // React/TypeScript/JavaScript rendering
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#24283b]">
      <div className="flex items-center justify-between border-b border-[#414868]/30 bg-[#1f2335] px-4 py-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7aa2f7]">
          Live Preview
        </span>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#f7768e]/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#e0af68]/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#9ece6a]/50" />
        </div>
      </div>

      <div className="flex min-h-[300px] flex-1 items-center justify-center overflow-auto p-4">
        {error ? (
          <div className="w-full rounded-lg border border-[#f7768e]/30 bg-[#f7768e]/10 p-4 font-mono text-xs text-[#f7768e]">
            <p className="mb-2 font-bold">⚠️ Transpilation Error:</p>
            <pre className="whitespace-pre-wrap">{error}</pre>
          </div>
        ) : Component ? (
          <ErrorBoundary>
            <div className="flex h-full w-full items-center justify-center">
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
});

export default PlaygroundPreview;

// Simple Error Boundary to catch runtime errors in the user's code
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      "Playground ErrorBoundary caught an error:",
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full rounded-lg border border-[#f7768e]/30 bg-[#f7768e]/10 p-4 font-mono text-xs text-[#f7768e]">
          <p className="mb-2 font-bold">❌ Runtime Error:</p>
          <pre className="whitespace-pre-wrap">
            {this.state.error?.message || "An unknown error occurred"}
          </pre>
          {this.state.error?.stack && (
            <details className="mt-2">
              <summary className="cursor-pointer text-[#7aa2f7] hover:underline">
                Stack Trace
              </summary>
              <pre className="mt-2 whitespace-pre-wrap text-[10px] opacity-75">
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-3 rounded bg-[#7aa2f7]/20 px-3 py-1.5 text-[#7aa2f7] transition-colors hover:bg-[#7aa2f7]/30"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
