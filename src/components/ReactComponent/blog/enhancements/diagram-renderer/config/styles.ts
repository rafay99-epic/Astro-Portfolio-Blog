export const containerStyles = {
  diagram:
    "group relative bg-[#1a1b26] rounded-lg border border-[#565f89]/30 p-6 my-4 overflow-x-auto transition-all duration-200 hover:border-[#7aa2f7]/50 hover:shadow-lg hover:shadow-[#7aa2f7]/10",
  svgWrapper: "flex justify-center",
} as const;

export const mermaidConfig = {
  theme: "base" as const,
  themeVariables: {
    primaryColor: "#7aa2f7",
    primaryTextColor: "#c0caf5",
    primaryBorderColor: "#7aa2f7",
    lineColor: "#7aa2f7",
    secondaryColor: "#bb9af7",
    tertiaryColor: "#9ece6a",
    background: "#1a1b26",
    mainBkg: "#24283b",
    secondaryBkg: "#414868",
    tertiaryBkg: "#565f89",
    secondaryTextColor: "#a9b1d6",
    tertiaryTextColor: "#9aa5ce",
    secondaryBorderColor: "#bb9af7",
    tertiaryBorderColor: "#9ece6a",
    noteBkgColor: "#24283b",
    noteTextColor: "#c0caf5",
    noteBorderColor: "#7aa2f7",
    darkMode: "true",
    fontFamily: "ui-monospace, SFMono-Regular, Monaco, Menlo, monospace",
    fontSize: "14px",
  },
  startOnLoad: true,
  securityLevel: "loose" as const,
  flowchart: {
    htmlLabels: true,
    curve: "basis" as const,
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
