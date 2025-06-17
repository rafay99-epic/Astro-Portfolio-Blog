import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoEmbedProps {
  src: string;
  title: string;
  aspectRatio?: string;
  marginBottom?: string;
  maxWidth?: string;
  thumbnailUrl?: string;
  autoplay?: boolean;
  startTime?: number; // in seconds
  endTime?: number; // in seconds
  showControls?: boolean;
  muted?: boolean;
  loop?: boolean;
  quality?: "auto" | "low" | "medium" | "high";
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({
  src,
  title,
  aspectRatio = "16:9",
  marginBottom = "1em",
  maxWidth = "800px",
  thumbnailUrl,
  autoplay = false,
  startTime,
  endTime,
  showControls = true,
  muted = false,
  loop = false,
  quality = "auto",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showThumbnail, setShowThumbnail] = useState(Boolean(thumbnailUrl));

  const calculatePaddingBottom = () => {
    const [width, height] = aspectRatio.split(":").map(Number);
    return (height / width) * 100 + "%";
  };

  const processVideoUrl = (url: string): string => {
    let processedUrl = url;

    // Handle YouTube URLs
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("/").pop()
        : new URLSearchParams(url.split("?")[1]).get("v");

      const params = new URLSearchParams({
        autoplay: autoplay ? "1" : "0",
        mute: muted ? "1" : "0",
        controls: showControls ? "1" : "0",
        loop: loop ? "1" : "0",
        start: startTime?.toString() || "",
        end: endTime?.toString() || "",
      });

      processedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
    }
    // Handle Vimeo URLs
    else if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop();
      const params = new URLSearchParams({
        autoplay: autoplay ? "1" : "0",
        muted: muted ? "1" : "0",
        controls: showControls ? "1" : "0",
        loop: loop ? "1" : "0",
        quality: quality,
        ...(startTime && { "#t": startTime.toString() }),
      });

      processedUrl = `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
    }

    return processedUrl;
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleThumbnailClick = () => {
    setShowThumbnail(false);
    setIsPlaying(true);
  };

  const paddingBottom = calculatePaddingBottom();
  const processedSrc = processVideoUrl(src);

  return (
    <div className="flex justify-center" style={{ marginBottom }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full"
        style={{ maxWidth }}
      >
        <div
          className="relative overflow-hidden rounded-xl bg-[var(--accent-dark)]/50 backdrop-blur-sm shadow-lg"
          style={{
            paddingBottom,
            height: 0,
            width: "100%",
          }}
        >
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-[var(--accent-dark)]/50 backdrop-blur-sm"
              >
                <div className="text-[var(--text-light)] animate-pulse">
                  Loading video...
                </div>
              </motion.div>
            )}

            {hasError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-[var(--accent-dark)]/50 backdrop-blur-sm"
              >
                <div className="text-red-500 text-center p-4">
                  <p>Error loading video.</p>
                  <button
                    onClick={() => {
                      setHasError(false);
                      setIsLoading(true);
                      if (iframeRef.current) {
                        iframeRef.current.src = processedSrc;
                      }
                    }}
                    className="mt-2 px-4 py-2 bg-[var(--accent)]/20 hover:bg-[var(--accent)]/30 
                      rounded-md text-[var(--text-light)] transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </motion.div>
            )}

            {showThumbnail && thumbnailUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 cursor-pointer group"
                onClick={handleThumbnailClick}
              >
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center 
                  bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div
                    className="w-16 h-16 rounded-full bg-[var(--accent)]/90 
                    flex items-center justify-center shadow-lg"
                  >
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <iframe
            ref={iframeRef}
            src={!showThumbnail ? processedSrc : undefined}
            title={title}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            style={{ opacity: isLoading ? 0 : 1 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default VideoEmbed;
