import  { useMemo } from "react";
import { memo } from "react";
import { CopyIcon, CheckIcon, FullscreenIcon } from "../icons";

interface DiagramButtonsProps {
  onCopy: () => void;
  onFullscreen: () => void;
  copied: boolean;
  diagramType?: string;
}

const DiagramButtons = memo(
  function DiagramButtons({
    onCopy,
    onFullscreen,
    copied,
    diagramType,
  }: DiagramButtonsProps) {
    const buttonClasses = useMemo(
      () => ({
        copyButton: `flex items-center gap-1 px-2 py-1 rounded text-xs transition-all duration-200 backdrop-blur-sm border ${
          copied
            ? "bg-[#9ece6a]/20 border-[#9ece6a]/50 text-[#9ece6a]"
            : "bg-[#24283b]/80 border-[#565f89]/30 text-[#a9b1d6] hover:bg-[#414868]/50 hover:border-[#7aa2f7]/50 hover:text-[#7aa2f7]"
        }`,
        fullscreenButton:
          "flex items-center gap-1 px-2 py-1 rounded text-xs transition-all duration-200 backdrop-blur-sm bg-[#24283b]/80 border border-[#565f89]/30 text-[#a9b1d6] hover:bg-[#414868]/50 hover:border-[#bb9af7]/50 hover:text-[#bb9af7]",
      }),
      [copied]
    );

    return (
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
        {diagramType && (
          <span className="text-xs font-medium text-[#565f89] bg-[#24283b]/80 px-1.5 py-0.5 rounded backdrop-blur-sm border border-[#565f89]/30">
            {diagramType}
          </span>
        )}
        <button
          onClick={onCopy}
          className={buttonClasses.copyButton}
          title={copied ? "SVG Copied!" : "Copy SVG"}
          aria-label={
            copied ? "SVG copied to clipboard" : "Copy SVG to clipboard"
          }
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
        </button>
        <button
          onClick={onFullscreen}
          className={buttonClasses.fullscreenButton}
          title="View fullscreen"
          aria-label="View diagram in fullscreen"
        >
          <FullscreenIcon />
          <span className="text-xs">Full</span>
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.copied === nextProps.copied &&
      prevProps.diagramType === nextProps.diagramType &&
      prevProps.onCopy === nextProps.onCopy &&
      prevProps.onFullscreen === nextProps.onFullscreen
    );
  }
);

export default DiagramButtons;
