import React, { useState, useRef } from "react";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      sliderRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prevSlide();
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "Escape" && isFullScreen) toggleFullScreen();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  return (
    <div
      ref={sliderRef}
      className={`relative w-full max-w-7xl mx-auto overflow-hidden ${isFullScreen ? "fixed inset-0 z-50 bg-black" : ""}`}
    >
      {/* Image Display */}
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className={`w-full ${isFullScreen ? "h-screen" : "h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]"} object-cover rounded-lg shadow-lg`}
      />

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-3 rounded-full opacity-75 hover:opacity-100 transition"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-3 rounded-full opacity-75 hover:opacity-100 transition"
      >
        ❯
      </button>

      {/* Full-Screen Toggle Button */}
      <button
        onClick={toggleFullScreen}
        className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-md opacity-75 hover:opacity-100 transition"
      >
        {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
      </button>
    </div>
  );
};

export default ImageSlider;
