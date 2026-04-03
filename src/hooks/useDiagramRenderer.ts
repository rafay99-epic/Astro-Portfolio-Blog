import {
	buttonBarStyles,
	containerStyles,
	injectHoverStyles,
} from "@react/blog/enhancements/diagram-renderer/config/styles";
import { useCallback, useEffect } from "react";

// ── Custom-event type safety ────────────────────────────────────────────
export interface MermaidEventDetail {
	svgHtml: string;
	diagramType: string;
}

declare global {
	interface DocumentEventMap {
		"mermaid:fullscreen": CustomEvent<MermaidEventDetail>;
		"mermaid:download": CustomEvent<MermaidEventDetail>;
		"mermaid:copy": CustomEvent<{ svgHtml: string }>;
	}
}

// ── SVG icon strings for DOM-injected buttons ───────────────────────────
// Explicit inline style locks the size so parent CSS cannot blow them up.
const ICON_FULLSCREEN =
	'<svg style="width:14px;height:14px;min-width:14px;min-height:14px;max-width:14px;max-height:14px;display:block;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>';
const ICON_DOWNLOAD =
	'<svg style="width:14px;height:14px;min-width:14px;min-height:14px;max-width:14px;max-height:14px;display:block;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
const ICON_COPY =
	'<svg style="width:14px;height:14px;min-width:14px;min-height:14px;max-width:14px;max-height:14px;display:block;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

// ── Hook props ──────────────────────────────────────────────────────────
interface UseDiagramRendererProps {
	mermaidInitialized: boolean;
	extractDiagramType: (mermaidCode: string) => string;
}

// ── Helper: create a single icon-only button ────────────────────────────
function createBtn(iconHtml: string, label: string): HTMLButtonElement {
	const btn = document.createElement("button");
	btn.type = "button";
	btn.className = "mermaid-btn";
	btn.title = label;
	btn.setAttribute("aria-label", label);
	Object.assign(btn.style, buttonBarStyles.button);
	btn.innerHTML = iconHtml;
	return btn;
}

// ── Helper: build the button bar and attach it to the container ─────────
function injectButtonBar(
	container: HTMLDivElement,
	svgHtml: string,
	diagramType: string,
): void {
	const bar = document.createElement("div");
	bar.className = "mermaid-btn-bar";
	Object.assign(bar.style, buttonBarStyles.container);

	// Diagram-type badge
	if (diagramType) {
		const badge = document.createElement("span");
		badge.textContent = diagramType;
		Object.assign(badge.style, buttonBarStyles.badge);
		bar.appendChild(badge);
	}

	// Fullscreen button
	const fullscreenBtn = createBtn(ICON_FULLSCREEN, "Fullscreen");
	fullscreenBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		document.dispatchEvent(
			new CustomEvent("mermaid:fullscreen", {
				detail: { svgHtml, diagramType },
			}),
		);
	});
	bar.appendChild(fullscreenBtn);

	// Download PNG button
	const downloadBtn = createBtn(ICON_DOWNLOAD, "Download");
	downloadBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		document.dispatchEvent(
			new CustomEvent("mermaid:download", {
				detail: { svgHtml, diagramType },
			}),
		);
	});
	bar.appendChild(downloadBtn);

	// Copy SVG button
	const copyBtn = createBtn(ICON_COPY, "Copy");
	copyBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		document.dispatchEvent(
			new CustomEvent("mermaid:copy", { detail: { svgHtml } }),
		);
		// Visual feedback
		copyBtn.style.color = "#9ece6a";
		copyBtn.style.borderColor = "rgba(158,206,106,0.5)";
		setTimeout(() => {
			copyBtn.style.color = "#a9b1d6";
			copyBtn.style.borderColor = "rgba(86,95,137,0.3)";
		}, 2000);
	});
	bar.appendChild(copyBtn);

	container.appendChild(bar);

	// Click on the diagram itself opens fullscreen
	container.addEventListener("click", (e) => {
		// Ignore clicks on buttons themselves
		if ((e.target as HTMLElement).closest(".mermaid-btn-bar")) return;
		document.dispatchEvent(
			new CustomEvent("mermaid:fullscreen", {
				detail: { svgHtml, diagramType },
			}),
		);
	});
}

// ── The hook ────────────────────────────────────────────────────────────
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
				.replace(/Unsupported markdown: list/g, "\u2022 List item")
				.replace(/unsupported markdown: list/g, "\u2022 List item")
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
						const parts = viewBox.split(" ").map(Number);
						const width = parts[2];
						const height = parts[3];
						diagramWidth =
							typeof width === "number" && Number.isFinite(width) ? width : 0;
						diagramHeight =
							typeof height === "number" && Number.isFinite(height)
								? height
								: 0;
					}

					let measuredWidth = 0;

					if (container?.isConnected) {
						const containerRect = container.getBoundingClientRect();
						measuredWidth = containerRect.width;
					} else if (container?.parentElement) {
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
						const currentFontSize = Number.parseFloat(
							element.style.fontSize || "14",
						);
						if (currentFontSize < 16) {
							element.style.fontSize = "16px";
						} else if (currentFontSize < 20) {
							element.style.fontSize = `${Math.max(18, currentFontSize * 1.2)}px`;
						}
						element.style.fontWeight = "600";
					});

					container.appendChild(svgWrapper);

					// ── Inject interactive button bar ───────────────
					const diagramType = extractDiagramType(mermaidCode);
					injectHoverStyles();
					injectButtonBar(container, svgWrapper.innerHTML, diagramType);

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
