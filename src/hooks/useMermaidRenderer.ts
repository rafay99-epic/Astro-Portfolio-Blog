import {
	DIAGRAM_TYPES,
	mermaidConfig,
} from "@react/blog/enhancements/diagram-renderer/config/styles";
import { useCallback, useEffect, useState } from "react";

export interface UseMermaidRendererResult {
	mermaidInitialized: boolean;
	extractDiagramType: (mermaidCode: string) => string;
}

export function useMermaidRenderer(): UseMermaidRendererResult {
	const [mermaidInitialized, setMermaidInitialized] = useState(false);

	const extractDiagramType = useCallback((mermaidCode: string): string => {
		const firstLine = mermaidCode.trim().split("\n")[0].toLowerCase();
		const foundType = Object.entries(DIAGRAM_TYPES).find(([key]) =>
			firstLine.includes(key),
		);
		return foundType ? (foundType[1] as string) : "Mermaid";
	}, []);

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
		extractDiagramType,
	};
}
