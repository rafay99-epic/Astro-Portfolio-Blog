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

      // Clean up common rendering issues
      mermaidCode = mermaidCode
        .replace(/Unsupported markdown: list/g, "• List item")
        .replace(/unsupported markdown: list/g, "• List item")
        .replace(/Unsupported markdown: /g, "")
        .replace(/unsupported markdown: /g, "");

      try {
        const mermaid = (await import("mermaid")).default;
        const diagramId = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const diagramType = extractDiagramType(mermaidCode);

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
          // Get diagram dimensions to determine appropriate sizing
          const viewBox = svgElement.getAttribute('viewBox');
          let diagramWidth = 0;
          let diagramHeight = 0;
          
          if (viewBox) {
            const [, , width, height] = viewBox.split(' ').map(Number);
            diagramWidth = width;
            diagramHeight = height;
          }
          
          // Get container dimensions to calculate proper scaling
          const containerRect = container.getBoundingClientRect();
          const containerWidth = containerRect.width - 48; // Account for padding
          const containerHeight = Math.max(300, containerRect.height - 48); // Minimum height
          
          // Calculate appropriate size based on diagram complexity and container
          let targetHeight = 400; // Default larger height
          
          // More aggressive scaling for better readability
          if (diagramHeight > 0) {
            if (diagramHeight < 200) {
              // Small diagrams - make them much larger
              targetHeight = Math.max(350, diagramHeight * 3);
            } else if (diagramHeight > 400) {
              // Large diagrams - scale them down but keep them readable
              targetHeight = Math.min(600, diagramHeight * 1.2);
            } else {
              // Medium diagrams - scale them up significantly
              targetHeight = Math.max(350, Math.min(550, diagramHeight * 2));
            }
          }
          
          // Ensure the diagram fills the container width properly
          const aspectRatio = diagramWidth / diagramHeight;
          const targetWidth = targetHeight * aspectRatio;
          
          // If the calculated width is too small for the container, adjust height
          if (targetWidth < containerWidth * 0.8) {
            targetHeight = (containerWidth * 0.8) / aspectRatio;
          }
          
          // Apply responsive sizing with much better readability
          svgElement.style.width = "100%";
          svgElement.style.maxWidth = "100%";
          svgElement.style.height = `${targetHeight}px`;
          svgElement.style.minHeight = "300px"; // Much larger minimum for better readability
          svgElement.style.maxHeight = "700px"; // Increased maximum for larger diagrams
          
          // Ensure SVG scales properly on different screen sizes
          svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
          svgElement.style.overflow = "visible";
          
          // Improve text readability with larger fonts
          const textElements = svgElement.querySelectorAll('text, tspan');
          textElements.forEach((textElement) => {
            const element = textElement as HTMLElement;
            const currentFontSize = parseFloat(element.style.fontSize || '14');
            // Much larger minimum font size for better readability
            if (currentFontSize < 16) {
              element.style.fontSize = '16px';
            } else if (currentFontSize < 20) {
              // Scale up medium fonts too
              element.style.fontSize = `${Math.max(18, currentFontSize * 1.2)}px`;
            }
            // Make font weight bolder for better contrast
            element.style.fontWeight = '600';
          });

          // Simply append the SVG wrapper to container and replace the pre element
          container.appendChild(svgWrapper);
          preElement.parentNode?.replaceChild(container, preElement);
          codeElement.setAttribute("data-mermaid-rendered", "true");
        }
      } catch (error) {
        console.error("Failed to render diagram:", error);
      }
    },
    [extractDiagramType]
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
