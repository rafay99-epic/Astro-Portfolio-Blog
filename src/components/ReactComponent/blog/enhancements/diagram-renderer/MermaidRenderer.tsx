import type { MermaidEventDetail } from "@hooks/useDiagramRenderer";
import { useDiagramRenderer } from "@hooks/useDiagramRenderer";
import { downloadSvgAsPng } from "@util/svgToImage";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FullscreenModal from "./components/FullscreenModal";

// Export the current SVG as a PNG, naming the file after the diagram type.
function downloadDiagram(svgHtml: string, diagramType: string): void {
	if (!svgHtml) return;
	const safeName = diagramType
		? `${diagramType.toLowerCase().replace(/\s+/g, "-")}-diagram.png`
		: "diagram.png";
	downloadSvgAsPng(svgHtml, safeName).catch((err) =>
		console.error("Download failed:", err),
	);
}

const MermaidRenderer = memo(function MermaidRenderer() {
	useDiagramRenderer();

	// ── Fullscreen modal state ──────────────────────────────────────────
	const [fullscreen, setFullscreen] = useState<{
		isOpen: boolean;
		svgHtml: string;
		diagramType: string;
	}>({ isOpen: false, svgHtml: "", diagramType: "" });
	const [copied, setCopied] = useState(false);
	const svgContainerRef = useRef<HTMLDivElement>(null);

	const closeFullscreen = useCallback(() => {
		setFullscreen({ isOpen: false, svgHtml: "", diagramType: "" });
		setCopied(false);
	}, []);

	const handleCopy = useCallback(() => {
		if (!fullscreen.svgHtml) return;

		navigator.clipboard
			.writeText(fullscreen.svgHtml)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			})
			.catch((err) => {
				console.error("Copy failed:", err);
			});
	}, [fullscreen.svgHtml]);

	const handleDownload = useCallback(() => {
		downloadDiagram(fullscreen.svgHtml, fullscreen.diagramType);
	}, [fullscreen.svgHtml, fullscreen.diagramType]);

	// ── Listen for custom events from DOM-injected buttons ──────────────
	useEffect(() => {
		const onFullscreen = (e: CustomEvent<MermaidEventDetail>) => {
			setFullscreen({
				isOpen: true,
				svgHtml: e.detail.svgHtml,
				diagramType: e.detail.diagramType,
			});
		};

		const onDownload = (e: CustomEvent<MermaidEventDetail>) => {
			downloadDiagram(e.detail.svgHtml, e.detail.diagramType);
		};

		const onCopy = (e: CustomEvent<{ svgHtml: string }>) => {
			navigator.clipboard
				.writeText(e.detail.svgHtml)
				.catch((err) => console.error("Copy failed:", err));
		};

		document.addEventListener("mermaid:fullscreen", onFullscreen);
		document.addEventListener("mermaid:download", onDownload);
		document.addEventListener("mermaid:copy", onCopy);

		return () => {
			document.removeEventListener("mermaid:fullscreen", onFullscreen);
			document.removeEventListener("mermaid:download", onDownload);
			document.removeEventListener("mermaid:copy", onCopy);
		};
	}, []);

	// Inject SVG into the container ref safely (avoids dangerouslySetInnerHTML)
	useEffect(() => {
		if (svgContainerRef.current && fullscreen.svgHtml) {
			svgContainerRef.current.innerHTML = fullscreen.svgHtml;
		} else if (svgContainerRef.current) {
			svgContainerRef.current.innerHTML = "";
		}
	}, [fullscreen.svgHtml]);

	// ── Render fullscreen modal via portal ──────────────────────────────
	if (typeof document === "undefined") return null;

	return createPortal(
		<FullscreenModal
			isOpen={fullscreen.isOpen}
			onClose={closeFullscreen}
			onCopy={handleCopy}
			onDownload={handleDownload}
			copied={copied}
			diagramType={fullscreen.diagramType}
		>
			<div
				ref={svgContainerRef}
				className="w-full [&>svg]:mx-auto [&>svg]:max-h-[calc(100vh-200px)] [&>svg]:w-full"
			/>
		</FullscreenModal>,
		document.body,
	);
});

export default MermaidRenderer;
