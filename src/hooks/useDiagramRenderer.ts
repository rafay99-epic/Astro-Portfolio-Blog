import { useCallback, useEffect } from "react";
import { containerStyles } from "@react/blog/enhancements/diagram-renderer/config/styles";

interface UseDiagramRendererProps {
  mermaidInitialized: boolean;
  extractDiagramType: (mermaidCode: string) => string;
}

export function useDiagramRenderer({
  mermaidInitialized,
  extractDiagramType,
}: UseDiagramRendererProps): {
  renderDiagram: (codeElement: Element) => Promise<void>;
} {
  const renderDiagram = useCallback(
    async (codeElement: Element) => {
      const preElement = codeElement.parentElement;
      if (!preElement || preElement.tagName !== "PRE") return;

      let mermaidCode = codeElement.textContent?.trim();
      if (!mermaidCode) return;

      mermaidCode = mermaidCode
        .replace(/Unsupported markdown: list/g, "• List item")
        .replace(/unsupported markdown: list/g, "• List item")
        .replace(/Unsupported markdown: /g, "")
        .replace(/unsupported markdown: /g, "");

      try {
        const mermaid = (await import("mermaid")).default;
        const diagramId = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).slice(2)}`;

        const container = document.createElement("div");
        container.className = `${containerStyles.diagram} mermaid-diagram-container`;

        const renderResult = await mermaid.render(diagramId, mermaidCode);
        const svg =
          typeof renderResult === "string" ? renderResult : renderResult.svg;

        const svgWrapper = document.createElement("div");
        svgWrapper.className = containerStyles.svgWrapper;
        svgWrapper.innerHTML = svg;

        const svgElement = svgWrapper.querySelector("svg");
        if (svgElement) {
          const viewBox = svgElement.getAttribute("viewBox");
          let diagramWidth = 0;
          let diagramHeight = 0;

          if (viewBox) {
            const [, , width, height] = viewBox.split(" ").map(Number);
            diagramWidth = width;
            diagramHeight = height;
          }

          let measuredWidth = 0;
          
          if (container && container.isConnected) {
            const containerRect = container.getBoundingClientRect();
            measuredWidth = containerRect.width;
          } else if (container && container.parentElement) {
            const parentRect = container.parentElement.getBoundingClientRect();
            measuredWidth = parentRect.width;
          } else {
            measuredWidth = window.innerWidth;
          }
          
          const containerWidth = Math.max(0, measuredWidth - 48);

          let targetHeight = 400;

          if (diagramHeight > 0) {
            if (diagramHeight < 200) {
              targetHeight = Math.max(350, diagramHeight * 3);
            } else if (diagramHeight > 400) {
              targetHeight = Math.min(600, diagramHeight * 1.2);
            } else {
              targetHeight = Math.max(350, Math.min(550, diagramHeight * 2));
            }
          }

          const aspectRatio = diagramWidth / diagramHeight;
          const targetWidth = targetHeight * aspectRatio;

          if (targetWidth < containerWidth * 0.8) {
            targetHeight = (containerWidth * 0.8) / aspectRatio;
          }

          svgElement.style.width = "100%";
          svgElement.style.maxWidth = "100%";
          svgElement.style.height = `${targetHeight}px`;
          svgElement.style.minHeight = "300px";
          svgElement.style.maxHeight = "700px";

          svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
          svgElement.style.overflow = "visible";

          const textElements = svgElement.querySelectorAll("text, tspan");
          textElements.forEach((textElement) => {
            const element = textElement as HTMLElement;
            const currentFontSize = parseFloat(element.style.fontSize || "14");
            if (currentFontSize < 16) {
              element.style.fontSize = "16px";
            } else if (currentFontSize < 20) {
              element.style.fontSize = `${Math.max(18, currentFontSize * 1.2)}px`;
            }
            element.style.fontWeight = "600";
          });

          container.appendChild(svgWrapper);
          preElement.parentNode?.replaceChild(container, preElement);
          codeElement.setAttribute("data-mermaid-rendered", "true");
        }
      } catch (error) {
        console.error("Failed to render diagram:", error);
      }
    },
    [extractDiagramType],
  );

  useEffect(() => {
    if (!mermaidInitialized) return;

    const renderDiagrams = () => {
      const diagrams = document.querySelectorAll(
        "pre code.language-mermaid:not([data-mermaid-rendered])",
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
