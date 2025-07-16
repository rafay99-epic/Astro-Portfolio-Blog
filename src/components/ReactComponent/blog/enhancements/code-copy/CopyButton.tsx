import React, { useRef } from "react";
import { memo } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import type { CopyButtonProps } from "types/codeblock";
import { useCopyButton } from "../../../../../hooks/useCopyButton";
import { STYLES, TOAST_STYLES } from "./styles";

const CopyButton = memo(function CopyButton({
  codeText,
  isMobile,
  onCopy,
}: CopyButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isCopied, handleCopy } = useCopyButton({
    buttonRef,
    codeText,
    onCopy,
    toastStyles: TOAST_STYLES,
  });

  const buttonClassName = `${STYLES.copyButton} ${isMobile ? STYLES.mobileButton : ""} ${
    isCopied ? "bg-[#9ece6a]/20 border-[#9ece6a]/30 text-[#9ece6a]" : ""
  }`;

  return (
    <button
      ref={buttonRef}
      className={buttonClassName}
      onClick={handleCopy}
      aria-label="Copy code to clipboard"
      role="button"
    >
      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
});

export default CopyButton;
