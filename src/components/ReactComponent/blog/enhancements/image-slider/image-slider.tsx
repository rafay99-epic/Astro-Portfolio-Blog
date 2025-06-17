import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSliderProps {
  images: string[];
  aspectRatio?: "square" | "video" | "wide" | "auto";
  showThumbnails?: boolean;
  layout?: "classic" | "modern" | "minimal" | "gallery" | "carousel";
  theme?: "light" | "dark" | "glass";
  thumbnailPosition?: "bottom" | "left" | "right";
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  aspectRatio = "auto",
  showThumbnails = true,
  layout = "classic",
  theme = "dark",
  thumbnailPosition = "bottom",
}) => {
  const [current, setCurrent] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "wide":
        return "aspect-[21/9]";
      default:
        return "";
    }
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const isImageLoaded = (index: number) => loadedImages.has(index);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      sliderRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  // Touch handling
  const touchStart = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
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
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prevSlide();
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "Escape" && isFullScreen) toggleFullScreen();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  // Preload next and previous images
  useEffect(() => {
    const preloadImage = (index: number) => {
      const img = new Image();
      img.src = images[index];
      img.onload = () => handleImageLoad(index);
    };

    const nextIndex = (current + 1) % images.length;
    const prevIndex = current === 0 ? images.length - 1 : current - 1;

    if (!isImageLoaded(nextIndex)) preloadImage(nextIndex);
    if (!isImageLoaded(prevIndex)) preloadImage(prevIndex);
    if (!isImageLoaded(current)) preloadImage(current);
  }, [current, images]);

  const getThemeClasses = () => {
    switch (theme) {
      case "light":
        return {
          container: "bg-[var(--text-light)]",
          controls: "bg-[var(--text-light)]/75 text-[var(--accent-dark)]",
          buttons:
            "bg-[var(--text-light)]/75 text-[var(--accent-dark)] hover:bg-[var(--text-light)]",
          ring: "ring-[var(--accent)]",
        };
      case "glass":
        return {
          container: "backdrop-blur-md bg-[var(--accent-dark)]/10",
          controls:
            "backdrop-blur-md bg-[var(--accent-dark)]/20 text-[var(--text-light)]",
          buttons:
            "backdrop-blur-md bg-[var(--accent)]/20 text-[var(--text-light)] hover:bg-[var(--accent)]/30",
          ring: "ring-[var(--accent)]",
        };
      default: // dark
        return {
          container: "bg-[var(--accent-dark)]",
          controls: "bg-[var(--accent-dark)]/75 text-[var(--text-light)]",
          buttons:
            "bg-[var(--accent-dark)]/75 text-[var(--text-light)] hover:bg-[var(--accent)]",
          ring: "ring-[var(--accent)]",
        };
    }
  };

  const getLayoutClasses = () => {
    const themeClasses = getThemeClasses();

    switch (layout) {
      case "modern":
        return {
          container: "rounded-2xl overflow-hidden shadow-2xl",
          image: "transition-all duration-500 ease-out",
          controls:
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          thumbnails:
            thumbnailPosition === "bottom"
              ? "flex gap-2 p-4 justify-center"
              : "flex flex-col gap-2 p-4",
        };
      case "minimal":
        return {
          container: "rounded-none",
          image: "transition-all duration-300",
          controls:
            "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          thumbnails: "hidden",
        };
      case "gallery":
        return {
          container: "rounded-lg shadow-xl p-4",
          image: "transition-all duration-500 ease-out rounded-lg",
          controls: "opacity-100",
          thumbnails: "grid grid-cols-4 gap-2 p-4",
        };
      case "carousel":
        return {
          container: "rounded-none overflow-visible",
          image:
            "transition-all duration-500 ease-out scale-90 hover:scale-100",
          controls: "opacity-100",
          thumbnails: "flex gap-4 justify-center py-4",
        };
      default: // classic
        return {
          container: "rounded-lg overflow-hidden",
          image: "transition-all duration-300",
          controls: "opacity-100",
          thumbnails: "flex gap-2 p-2",
        };
    }
  };

  const layoutClasses = getLayoutClasses();
  const themeClasses = getThemeClasses();

  const containerClasses = `
    relative w-full max-w-7xl mx-auto
    ${layoutClasses.container}
    ${themeClasses.container}
    ${isFullScreen ? "fixed inset-0 z-50" : ""}
    group
  `;

  const mainContentClasses = `
    relative flex
    ${thumbnailPosition === "left" ? "flex-row-reverse" : ""}
    ${thumbnailPosition === "right" ? "flex-row" : "flex-col"}
  `;

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={mainContentClasses}>
        <div
          ref={sliderRef}
          className="relative flex-grow"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: isImageLoaded(current) ? 1 : 0.5,
                scale: isImageLoaded(current) ? 1 : 1.1,
                filter: isImageLoaded(current) ? "blur(0px)" : "blur(10px)",
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`relative ${getAspectRatioClass()}`}
            >
              <img
                src={images[current]}
                alt={`Slide ${current + 1}`}
                onLoad={() => handleImageLoad(current)}
                className={`w-full ${
                  isFullScreen
                    ? "h-screen object-contain"
                    : "h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] object-cover"
                } ${layoutClasses.image}`}
              />

              {!isImageLoaded(current) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-[var(--accent-dark)]/10"
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                      transition: {
                        duration: 1.5,
                        ease: "linear",
                        repeat: Infinity,
                      },
                    }}
                    className={`w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full`}
                  />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className={layoutClasses.controls}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className={`absolute top-1/2 left-4 transform -translate-y-1/2 p-3 rounded-full 
                opacity-75 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 
                ${themeClasses.buttons} ${themeClasses.ring}`}
              aria-label="Previous slide"
            >
              ❮
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 p-3 rounded-full 
                opacity-75 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 
                ${themeClasses.buttons} ${themeClasses.ring}`}
              aria-label="Next slide"
            >
              ❯
            </motion.button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-3 py-1 rounded-full text-sm ${themeClasses.controls}`}
              >
                {current + 1} / {images.length}
              </motion.span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullScreen}
                className={`px-3 py-1 rounded-full text-sm transition-colors 
                  focus:outline-none focus:ring-2 ${themeClasses.buttons} ${themeClasses.ring}`}
                aria-label={
                  isFullScreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
              </motion.button>
            </div>
          </div>
        </div>

        {showThumbnails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${layoutClasses.thumbnails} ${
              thumbnailPosition !== "bottom" ? "w-24" : "w-full"
            }`}
          >
            {images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 transition-all duration-200 
                  ${current === index ? `ring-2 ${themeClasses.ring} scale-95` : ""}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`${
                    thumbnailPosition === "bottom"
                      ? "h-16 w-16"
                      : "w-full aspect-square"
                  } object-cover rounded-lg`}
                  loading="lazy"
                />
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
