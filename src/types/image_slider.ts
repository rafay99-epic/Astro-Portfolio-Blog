import type { RefObject, TouchEvent } from "react";

export type AspectRatio = "square" | "video" | "wide" | "auto";
export type Layout = "classic" | "modern" | "minimal" | "gallery" | "carousel";
export type Theme = "light" | "dark" | "glass";
export type ThumbnailPosition = "bottom" | "left" | "right";

export interface ImageSliderProps {
  images: string[];
  aspectRatio?: AspectRatio;
  showThumbnails?: boolean;
  layout?: Layout;
  theme?: Theme;
  thumbnailPosition?: ThumbnailPosition;
}

export interface ThemeClasses {
  container: string;
  controls: string;
  buttons: string;
  ring: string;
}

export interface LayoutClasses {
  container: string;
  image: string;
  controls: string;
  thumbnails: string;
}

export interface NavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  themeClasses: Pick<ThemeClasses, "buttons" | "ring">;
}

export interface ThumbnailProps {
  image: string;
  index: number;
  current: number;
  onClick: () => void;
  thumbnailPosition: string;
  themeClasses: Pick<ThemeClasses, "ring">;
}

export interface UseImageSliderResult {
  current: number;
  isFullScreen: boolean;
  loadedImages: Set<number>;
  isHovered: boolean;
  sliderRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  handleImageLoad: (index: number) => void;
  isImageLoaded: (index: number) => boolean;
  prevSlide: () => void;
  nextSlide: () => void;
  goToSlide: (index: number) => void;
  toggleFullScreen: () => void;
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}
