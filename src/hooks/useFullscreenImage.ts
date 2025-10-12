import { useCallback, useState, useRef, useEffect } from "react";

interface UseFullscreenImageOptions {
  onOpen?: () => void;
  onClose?: () => void;
  preventBodyScroll?: boolean;
}

export function useFullscreenImage(options: UseFullscreenImageOptions = {}) {
  const { onOpen, onClose, preventBodyScroll = true } = options;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageData, setImageData] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);

  const timeoutRef = useRef<number | null>(null);

  const openFullscreen = useCallback(
    (src: string, alt: string, caption?: string) => {
      setImageData({ src, alt, caption });
      setIsFullscreen(true);
      onOpen?.();
    },
    [onOpen],
  );

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setImageData(null);
    onClose?.();
  }, [onClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        closeFullscreen();
      }
    },
    [isFullscreen, closeFullscreen],
  );

  const handleBackdropClick = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement>,
      backdropRef: React.RefObject<HTMLDivElement | null>,
    ) => {
      if (event.target === backdropRef.current) {
        closeFullscreen();
      }
    },
    [closeFullscreen],
  );

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
      if (preventBodyScroll) {
        document.body.style.overflow = "hidden";
      }
    } else {
      if (preventBodyScroll) {
        document.body.style.overflow = "unset";
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (preventBodyScroll) {
        document.body.style.overflow = "unset";
      }
    };
  }, [isFullscreen, handleKeyDown, preventBodyScroll]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isFullscreen,
    imageData,
    openFullscreen,
    closeFullscreen,
    handleBackdropClick,
  };
}
