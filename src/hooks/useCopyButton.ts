import { useCallback, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import type { UseCopyButtonProps } from "types/codeblock";

export const useCopyButton = ({
  buttonRef,
  codeText,
  onCopy,
  toastStyles,
}: UseCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      return false;
    }
  };

  const handleCopy = useCallback(async () => {
    if (!buttonRef.current) return;
    window.clearTimeout(timeoutRef.current);
    const success = await copyToClipboard(codeText);
    if (success) {
      setIsCopied(true);
      timeoutRef.current = window.setTimeout(() => setIsCopied(false), 2000);
      toast.success("Code copied to clipboard", toastStyles.success);
    } else {
      toast.error("Failed to copy code", toastStyles.error);
    }
    onCopy();
  }, [buttonRef, codeText, onCopy, toastStyles]);

  return { isCopied, handleCopy };
};
