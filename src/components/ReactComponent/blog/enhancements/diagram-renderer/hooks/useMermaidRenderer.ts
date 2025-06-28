import { useState, useCallback, useEffect } from "react";
import { mermaidConfig, DIAGRAM_TYPES } from "../config/styles";

export interface UseMermaidRendererResult {
  mermaidInitialized: boolean;
  copiedStates: Map<string, boolean>;
  fullscreenDiagram: {
    element: HTMLElement;
    type: string;
    id: string;
  } | null;
  setFullscreenDiagram: (
    diagram: {
      element: HTMLElement;
      type: string;
      id: string;
    } | null
  ) => void;
  extractDiagramType: (mermaidCode: string) => string;
  copyToClipboard: (svgElement: SVGElement, diagramId: string) => Promise<void>;
}

export function useMermaidRenderer(): UseMermaidRendererResult {
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
    return (
      Object.entries(DIAGRAM_TYPES).find(([key]) =>
        firstLine.includes(key)
      )?.[1] || "Mermaid"
    );
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
      } catch (err) {
        console.error("Failed to copy SVG:", err);
      }
    },
    []
  );

  useEffect(() => {
    let mounted = true;
    const initMermaid = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        if (!mounted) return;
        mermaid.initialize(mermaidConfig);
        setMermaidInitialized(true);
      } catch (error) {
        console.error("Failed to initialize Mermaid:", error);
      }
    };
    initMermaid();
    return () => {
      mounted = false;
    };
  }, []);

  return {
    mermaidInitialized,
    copiedStates,
    fullscreenDiagram,
    setFullscreenDiagram,
    extractDiagramType,
    copyToClipboard,
  };
}
