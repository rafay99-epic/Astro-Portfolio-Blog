import { memo, useCallback, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageWrapperProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  enableFullscreen?: boolean;
  showCaption?: boolean;
}

const ImageWrapper = memo(function ImageWrapper({
  src,
  alt,
  className = "",
  caption,
  width,
  height,
  loading = "lazy",
  enableFullscreen = true,
  showCaption = true,
}: ImageWrapperProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const handleImageClick = useCallback(() => {
    if (enableFullscreen) {
      setIsFullscreen(true);
    }
  }, [enableFullscreen]);

  const handleCloseFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        handleCloseFullscreen();
      }
    },
    [isFullscreen, handleCloseFullscreen],
  );

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === fullscreenRef.current) {
        handleCloseFullscreen();
      }
    },
    [handleCloseFullscreen],
  );

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (enableFullscreen) {
      setIsHovered(true);
    }
  }, [enableFullscreen]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen, handleKeyDown]);

  const imageProps = {
    src,
    alt,
    loading,
    onLoad: handleImageLoad,
    className: `max-w-full h-auto rounded-lg shadow-lg transition-all duration-300 ${
      enableFullscreen ? "cursor-zoom-in hover:shadow-xl" : ""
    } ${className}`,
    style: {
      filter: isImageLoaded ? "none" : "blur(5px)",
      width: width ? `${width}px` : undefined,
      height: height ? `${height}px` : undefined,
    },
  };

  return (
    <div className="my-4 text-center">
      <motion.div
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleImageClick}
        whileHover={enableFullscreen ? { scale: 1.02 } : {}}
        whileTap={enableFullscreen ? { scale: 0.98 } : {}}
      >
        <img {...imageProps} />

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && enableFullscreen && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="rounded-full bg-white/20 p-3 backdrop-blur-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading indicator */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
          </div>
        )}
      </motion.div>

      {/* Caption */}
      {showCaption && (caption || alt) && (
        <motion.p
          className="mt-2 text-sm italic text-[#a9b1d6]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {caption || alt}
        </motion.p>
      )}

      {/* Fullscreen Modal */}
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
          >
            {/* Close Button */}
            <motion.button
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              onClick={handleCloseFullscreen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close fullscreen"
            >
              <svg
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

            {/* Image Container */}
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
                  filter: isImageLoaded ? "none" : "blur(10px)",
                }}
                onLoad={handleImageLoad}
              />

              {/* Alt Text */}
              {(caption || alt) && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-center text-white backdrop-blur-sm"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm">{caption || alt}</p>
                </motion.div>
              )}
            </motion.div>

            {/* Instructions */}
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
    </div>
  );
});

export default ImageWrapper;
