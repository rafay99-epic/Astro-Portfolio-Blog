import { useDiagramRenderer } from "@hooks/useDiagramRenderer";
import { useMermaidRenderer } from "@hooks/useMermaidRenderer";
import { memo } from "react";

const MermaidRenderer = memo(function MermaidRenderer() {
	const { mermaidInitialized, extractDiagramType } = useMermaidRenderer();

	useDiagramRenderer({
		mermaidInitialized,
		extractDiagramType,
	});

	return null;
});

export default MermaidRenderer;
