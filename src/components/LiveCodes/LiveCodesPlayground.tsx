import React, { useEffect, useRef, useState } from "react";
import type { LiveCodesPlaygroundProps } from "../../types/livecodes";

/**
 * LiveCodesPlayground - React wrapper for LiveCodes SDK
 *
 * Embeds interactive code playgrounds using LiveCodes.
 * Uses iframe embedding for maximum compatibility and reliability.
 */
const LiveCodesPlayground: React.FC<LiveCodesPlaygroundProps> = ({
  template = "html",
  initialCode,
  height = "600px",
  width = "100%",
  title,
  showConsole = false,
  readOnly: _readOnly = false,
  className = "",
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let isMounted = true;

    // Build LiveCodes embed URL
    const buildLiveCodesUrl = (): string => {
      const baseUrl = "https://livecodes.io/";
      const params = new URLSearchParams();

      // Set template
      if (template) {
        params.append("template", template);
      }

      // Add code content
      if (initialCode) {
        if (initialCode.markup) {
          // For React, markup goes to html parameter
          params.append("html", encodeURIComponent(initialCode.markup));
        }
        if (initialCode.style) {
          params.append("css", encodeURIComponent(initialCode.style));
        }
        if (initialCode.script) {
          // Determine script parameter name based on template
          if (template === "python") {
            params.append("python", encodeURIComponent(initialCode.script));
          } else if (template === "react") {
            // For React, JSX code goes to js parameter
            params.append("js", encodeURIComponent(initialCode.script));
          } else if (template === "typescript" || template === "javascript") {
            params.append("js", encodeURIComponent(initialCode.script));
          } else {
            params.append("js", encodeURIComponent(initialCode.script));
          }
        }
      }

      // Add console parameter
      if (showConsole) {
        params.append("console", "open");
      }

      // Add view parameter (show result by default)
      params.append("view", "result");

      return `${baseUrl}?${params.toString()}`;
    };

    // Create iframe
    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.background = "#1a1b26";
    iframe.src = buildLiveCodesUrl();
    iframe.title = title || "LiveCodes Playground";
    iframe.allow = "clipboard-read; clipboard-write";
    iframe.setAttribute(
      "sandbox",
      "allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms",
    );
    iframe.setAttribute("loading", "lazy");

    iframeRef.current = iframe;

    // Handle iframe load
    const handleLoad = () => {
      if (isMounted) {
        setIsLoading(false);
        setError(null);
      }
    };

    // Handle iframe error
    const handleError = () => {
      if (isMounted) {
        setError(
          "Failed to load LiveCodes playground. Please check your internet connection and try again.",
        );
        setIsLoading(false);
      }
    };

    iframe.onload = handleLoad;
    iframe.onerror = handleError;

    // Append iframe to container
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(iframe);

    // Timeout fallback
    const timeout = setTimeout(() => {
      if (isMounted && isLoading) {
        handleError();
      }
    }, 15000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      if (
        iframeRef.current &&
        containerRef.current &&
        containerRef.current.contains(iframeRef.current)
      ) {
        containerRef.current.removeChild(iframeRef.current);
      }
    };
  }, [template, initialCode, showConsole, title, isLoading]);

  return (
    <div
      className={`livecodes-playground-wrapper ${className}`}
      style={{ width, height, position: "relative" }}
      id={id}
    >
      {title && (
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#1f2335",
            borderBottom: "1px solid #414868",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: "bold",
              color: "#7aa2f7",
            }}
          >
            {title}
          </h3>
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: title ? "calc(100% - 49px)" : "100%",
          minHeight: "400px",
          border: title ? "none" : "1px solid #414868",
          borderRadius: title ? "0 0 8px 8px" : "8px",
          overflow: "hidden",
          background: "#1a1b26",
        }}
      />
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#565f89",
            fontSize: "14px",
            zIndex: 10,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid #414868",
                borderTop: "3px solid #7aa2f7",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 10px",
              }}
            />
            Loading playground...
          </div>
        </div>
      )}
      {error && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#f7768e",
            fontSize: "14px",
            padding: "20px",
            backgroundColor: "#1f2335",
            borderRadius: "8px",
            border: "1px solid #f7768e",
            maxWidth: "90%",
            zIndex: 10,
          }}
        >
          <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
            ⚠️ Error Loading Playground
          </div>
          <div>{error}</div>
          <div
            style={{ marginTop: "10px", fontSize: "12px", color: "#565f89" }}
          >
            Make sure you have an active internet connection and try refreshing
            the page.
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LiveCodesPlayground;
