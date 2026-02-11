import { useMemo } from "react";
import { memo } from "react";
import { LuChartColumn } from "react-icons/lu";
import { CloseIcon, CopyIcon, CheckIcon } from "../icons";

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
  copied: boolean;
  children: React.ReactNode;
  diagramType?: string;
}

const FullscreenModal = memo(
  function FullscreenModal({
    isOpen,
    onClose,
    onCopy,
    copied,
    children,
    diagramType,
  }: FullscreenModalProps) {
    const modalClasses = useMemo(
      () => ({
        copyButton: `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 border ${
          copied
            ? "bg-[#9ece6a]/20 border-[#9ece6a]/50 text-[#9ece6a]"
            : "bg-[#24283b] border-[#565f89]/30 text-[#a9b1d6] hover:bg-[#414868] hover:border-[#7aa2f7]/50 hover:text-[#7aa2f7]"
        }`,
      }),
      [copied],
    );

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative max-h-full w-full max-w-7xl overflow-hidden rounded-xl border border-[#565f89]/30 bg-[#1a1b26] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-[#565f89]/20 bg-[#24283b] p-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#c0caf5]">
              <LuChartColumn className="h-5 w-5 text-[#7aa2f7]" />
              {diagramType ? `${diagramType} Diagram` : "Diagram Viewer"}
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={onCopy}
                className={modalClasses.copyButton}
                title={copied ? "SVG Copied!" : "Copy SVG"}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? "SVG Copied!" : "Copy SVG"}</span>
              </button>
              <div className="flex items-center gap-2 text-sm text-[#a9b1d6]">
                <kbd className="rounded border border-[#565f89]/30 bg-[#24283b] px-2 py-1 font-mono text-xs">
                  ESC
                </kbd>
                <span>to exit</span>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-[#a9b1d6] transition-all duration-200 hover:bg-[#414868] hover:text-[#c0caf5]"
                title="Close fullscreen"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="max-h-[calc(100vh-120px)] overflow-auto bg-[#1a1b26] p-6">
            <div className="flex justify-center">{children}</div>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isOpen === nextProps.isOpen &&
      prevProps.copied === nextProps.copied &&
      prevProps.diagramType === nextProps.diagramType
    );
  },
);

export default FullscreenModal;
