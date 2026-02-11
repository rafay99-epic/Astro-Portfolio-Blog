import { memo } from "react";

export const CopyIcon = memo(function CopyIcon() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
		</svg>
	);
});

export const CheckIcon = memo(function CheckIcon() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<polyline points="20,6 9,17 4,12"></polyline>
		</svg>
	);
});

export const FullscreenIcon = memo(function FullscreenIcon() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
		</svg>
	);
});

export const CloseIcon = memo(function CloseIcon() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<line x1="18" y1="6" x2="6" y2="18"></line>
			<line x1="6" y1="6" x2="18" y2="18"></line>
		</svg>
	);
});
