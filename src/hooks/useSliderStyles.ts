import { useMemo } from "react";
import type {
	AspectRatio,
	Layout,
	LayoutClasses,
	Theme,
	ThemeClasses,
	ThumbnailPosition,
} from "types/image_slider";

export const useSliderStyles = (
	theme: Theme,
	layout: Layout,
	aspectRatio: AspectRatio,
	thumbnailPosition: ThumbnailPosition,
	isFullScreen: boolean,
) => {
	const themeClasses = useMemo((): ThemeClasses => {
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
			default:
				return {
					container: "bg-[var(--accent-dark)]",
					controls: "bg-[var(--accent-dark)]/75 text-[var(--text-light)]",
					buttons:
						"bg-[var(--accent-dark)]/75 text-[var(--text-light)] hover:bg-[var(--accent)]",
					ring: "ring-[var(--accent)]",
				};
		}
	}, [theme]);

	const layoutClasses = useMemo((): LayoutClasses => {
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
			default:
				return {
					container: "rounded-lg overflow-hidden",
					image: "transition-all duration-300",
					controls: "opacity-100",
					thumbnails: "flex gap-2 p-2",
				};
		}
	}, [layout, thumbnailPosition]);

	const containerClasses = useMemo(
		() => `
    relative w-full max-w-7xl mx-auto
    ${layoutClasses.container}
    ${themeClasses.container}
    ${isFullScreen ? "fixed inset-0 z-50" : ""}
    group
  `,
		[layoutClasses.container, themeClasses.container, isFullScreen],
	);

	const mainContentClasses = useMemo(
		() => `
    relative flex
    ${thumbnailPosition === "left" ? "flex-row-reverse" : ""}
    ${thumbnailPosition === "right" ? "flex-row" : "flex-col"}
  `,
		[thumbnailPosition],
	);

	const aspectRatioClass = useMemo(() => {
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
	}, [aspectRatio]);

	return {
		themeClasses,
		layoutClasses,
		containerClasses,
		mainContentClasses,
		aspectRatioClass,
	};
};
