import { useCopyButton } from "@hooks/useCopyButton";
import { Check, Copy } from "lucide-react";
import { memo, useRef } from "react";
import type { CopyButtonProps } from "types/codeblock";
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
			type="button"
			ref={buttonRef}
			className={buttonClassName}
			onClick={handleCopy}
			aria-label="Copy code to clipboard"
		>
			{isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
		</button>
	);
});

export default CopyButton;
