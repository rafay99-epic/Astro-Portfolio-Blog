import { useCallback, useEffect, createElement } from "react";
import { containerStyles } from "../config/styles";
import type { UseMermaidRendererResult } from "./useMermaidRenderer";

interface UseDiagramRendererProps
  extends Pick<
    UseMermaidRendererResult,
    | "mermaidInitialized"
    | "extractDiagramType"
    | "copyToClipboard"
    | "setFullscreenDiagram"
    | "copiedStates"
  > {}

export function useDiagramRenderer({
  mermaidInitialized,
  extractDiagramType,
  copyToClipboard,
  setFullscreenDiagram,
  copiedStates,
}: UseDiagramRendererProps): {
  renderDiagram: (codeElement: Element) => Promise<void>;
} {
  const renderDiagram = useCallback(
    async (codeElement: Element) => {
      const preElement = codeElement.parentElement;
      if (!preElement || preElement.tagName !== "PRE") return;

      const mermaidCode = codeElement.textContent?.trim();
      if (!mermaidCode) return;

      try {
        const mermaid = (await import("mermaid")).default;
        const diagramId = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const diagramType = extractDiagramType(mermaidCode);

        const container = document.createElement("div");
        container.className = containerStyles.diagram;

        const renderResult = await mermaid.render(diagramId, mermaidCode);
        const svg =
          typeof renderResult === "string" ? renderResult : renderResult.svg;

        const svgWrapper = document.createElement("div");
        svgWrapper.className = containerStyles.svgWrapper;
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

          const { createRoot } = await import("react-dom/client");
          const root = createRoot(buttonContainer);

          const { default: DiagramButtons } = await import(
            "../components/DiagramButtons"
          );
          const element = createElement(DiagramButtons, {
            onCopy: () => copyToClipboard(svgElement, diagramId),
            onFullscreen: () =>
              setFullscreenDiagram({
                element: svgWrapper,
                type: diagramType,
                id: diagramId,
              }),
            copied: copiedStates.get(diagramId) || false,
            diagramType: diagramType,
          });

          root.render(element);
        }
      } catch (error) {
        console.error("Failed to render diagram:", error);
      }
    },
    [extractDiagramType, copyToClipboard, setFullscreenDiagram, copiedStates]
  );

  useEffect(() => {
    if (!mermaidInitialized) return;

    const renderDiagrams = () => {
      const diagrams = document.querySelectorAll(
        "pre code.language-mermaid:not([data-mermaid-rendered])"
      );
      diagrams.forEach(renderDiagram);
    };

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.addedNodes.length > 0)) {
        renderDiagrams();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    renderDiagrams();

    return () => observer.disconnect();
  }, [mermaidInitialized, renderDiagram]);

  return { renderDiagram };
}
