import { z } from "zod";
import type { RefObject, TouchEvent } from "react";

export const AspectRatioSchema = z.enum(["square", "video", "wide", "auto"]);
export const LayoutSchema = z.enum([
  "classic",
  "modern",
  "minimal",
  "gallery",
  "carousel",
]);
export const ThemeSchema = z.enum(["light", "dark", "glass"]);
export const ThumbnailPositionSchema = z.enum(["bottom", "left", "right"]);

export const ImageSliderPropsSchema = z.object({
  images: z.array(z.string()),
  aspectRatio: AspectRatioSchema.optional(),
  showThumbnails: z.boolean().optional(),
  layout: LayoutSchema.optional(),
  theme: ThemeSchema.optional(),
  thumbnailPosition: ThumbnailPositionSchema.optional(),
});

export const ThemeClassesSchema = z.object({
  container: z.string(),
  controls: z.string(),
  buttons: z.string(),
  ring: z.string(),
});

export const LayoutClassesSchema = z.object({
  container: z.string(),
  image: z.string(),
  controls: z.string(),
  thumbnails: z.string(),
});

export const NavigationButtonPropsSchema = z.object({
  direction: z.enum(["prev", "next"]),
  onClick: z.any(), // Function type - validated at TypeScript level
  themeClasses: ThemeClassesSchema.pick({ buttons: true, ring: true }),
});

export const ThumbnailPropsSchema = z.object({
  image: z.string(),
  index: z.number(),
  current: z.number(),
  onClick: z.any(), // Function type - validated at TypeScript level
  thumbnailPosition: z.string(),
  themeClasses: ThemeClassesSchema.pick({ ring: true }),
});

export const UseImageSliderResultSchema = z.object({
  current: z.number(),
  isFullScreen: z.boolean(),
  loadedImages: z.custom<Set<number>>(),
  isHovered: z.boolean(),
  sliderRef: z.custom<RefObject<HTMLDivElement | null>>(),
  containerRef: z.custom<RefObject<HTMLDivElement | null>>(),
  handleImageLoad: z.any(), // Function type - validated at TypeScript level
  isImageLoaded: z.any(), // Function type - validated at TypeScript level
  prevSlide: z.any(), // Function type - validated at TypeScript level
  nextSlide: z.any(), // Function type - validated at TypeScript level
  goToSlide: z.any(), // Function type - validated at TypeScript level
  toggleFullScreen: z.any(), // Function type - validated at TypeScript level
  handleTouchStart: z.any(), // Function type - validated at TypeScript level
  handleTouchMove: z.any(), // Function type - validated at TypeScript level
  handleMouseEnter: z.any(), // Function type - validated at TypeScript level
  handleMouseLeave: z.any(), // Function type - validated at TypeScript level
});

export type AspectRatio = z.infer<typeof AspectRatioSchema>;
export type Layout = z.infer<typeof LayoutSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type ThumbnailPosition = z.infer<typeof ThumbnailPositionSchema>;
export type ImageSliderProps = z.infer<typeof ImageSliderPropsSchema>;
export type ThemeClasses = z.infer<typeof ThemeClassesSchema>;
export type LayoutClasses = z.infer<typeof LayoutClassesSchema>;
export type NavigationButtonProps = z.infer<typeof NavigationButtonPropsSchema>;
export type ThumbnailProps = z.infer<typeof ThumbnailPropsSchema>;
export type UseImageSliderResult = z.infer<typeof UseImageSliderResultSchema>;
