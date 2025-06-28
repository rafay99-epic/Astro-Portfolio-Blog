import type { Styles } from "types/codeblock";

export const STYLES: Styles = {
  buttonContainer:
    "absolute top-3 right-3 flex items-center gap-2 z-10 touch-manipulation",
  languageLabel: "text-xs font-medium px-2 py-1 rounded select-none",
  copyButton:
    "flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 touch-manipulation bg-[#24283b]/50 hover:bg-[#414868]/50",
  mobileButton: "w-10 h-10",

  default: {
    background: "rgba(36, 40, 59, 0.5)",
    borderColor: "rgba(86, 95, 137, 0.2)",
    color: "#a9b1d6",
  },
  hover: {
    background: "rgba(65, 72, 104, 0.5)",
    borderColor: "rgba(122, 162, 247, 0.3)",
    color: "#7aa2f7",
  },
  success: {
    background: "rgba(158, 206, 106, 0.2)",
    borderColor: "rgba(158, 206, 106, 0.3)",
    color: "#9ece6a",
  },
  language: {
    color: "#565f89",
    background: "rgba(36, 40, 59, 0.5)",
  },
} as const;

export const TOAST_STYLES = {
  success: {
    style: {
      background: "rgba(36, 40, 59, 0.8)",
      color: "#9ece6a",
      border: "1px solid rgba(158, 206, 106, 0.3)",
      borderRadius: "0.75rem",
      padding: "0.75rem 1rem",
      boxShadow: "0 4px 12px rgba(158, 206, 106, 0.1)",
      backdropFilter: "blur(10px)",
    },
    iconTheme: {
      primary: "#9ece6a",
      secondary: "#1a1b26",
    },
  },
  error: {
    style: {
      background: "rgba(36, 40, 59, 0.8)",
      color: "#f7768e",
      border: "1px solid rgba(247, 118, 142, 0.3)",
      borderRadius: "0.75rem",
      padding: "0.75rem 1rem",
      boxShadow: "0 4px 12px rgba(247, 118, 142, 0.1)",
      backdropFilter: "blur(10px)",
    },
    iconTheme: {
      primary: "#f7768e",
      secondary: "#1a1b26",
    },
  },
};
