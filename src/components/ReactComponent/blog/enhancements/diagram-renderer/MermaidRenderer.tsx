import React, { useEffect, useState, useCallback } from "react";
import { memo } from "react";

const CopyIcon = memo(function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );
});

const CheckIcon = memo(function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20,6 9,17 4,12"></polyline>
    </svg>
  );
});

const FullscreenIcon = memo(function FullscreenIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
    </svg>
  );
});

const CloseIcon = memo(function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
});

interface DiagramButtonsProps {
  onCopy: () => void;
  onFullscreen: () => void;
  copied: boolean;
  diagramType?: string;
}

const DiagramButtons = memo(function DiagramButtons({
  onCopy,
  onFullscreen,
  copied,
  diagramType,
}: DiagramButtonsProps) {
  return (
    <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
      {diagramType && (
        <span className="text-xs font-medium text-[#565f89] bg-[#24283b]/90 px-2 py-1 rounded backdrop-blur-sm border border-[#565f89]/30">
          {diagramType}
        </span>
      )}
      <button
        onClick={onCopy}
        className={`
          flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all duration-200 backdrop-blur-sm border
          ${
            copied
              ? "bg-[#9ece6a]/20 border-[#9ece6a]/50 text-[#9ece6a]"
              : "bg-[#24283b]/90 border-[#565f89]/30 text-[#a9b1d6] hover:bg-[#414868]/50 hover:border-[#7aa2f7]/50 hover:text-[#7aa2f7]"
          }
        `}
        title={copied ? "SVG Copied!" : "Copy SVG"}
        aria-label={
          copied ? "SVG copied to clipboard" : "Copy SVG to clipboard"
        }
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span className="text-xs">{copied ? "Copied!" : "Copy SVG"}</span>
      </button>
      <button
        onClick={onFullscreen}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all duration-200 backdrop-blur-sm bg-[#24283b]/90 border border-[#565f89]/30 text-[#a9b1d6] hover:bg-[#414868]/50 hover:border-[#bb9af7]/50 hover:text-[#bb9af7]"
        title="View fullscreen"
        aria-label="View diagram in fullscreen"
      >
        <FullscreenIcon />
        <span className="text-xs">Fullscreen</span>
      </button>
    </div>
  );
});

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
  copied: boolean;
  children: React.ReactNode;
  diagramType?: string;
}

const FullscreenModal = memo(function FullscreenModal({
  isOpen,
  onClose,
  onCopy,
  copied,
  children,
  diagramType,
}: FullscreenModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl max-h-full w-full bg-[#1a1b26] rounded-xl border border-[#565f89]/30 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#565f89]/20 bg-[#24283b]">
          <h3 className="text-lg font-semibold text-[#c0caf5] flex items-center gap-2">
            <span>📊</span>
            {diagramType ? `${diagramType} Diagram` : "Diagram Viewer"}
          </h3>
          <div className="flex items-center gap-4">
            <button
              onClick={onCopy}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 border
                ${
                  copied
                    ? "bg-[#9ece6a]/20 border-[#9ece6a]/50 text-[#9ece6a]"
                    : "bg-[#24283b] border-[#565f89]/30 text-[#a9b1d6] hover:bg-[#414868] hover:border-[#7aa2f7]/50 hover:text-[#7aa2f7]"
                }
              `}
              title={copied ? "SVG Copied!" : "Copy SVG"}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              <span>{copied ? "SVG Copied!" : "Copy SVG"}</span>
            </button>
            <div className="flex items-center gap-2 text-[#a9b1d6] text-sm">
              <kbd className="px-2 py-1 bg-[#24283b] border border-[#565f89]/30 rounded text-xs font-mono">
                ESC
              </kbd>
              <span>to exit</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#414868] rounded-lg text-[#a9b1d6] hover:text-[#c0caf5] transition-all duration-200"
              title="Close fullscreen"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(100vh-120px)] bg-[#1a1b26]">
          <div className="flex justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
});

const MermaidRenderer = memo(function MermaidRenderer() {
  const [mermaidInitialized, setMermaidInitialized] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Map<string, boolean>>(
    new Map()
  );
  const [fullscreenDiagram, setFullscreenDiagram] = useState<{
    element: HTMLElement;
    type: string;
    id: string;
  } | null>(null);

  const extractDiagramType = useCallback((mermaidCode: string): string => {
    const firstLine = mermaidCode.trim().split("\n")[0].toLowerCase();

    if (firstLine.includes("graph") || firstLine.includes("flowchart"))
      return "Flowchart";
    if (firstLine.includes("sequencediagram")) return "Sequence";
    if (firstLine.includes("classdiagram")) return "Class";
    if (firstLine.includes("statediagram")) return "State";
    if (firstLine.includes("erdiagram")) return "ER";
    if (firstLine.includes("gantt")) return "Gantt";
    if (firstLine.includes("pie")) return "Pie Chart";
    if (firstLine.includes("journey")) return "User Journey";
    if (firstLine.includes("gitgraph")) return "Git Graph";
    if (firstLine.includes("mindmap")) return "Mindmap";
    if (firstLine.includes("timeline")) return "Timeline";

    return "Mermaid";
  }, []);

  const copyToClipboard = useCallback(
    async (svgElement: SVGElement, diagramId: string) => {
      try {
        const svgString = new XMLSerializer().serializeToString(svgElement);
        await navigator.clipboard.writeText(svgString);

        setCopiedStates((prev) => new Map(prev).set(diagramId, true));

        setTimeout(() => {
          setCopiedStates((prev) => {
            const newMap = new Map(prev);
            newMap.delete(diagramId);
            return newMap;
          });
        }, 2000);

        console.log("SVG copied to clipboard successfully");
      } catch (err) {
        console.error("Failed to copy SVG:", err);

        try {
          const svgString = new XMLSerializer().serializeToString(svgElement);
          const textArea = document.createElement("textarea");
          textArea.value = svgString;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);

          setCopiedStates((prev) => new Map(prev).set(diagramId, true));
          setTimeout(() => {
            setCopiedStates((prev) => {
              const newMap = new Map(prev);
              newMap.delete(diagramId);
              return newMap;
            });
          }, 2000);
        } catch (fallbackErr) {
          console.error("Fallback copy also failed:", fallbackErr);
          alert("Failed to copy SVG to clipboard. Please try again.");
        }
      }
    },
    []
  );

  useEffect(() => {
    const initMermaid = async () => {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          theme: "base",
          themeVariables: {
            primaryColor: "#7aa2f7",
            primaryTextColor: "#c0caf5",
            primaryBorderColor: "#7aa2f7",
            lineColor: "#7aa2f7",
            secondaryColor: "#bb9af7",
            tertiaryColor: "#9ece6a",
            background: "#1a1b26",
            mainBkg: "#24283b",
            secondaryBkg: "#414868",
            tertiaryBkg: "#565f89",
            secondaryTextColor: "#a9b1d6",
            tertiaryTextColor: "#9aa5ce",
            secondaryBorderColor: "#bb9af7",
            tertiaryBorderColor: "#9ece6a",
            noteBkgColor: "#24283b",
            noteTextColor: "#c0caf5",
            noteBorderColor: "#7aa2f7",
            darkMode: "true",
            fontFamily:
              "ui-monospace, SFMono-Regular, Monaco, Menlo, monospace",
            fontSize: "14px",
          },
          startOnLoad: false,
          flowchart: {
            htmlLabels: true,
            curve: "basis",
          },
        });

        setMermaidInitialized(true);
        console.log("Mermaid initialized with Tokyo Night theme");
      } catch (error) {
        console.error("Failed to initialize Mermaid:", error);
      }
    };

    initMermaid();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && fullscreenDiagram) {
        setFullscreenDiagram(null);
      }
    };

    if (fullscreenDiagram) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [fullscreenDiagram]);

  useEffect(() => {
    if (!mermaidInitialized) return;

    const renderDiagrams = async () => {
      const mermaid = (await import("mermaid")).default;

      const mermaidBlocks = document.querySelectorAll(
        "pre code.language-mermaid:not([data-mermaid-rendered])"
      );

      console.log(`Found ${mermaidBlocks.length} Mermaid diagrams to render`);

      for (let i = 0; i < mermaidBlocks.length; i++) {
        const codeElement = mermaidBlocks[i] as HTMLElement;
        const preElement = codeElement.parentElement as HTMLElement;

        if (!preElement || preElement.tagName !== "PRE") continue;

        const mermaidCode = codeElement.textContent?.trim();
        if (!mermaidCode) continue;

        try {
          const diagramId = `mermaid-diagram-${i}-${Date.now()}`;
          const diagramType = extractDiagramType(mermaidCode);

          const container = document.createElement("div");
          container.className =
            "group relative bg-[#1a1b26] rounded-lg border border-[#565f89]/30 p-6 my-4 overflow-x-auto transition-all duration-200 hover:border-[#7aa2f7]/50 hover:shadow-lg hover:shadow-[#7aa2f7]/10";
          container.style.position = "relative";

          const renderResult = await mermaid.render(diagramId, mermaidCode);
          const svg =
            typeof renderResult === "string"
              ? renderResult
              : (renderResult as any).svg;

          const svgWrapper = document.createElement("div");
          svgWrapper.className = "flex justify-center";
          svgWrapper.innerHTML = svg;

          const svgElement = svgWrapper.querySelector("svg");
          if (svgElement) {
            svgElement.style.maxWidth = "100%";
            svgElement.style.height = "auto";

            const buttonContainer = document.createElement("div");

            container.appendChild(svgWrapper);
            container.appendChild(buttonContainer);

            preElement.parentNode?.replaceChild(container, preElement);

            codeElement.setAttribute("data-mermaid-rendered", "true");

            import("react-dom/client").then(({ createRoot }) => {
              const root = createRoot(buttonContainer);

              const renderButtons = () => {
                root.render(
                  <DiagramButtons
                    onCopy={() => copyToClipboard(svgElement, diagramId)}
                    onFullscreen={() =>
                      setFullscreenDiagram({
                        element: svgWrapper,
                        type: diagramType,
                        id: diagramId,
                      })
                    }
                    copied={copiedStates.get(diagramId) || false}
                    diagramType={diagramType}
                  />
                );
              };

              renderButtons();

              (buttonContainer as any).__renderButtons = renderButtons;
            });

            console.log(
              `Successfully rendered ${diagramType} diagram with ID: ${diagramId}`
            );
          }
        } catch (error) {
          console.error(`Failed to render Mermaid diagram ${i}:`, error);

          const errorContainer = document.createElement("div");
          errorContainer.className =
            "bg-[#f7768e]/10 border border-[#f7768e]/30 rounded-lg p-4 my-4 text-center transition-all duration-200";
          errorContainer.innerHTML = `
            <div class="text-[#f7768e] mb-2 text-lg">⚠️ Diagram Rendering Error</div>
            <div class="text-[#a9b1d6] text-sm">Failed to render Mermaid diagram. Please check the syntax.</div>
            <details class="mt-2 text-left">
              <summary class="text-[#7aa2f7] cursor-pointer text-sm">Show diagram code</summary>
              <pre class="text-[#565f89] text-xs mt-2 p-2 bg-[#24283b] rounded overflow-x-auto"><code>${mermaidCode}</code></pre>
            </details>
          `;

          preElement.parentNode?.replaceChild(errorContainer, preElement);
        }
      }
    };

    renderDiagrams();

    const observer = new MutationObserver((mutations) => {
      let hasNewMermaid = false;

      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (
              element.querySelector?.(
                "code.language-mermaid:not([data-mermaid-rendered])"
              )
            ) {
              hasNewMermaid = true;
            }
          }
        });
      });

      if (hasNewMermaid) {
        setTimeout(renderDiagrams, 100);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [mermaidInitialized, extractDiagramType, copyToClipboard]);

  useEffect(() => {
    const buttonContainers = document.querySelectorAll(
      "[data-mermaid-rendered]"
    );

    buttonContainers.forEach((container) => {
      const buttonContainer =
        container.parentElement?.querySelector("div:last-child");
      if (buttonContainer) {
        const renderFunction = (buttonContainer as any).__renderButtons;
        if (renderFunction) {
          renderFunction();
        }
      }
    });
  }, [copiedStates]);

  return (
    <FullscreenModal
      isOpen={!!fullscreenDiagram}
      onClose={() => setFullscreenDiagram(null)}
      onCopy={() => {
        if (fullscreenDiagram) {
          const svg = fullscreenDiagram.element.querySelector("svg");
          if (svg) {
            copyToClipboard(svg, fullscreenDiagram.id);
          }
        }
      }}
      copied={copiedStates.get(fullscreenDiagram?.id || "") || false}
      diagramType={fullscreenDiagram?.type}
    >
      {fullscreenDiagram?.element.innerHTML && (
        <div
          dangerouslySetInnerHTML={{
            __html: fullscreenDiagram.element.innerHTML,
          }}
        />
      )}
    </FullscreenModal>
  );
});

export default MermaidRenderer;
