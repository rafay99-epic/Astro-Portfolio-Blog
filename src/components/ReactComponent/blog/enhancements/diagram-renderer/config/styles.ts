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
    tertiaryColor: "#565f89", // Changed to a neutral gray instead of red
    background: "#1a1b26",
    mainBkg: "#24283b",
    secondaryBkg: "#414868",
    tertiaryBkg: "#565f89",
    secondaryTextColor: "#a9b1d6",
    tertiaryTextColor: "#9aa5ce",
    secondaryBorderColor: "#bb9af7",
    tertiaryBorderColor: "#565f89", // Changed to match tertiaryColor
    noteBkgColor: "#24283b",
    noteTextColor: "#c0caf5",
    noteBorderColor: "#7aa2f7",
    darkMode: "true",
    fontFamily: "Poppins",
    fontSize: "18px", // Increased from 16px for much better readability
  },
  startOnLoad: true,
  securityLevel: "strict" as const,
  flowchart: {
    htmlLabels: true,
    curve: "basis" as const,
    nodeSpacing: 60, // Increased spacing between nodes
    rankSpacing: 60, // Increased spacing between ranks
    useMaxWidth: true, // Use maximum width for better layout
  },
  sequence: {
    useMaxWidth: true,
    diagramMarginX: 60, // Increased margins
    diagramMarginY: 15, // Increased margins
    actorMargin: 60, // Increased actor margin
    width: 180, // Increased width
    height: 80, // Increased height
    boxMargin: 15, // Increased box margin
    boxTextMargin: 8, // Increased text margin
    noteMargin: 15, // Increased note margin
    messageMargin: 40, // Increased message margin
    mirrorActors: true,
    bottomMarginAdj: 1,
    rightAngles: false,
    showSequenceNumbers: false,
    actorFontSize: 16, // Increased font size
    actorFontFamily: "Poppins, sans-serif",
    noteFontSize: 16, // Increased font size
    noteFontFamily: "Poppins, sans-serif",
    messageFontSize: 16, // Increased font size
    messageFontFamily: "Poppins, sans-serif",
  },
} as const;

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
