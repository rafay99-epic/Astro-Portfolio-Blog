import React from "react";
import { memo } from "react";
import { useMermaidRenderer } from "@hooks/useMermaidRenderer";
import { useDiagramRenderer } from "@hooks/useDiagramRenderer";

const MermaidRenderer = memo(function MermaidRenderer() {
  const {
    mermaidInitialized,
    extractDiagramType,
  } = useMermaidRenderer();

  useDiagramRenderer({
    mermaidInitialized,
    extractDiagramType,
  });

  return null; // No UI needed, just handles diagram rendering
});

export default MermaidRenderer;
