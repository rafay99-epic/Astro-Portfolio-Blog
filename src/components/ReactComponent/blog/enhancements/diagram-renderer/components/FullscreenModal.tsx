import { useEffect, useRef } from "react";
import { LuChartColumn } from "react-icons/lu";
import { CheckIcon, CloseIcon, CopyIcon, DownloadIcon } from "../icons";

interface FullscreenModalProps {
	isOpen: boolean;
	onClose: () => void;
	onCopy: () => void;
	onDownload: () => void;
	copied: boolean;
	children: React.ReactNode;
	diagramType?: string;
}

// Memoization is handled by the React Compiler, so no manual memo/useMemo here.
function FullscreenModal({
	isOpen,
	onClose,
	onCopy,
	onDownload,
	copied,
	children,
	diagramType,
}: FullscreenModalProps) {
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	// While open: lock body scroll, close on Escape, trap Tab focus inside the
	// dialog, and restore focus to the trigger on close.
	useEffect(() => {
		if (!isOpen) return;

		const previouslyFocused = document.activeElement as HTMLElement | null;
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
				return;
			}
			if (event.key !== "Tab" || !dialogRef.current) return;

			const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
				'button, [href], input, [tabindex]:not([tabindex="-1"])',
			);
			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			if (!first || !last) return;

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", onKeyDown);
		closeButtonRef.current?.focus();

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = originalOverflow;
			previouslyFocused?.focus?.();
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const copyButtonClass = `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 border ${
		copied
			? "bg-[#9ece6a]/20 border-[#9ece6a]/50 text-[#9ece6a]"
			: "bg-[#24283b] border-[#565f89]/30 text-[#a9b1d6] hover:bg-[#414868] hover:border-[#7aa2f7]/50 hover:text-[#7aa2f7]"
	}`;
	const downloadButtonClass =
		"flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 border bg-[#24283b] border-[#565f89]/30 text-[#a9b1d6] hover:bg-[#414868] hover:border-[#bb9af7]/50 hover:text-[#bb9af7]";

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
			{/* Backdrop dismiss target — a real button (native interactivity, and
			    it sits outside the dialog so it isn't part of the focus trap). */}
			<button
				type="button"
				aria-label="Close diagram viewer"
				tabIndex={-1}
				className="absolute inset-0 cursor-default"
				onClick={onClose}
			/>
			<div
				ref={dialogRef}
				className="relative z-10 max-h-full w-full max-w-7xl overflow-hidden rounded-xl border border-[#565f89]/30 bg-[#1a1b26] shadow-2xl"
				role="dialog"
				aria-modal="true"
				aria-label={diagramType ? `${diagramType} Diagram` : "Diagram Viewer"}
			>
				<div className="flex items-center justify-between border-b border-[#565f89]/20 bg-[#24283b] p-4">
					<h3 className="flex items-center gap-2 text-lg font-semibold text-[#c0caf5]">
						<LuChartColumn className="h-5 w-5 text-[#7aa2f7]" />
						{diagramType ? `${diagramType} Diagram` : "Diagram Viewer"}
					</h3>
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={onCopy}
							className={copyButtonClass}
							title={copied ? "SVG Copied!" : "Copy SVG"}
						>
							{copied ? <CheckIcon /> : <CopyIcon />}
							<span>{copied ? "SVG Copied!" : "Copy SVG"}</span>
						</button>
						<button
							type="button"
							onClick={onDownload}
							className={downloadButtonClass}
							title="Download as PNG"
						>
							<DownloadIcon />
							<span>Download PNG</span>
						</button>
						<div className="flex items-center gap-2 text-sm text-[#a9b1d6]">
							<kbd className="rounded border border-[#565f89]/30 bg-[#24283b] px-2 py-1 font-mono text-xs">
								ESC
							</kbd>
							<span>to exit</span>
						</div>
						<button
							type="button"
							ref={closeButtonRef}
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
}

export default FullscreenModal;
