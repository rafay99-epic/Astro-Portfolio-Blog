import { useState, useRef, useEffect, useCallback } from "react";
import type { UseImageSliderResult } from "types/image_slider";

export const useImageSlider = (imagesLength: number): UseImageSliderResult => {
  const [current, setCurrent] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  const isImageLoaded = useCallback(
    (index: number) => loadedImages.has(index),
    [loadedImages]
  );

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  }, [imagesLength]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
  }, [imagesLength]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      sliderRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const currentTouch = e.touches[0].clientX;
      const diff = touchStart.current - currentTouch;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        touchStart.current = 0;
      }
    },
    [nextSlide, prevSlide]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prevSlide();
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "Escape" && isFullScreen) toggleFullScreen();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, prevSlide, nextSlide, toggleFullScreen]);

  return {
    current,
    isFullScreen,
    loadedImages,
    isHovered,
    sliderRef,
    containerRef,
    handleImageLoad,
    isImageLoaded,
    prevSlide,
    nextSlide,
    goToSlide,
    toggleFullScreen,
    handleTouchStart,
    handleTouchMove,
    handleMouseEnter,
    handleMouseLeave,
  };
};
