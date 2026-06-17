import {
	buttonBarStyles,
	containerStyles,
	DIAGRAM_TYPES,
	injectHoverStyles,
	mermaidConfig,
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

// ── Lazy Mermaid loader (shared singleton) ──────────────────────────────
// Mermaid is the heaviest dependency on the site (its own vendor chunk, plus
// d3/dagre/cytoscape). Only import and initialize it the first time a diagram
// actually appears, and reuse that single instance everywhere.
type MermaidApi = typeof import("mermaid")["default"];
let mermaidPromise: Promise<MermaidApi> | null = null;
function ensureMermaid(): Promise<MermaidApi> {
	if (!mermaidPromise) {
		mermaidPromise = import("mermaid").then(({ default: mermaid }) => {
			mermaid.initialize(mermaidConfig);
			return mermaid;
		});
	}
	return mermaidPromise;
}

// ── Map a diagram's first line to a human-readable type label ───────────
function extractDiagramType(mermaidCode: string): string {
	const firstLine = (mermaidCode.trim().split("\n")[0] ?? "").toLowerCase();
	const found = Object.entries(DIAGRAM_TYPES).find(([key]) =>
		firstLine.includes(key),
	);
	return found ? found[1] : "Mermaid";
}

// ── Button-bar colors (kept in sync with buttonBarStyles.button) ─────────
const BTN_COLOR = "#a9b1d6";
const BTN_BORDER = "rgba(86,95,137,0.3)";
const BTN_COLOR_ACTIVE = "#9ece6a";
const BTN_BORDER_ACTIVE = "rgba(158,206,106,0.5)";

type DiagramAction = "fullscreen" | "download" | "copy";

// Per-diagram payload, keyed by its container element. A WeakMap keeps the
// (potentially large) SVG string off the DOM and lets entries be collected
// automatically once a container is removed and garbage-collected.
const diagramData = new WeakMap<HTMLElement, MermaidEventDetail>();

// ── Helper: dispatch a typed mermaid custom event ───────────────────────
function dispatchMermaid<K extends keyof DocumentEventMap>(
	type: K,
	detail: DocumentEventMap[K] extends CustomEvent<infer D> ? D : never,
): void {
	document.dispatchEvent(new CustomEvent(type, { detail }));
}

// ── Helper: create a single icon-only button ────────────────────────────
function createBtn(
	iconHtml: string,
	label: string,
	action: DiagramAction,
): HTMLButtonElement {
	const btn = document.createElement("button");
	btn.type = "button";
	btn.className = "mermaid-btn";
	btn.setAttribute("data-mermaid-action", action);
	btn.title = label;
	btn.setAttribute("aria-label", label);
	Object.assign(btn.style, buttonBarStyles.button);
	btn.innerHTML = iconHtml;
	return btn;
}

// ── Helper: build the button bar and attach it to the container ─────────
// No per-element listeners are bound here; clicks are handled by a single
// delegated listener installed by the hook (see useEffect below).
function injectButtonBar(
	container: HTMLDivElement,
	svgHtml: string,
	diagramType: string,
): void {
	diagramData.set(container, { svgHtml, diagramType });

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

	bar.appendChild(createBtn(ICON_FULLSCREEN, "Fullscreen", "fullscreen"));
	bar.appendChild(createBtn(ICON_DOWNLOAD, "Download", "download"));
	bar.appendChild(createBtn(ICON_COPY, "Copy", "copy"));

	container.appendChild(bar);
}

// ── Delegated click handler shared by every diagram on the page ─────────
// A stable, module-level reference so add/removeEventListener pair up and
// repeated registrations (multiple hook mounts) collapse to one.
function handleDiagramClick(event: MouseEvent): void {
	const target = event.target as HTMLElement | null;
	const container = target?.closest<HTMLElement>(".mermaid-diagram-container");
	if (!container) return;

	const data = diagramData.get(container);
	if (!data) return;

	const btn = target?.closest<HTMLElement>(".mermaid-btn");
	if (!btn) {
		// Click on the diagram body (not a button) opens fullscreen.
		dispatchMermaid("mermaid:fullscreen", data);
		return;
	}

	switch (btn.getAttribute("data-mermaid-action") as DiagramAction | null) {
		case "fullscreen":
			dispatchMermaid("mermaid:fullscreen", data);
			break;
		case "download":
			dispatchMermaid("mermaid:download", data);
			break;
		case "copy":
			dispatchMermaid("mermaid:copy", { svgHtml: data.svgHtml });
			// Visual feedback
			btn.style.color = BTN_COLOR_ACTIVE;
			btn.style.borderColor = BTN_BORDER_ACTIVE;
			setTimeout(() => {
				btn.style.color = BTN_COLOR;
				btn.style.borderColor = BTN_BORDER;
			}, 2000);
			break;
	}
}

// ── The hook ────────────────────────────────────────────────────────────
export function useDiagramRenderer(): void {
	const renderDiagram = useCallback(async (codeElement: Element) => {
		const preElement = codeElement.parentElement;
		if (!preElement || preElement.tagName !== "PRE") return;

		const mermaidCode = codeElement.textContent
			?.trim()
			.replace(/unsupported markdown: list/gi, "• List item")
			.replace(/unsupported markdown: /gi, "");
		if (!mermaidCode) return;

		try {
			const mermaid = await ensureMermaid();
			const diagramId = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).slice(2)}`;

			const renderResult = await mermaid.render(diagramId, mermaidCode);
			const svg =
				typeof renderResult === "string" ? renderResult : renderResult.svg;

			const svgWrapper = document.createElement("div");
			svgWrapper.className = containerStyles.svgWrapper;
			svgWrapper.innerHTML = svg;

			const svgElement = svgWrapper.querySelector("svg");
			if (!svgElement) return;

			// Sizing and text styling are owned by CSS
			// (`.mermaid-diagram-container svg` in global.css) together with
			// Mermaid's own `useMaxWidth`, so the SVG scales responsively to its
			// container. Here we only lock the aspect ratio while it scales.
			svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

			const container = document.createElement("div");
			container.className = `${containerStyles.diagram} mermaid-diagram-container`;
			container.appendChild(svgWrapper);

			const diagramType = extractDiagramType(mermaidCode);
			injectHoverStyles();
			injectButtonBar(container, svgWrapper.innerHTML, diagramType);

			preElement.parentNode?.replaceChild(container, preElement);
			codeElement.setAttribute("data-mermaid-rendered", "true");
		} catch (error) {
			console.error("Failed to render Mermaid diagram:", error);
		}
	}, []);

	useEffect(() => {
		const renderDiagrams = () => {
			const diagrams = document.querySelectorAll(
				"pre code.language-mermaid:not([data-mermaid-rendered])",
			);
			// Mermaid is only imported once a diagram is actually present
			// (see ensureMermaid), so diagram-free pages never pay for it.
			diagrams.forEach(renderDiagram);
		};

		// Coalesce bursts of mutations into a single render pass per frame.
		let scheduled = false;
		const scheduleRender = () => {
			if (scheduled) return;
			scheduled = true;
			requestAnimationFrame(() => {
				scheduled = false;
				renderDiagrams();
			});
		};

		const observer = new MutationObserver((mutations) => {
			// Re-render when nodes are added (islands/content mount) OR when text
			// streams into an already-present <pre><code>. With
			// experimental.queuedRendering, slot content streams in after first
			// paint, so a childList-only watch misses the late text and the block
			// never renders. Watching characterData closes that gap.
			const relevant = mutations.some(
				(m) => m.addedNodes.length > 0 || m.type === "characterData",
			);
			if (relevant) scheduleRender();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
			characterData: true,
		});

		// One delegated listener handles clicks for every rendered diagram.
		document.addEventListener("click", handleDiagramClick);

		scheduleRender();

		return () => {
			observer.disconnect();
			document.removeEventListener("click", handleDiagramClick);
		};
	}, [renderDiagram]);
}
