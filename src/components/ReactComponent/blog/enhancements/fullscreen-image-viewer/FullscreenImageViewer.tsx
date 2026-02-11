import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";

interface FullscreenImageViewerProps {
	src: string;
	alt: string;
	className?: string;
	onImageClick?: () => void;
}

const FullscreenImageViewer = memo(function FullscreenImageViewer({
	src,
	alt,
	className = "",
	onImageClick,
}: FullscreenImageViewerProps) {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false);
	const [isFullscreenLoaded, setIsFullscreenLoaded] = useState(false);
	const [hasThumbnailError, setHasThumbnailError] = useState(false);
	const [hasFullscreenError, setHasFullscreenError] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);
	const fullscreenRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	const handleImageClick = useCallback(() => {
		setIsFullscreen(true);
		onImageClick?.();
		setTimeout(() => {
			if (closeButtonRef.current) {
				closeButtonRef.current.focus();
			}
		}, 100);
	}, [onImageClick]);

	const handleCloseFullscreen = useCallback(() => {
		setIsFullscreen(false);
		if (imgRef.current) {
			imgRef.current.focus();
		}
	}, []);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleCloseFullscreen();
			}
		},
		[handleCloseFullscreen],
	);

	const handleBackdropClick = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (event.target === fullscreenRef.current) {
				handleCloseFullscreen();
			}
		},
		[handleCloseFullscreen],
	);

	useEffect(() => {
		if (isFullscreen) {
			document.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";

			return () => {
				document.removeEventListener("keydown", handleKeyDown);
				document.body.style.overflow = "unset";
			};
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isFullscreen, handleKeyDown]);

	const handleThumbnailLoad = useCallback(() => {
		setIsThumbnailLoaded(true);
		setHasThumbnailError(false);
	}, []);

	const handleThumbnailError = useCallback(() => {
		setIsThumbnailLoaded(false);
		setHasThumbnailError(true);
	}, []);

	const handleFullscreenLoad = useCallback(() => {
		setIsFullscreenLoaded(true);
		setHasFullscreenError(false);
	}, []);

	const handleFullscreenError = useCallback(() => {
		setIsFullscreenLoaded(false);
		setHasFullscreenError(true);
	}, []);

	return (
		<>
			<motion.img
				ref={imgRef}
				src={src}
				alt={alt}
				className={`cursor-zoom-in transition-transform duration-200 hover:scale-[1.02] ${className}`}
				onClick={handleImageClick}
				onLoad={handleThumbnailLoad}
				onError={handleThumbnailError}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleImageClick();
					}
				}}
				loading="lazy"
				tabIndex={0}
				role="button"
				aria-label={`Open ${alt} in fullscreen`}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				style={{
					filter: hasThumbnailError
						? "none"
						: isThumbnailLoaded
							? "none"
							: "blur(5px)",
				}}
			/>

			{}
			{hasThumbnailError && (
				<div className="flex flex-col items-center justify-center p-4 text-center">
					<div className="mb-2 text-red-500">
						<svg
							aria-hidden="true"
							focusable="false"
							width="48"
							height="48"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="15" y1="9" x2="9" y2="15" />
							<line x1="9" y1="9" x2="15" y2="15" />
						</svg>
					</div>
					<p className="text-sm text-gray-500">Failed to load image</p>
					{alt && <p className="text-xs text-gray-400">Alt text: {alt}</p>}
				</div>
			)}

			<AnimatePresence>
				{isFullscreen && (
					<motion.div
						ref={fullscreenRef}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
						onClick={handleBackdropClick}
						role="dialog"
						aria-modal="true"
						aria-labelledby="fullscreen-image-title"
						aria-describedby="fullscreen-image-description"
					>
						{}
						<motion.button
							type="button"
							ref={closeButtonRef}
							className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
							onClick={handleCloseFullscreen}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							aria-label="Close fullscreen"
							autoFocus
						>
							<svg
								aria-hidden="true"
								focusable="false"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						</motion.button>

						{}
						<motion.div
							className="relative max-h-[90vh] max-w-[90vw]"
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<img
								src={src}
								alt={alt}
								className="max-h-[90vh] max-w-[90vw] object-contain"
								style={{
									filter: hasFullscreenError
										? "none"
										: isFullscreenLoaded
											? "none"
											: "blur(10px)",
								}}
								onLoad={handleFullscreenLoad}
								onError={handleFullscreenError}
								id="fullscreen-image-title"
							/>

							{}
							{hasFullscreenError && (
								<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4 text-white">
									<div className="mb-2 text-red-400">
										<svg
											aria-hidden="true"
											focusable="false"
											width="48"
											height="48"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<circle cx="12" cy="12" r="10" />
											<line x1="15" y1="9" x2="9" y2="15" />
											<line x1="9" y1="9" x2="15" y2="15" />
										</svg>
									</div>
									<p className="text-sm">Failed to load image</p>
									{alt && (
										<p className="text-xs text-gray-300">Alt text: {alt}</p>
									)}
								</div>
							)}

							{}
							{!isFullscreenLoaded && !hasFullscreenError && (
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
								</div>
							)}

							{}
							{alt && (
								<motion.div
									className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-center text-white backdrop-blur-sm"
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.2 }}
									id="fullscreen-image-description"
								>
									<p className="text-sm">{alt}</p>
								</motion.div>
							)}
						</motion.div>

						{}
						<motion.div
							className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white/70"
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							<p className="text-xs">
								Press <kbd className="rounded bg-white/20 px-1">ESC</kbd> or
								click outside to close
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
});

export default FullscreenImageViewer;
