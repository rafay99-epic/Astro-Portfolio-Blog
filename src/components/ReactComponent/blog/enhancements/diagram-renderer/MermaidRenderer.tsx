import { useEffect } from "react";
import { memo } from "react";
import { useMermaidRenderer } from "./hooks/useMermaidRenderer";
import { useDiagramRenderer } from "./hooks/useDiagramRenderer";
import FullscreenModal from "./components/FullscreenModal";

const MermaidRenderer = memo(function MermaidRenderer() {
  const {
    mermaidInitialized,
    copiedStates,
    fullscreenDiagram,
    setFullscreenDiagram,
    extractDiagramType,
    copyToClipboard,
  } = useMermaidRenderer();

  useDiagramRenderer({
    mermaidInitialized,
    extractDiagramType,
    copyToClipboard,
    setFullscreenDiagram,
    copiedStates,
  });

  useEffect(() => {
    if (!fullscreenDiagram) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreenDiagram(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [fullscreenDiagram, setFullscreenDiagram]);

  return (
    <FullscreenModal
      isOpen={!!fullscreenDiagram}
      onClose={() => setFullscreenDiagram(null)}
      onCopy={() => {
        if (fullscreenDiagram) {
          const svg = fullscreenDiagram.element.querySelector("svg");
          if (svg) copyToClipboard(svg, fullscreenDiagram.id);
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
