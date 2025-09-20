import  { useMemo } from "react";
import { memo } from "react";
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
      [copied]
    );

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="relative max-w-7xl max-h-full w-full bg-[#1a1b26] rounded-xl border border-[#565f89]/30 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-[#565f89]/20 bg-[#24283b]">
            <h3 className="text-lg font-semibold text-[#c0caf5] flex items-center gap-2">
              <span>📊</span>
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
              <div className="flex items-center gap-2 text-[#a9b1d6] text-sm">
                <kbd className="px-2 py-1 bg-[#24283b] border border-[#565f89]/30 rounded text-xs font-mono">
                  ESC
                </kbd>
                <span>to exit</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#414868] rounded-lg text-[#a9b1d6] hover:text-[#c0caf5] transition-all duration-200"
                title="Close fullscreen"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-auto max-h-[calc(100vh-120px)] bg-[#1a1b26]">
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
  }
);

export default FullscreenModal;
