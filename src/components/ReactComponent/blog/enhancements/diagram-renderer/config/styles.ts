export const containerStyles = {
	diagram:
		"relative bg-[#1a1b26] rounded-lg border border-[#565f89]/30 p-4 md:p-6 my-4 overflow-hidden",
	svgWrapper: "flex justify-center w-full overflow-x-auto",
} as const;

export const mermaidConfig = {
	theme: "base" as const,
	themeVariables: {
		primaryColor: "#7aa2f7",
		primaryTextColor: "#c0caf5",
		primaryBorderColor: "#7aa2f7",
		lineColor: "#7aa2f7",
		secondaryColor: "#bb9af7",
		tertiaryColor: "#565f89",
		background: "#1a1b26",
		mainBkg: "#24283b",
		secondaryBkg: "#414868",
		tertiaryBkg: "#565f89",
		secondaryTextColor: "#a9b1d6",
		tertiaryTextColor: "#9aa5ce",
		secondaryBorderColor: "#bb9af7",
		tertiaryBorderColor: "#565f89",
		noteBkgColor: "#24283b",
		noteTextColor: "#c0caf5",
		noteBorderColor: "#7aa2f7",
		darkMode: "true",
		fontFamily: "Poppins",
		fontSize: "18px",
	},
	startOnLoad: true,
	securityLevel: "strict" as const,
	flowchart: {
		htmlLabels: true,
		curve: "basis" as const,
		nodeSpacing: 60,
		rankSpacing: 60,
		useMaxWidth: true,
	},
	sequence: {
		useMaxWidth: true,
		diagramMarginX: 60,
		diagramMarginY: 15,
		actorMargin: 60,
		width: 180,
		height: 80,
		boxMargin: 15,
		boxTextMargin: 8,
		noteMargin: 15,
		messageMargin: 40,
		mirrorActors: true,
		bottomMarginAdj: 1,
		rightAngles: false,
		showSequenceNumbers: false,
		actorFontSize: 16,
		actorFontFamily: "Poppins, sans-serif",
		noteFontSize: 16,
		noteFontFamily: "Poppins, sans-serif",
		messageFontSize: 16,
		messageFontFamily: "Poppins, sans-serif",
	},
} as const;

// ---------- DOM-injected button bar styles ----------

export const buttonBarStyles = {
	container: {
		position: "absolute",
		top: "6px",
		right: "6px",
		display: "flex",
		gap: "3px",
		opacity: "0",
		transition: "opacity 0.2s ease",
		zIndex: "10",
	} as Record<string, string>,

	button: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "28px",
		height: "28px",
		padding: "0",
		borderRadius: "6px",
		fontSize: "0",
		lineHeight: "0",
		border: "1px solid rgba(86,95,137,0.3)",
		backgroundColor: "rgba(36,40,59,0.85)",
		color: "#a9b1d6",
		cursor: "pointer",
		backdropFilter: "blur(4px)",
		transition: "all 0.2s ease",
	} as Record<string, string>,

	badge: {
		padding: "1px 5px",
		borderRadius: "4px",
		fontSize: "10px",
		fontWeight: "500",
		lineHeight: "16px",
		border: "1px solid rgba(86,95,137,0.3)",
		backgroundColor: "rgba(36,40,59,0.85)",
		color: "#565f89",
		backdropFilter: "blur(4px)",
	} as Record<string, string>,
} as const;

const MERMAID_HOVER_STYLE_ID = "mermaid-hover-styles";

/** Injects a <style> tag once for hover-reveal behaviour on diagram buttons. */
export function injectHoverStyles(): void {
	if (document.getElementById(MERMAID_HOVER_STYLE_ID)) return;
	const style = document.createElement("style");
	style.id = MERMAID_HOVER_STYLE_ID;
	style.textContent = `
.mermaid-diagram-container { cursor: pointer; }
.mermaid-diagram-container:hover .mermaid-btn-bar { opacity: 1 !important; }
.mermaid-btn:hover {
  background-color: rgba(65,72,104,0.5) !important;
  border-color: rgba(122,162,247,0.5) !important;
  color: #7aa2f7 !important;
}`;
	document.head.appendChild(style);
}

export const DIAGRAM_TYPES = {
	graph: "Flowchart",
	flowchart: "Flowchart",
	sequencediagram: "Sequence",
	classdiagram: "Class",
	statediagram: "State",
	erdiagram: "ER",
	gantt: "Gantt",
	pie: "Pie Chart",
	journey: "User Journey",
	gitgraph: "Git Graph",
	mindmap: "Mindmap",
	timeline: "Timeline",
} as const;
