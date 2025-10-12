import { useEffect, memo, useCallback } from "react";
import FullscreenImageViewer from "../fullscreen-image-viewer/FullscreenImageViewer";

const EnhancedImageCaptionRenderer = memo(
  function EnhancedImageCaptionRenderer() {
    const shouldProcessElement = useCallback((element: Element): boolean => {
      return element.tagName === "IMG" || element.querySelector("img") !== null;
    }, []);

    const processImage = useCallback((img: HTMLImageElement) => {
      const alt = img.getAttribute("alt");

      if (
        !alt ||
        alt.trim() === "" ||
        img.hasAttribute("data-enhanced-processed") ||
        img.hasAttribute("data-caption-processed")
      ) {
        return;
      }

      if (img.closest("figure")) {
        return;
      }

      if (
        (img.naturalWidth > 0 && img.naturalWidth < 100) ||
        (img.naturalHeight > 0 && img.naturalHeight < 100)
      ) {
        return;
      }

      if (img.naturalWidth === 0 || img.naturalHeight === 0) {
        const handleLoad = () => {
          img.removeEventListener("load", handleLoad);
          processImage(img);
        };
        img.addEventListener("load", handleLoad);
        return;
      }

      // Create wrapper container
      const wrapper = document.createElement("div");
      wrapper.className = "my-4 text-center enhanced-image-container";

      // Create image container with fullscreen capability
      const imageContainer = document.createElement("div");
      imageContainer.className = "relative inline-block cursor-pointer";

      // Clone the original image
      const enhancedImg = img.cloneNode(true) as HTMLImageElement;
      enhancedImg.className =
        "max-w-full h-auto rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl";
      enhancedImg.setAttribute("data-enhanced-processed", "true");

      // Add error handling for the enhanced image
      enhancedImg.addEventListener("error", () => {
        console.warn("Enhanced image failed to load:", enhancedImg.src);
        // Fallback: show original image without enhancement
        const parent = enhancedImg.parentNode;
        if (parent) {
          parent.replaceChild(img, enhancedImg);
        }
      });

      // Create caption
      const caption = document.createElement("p");
      caption.className = "mt-2 text-sm text-[#a9b1d6] italic";
      caption.textContent = alt;

      // Assemble the structure
      imageContainer.appendChild(enhancedImg);
      wrapper.appendChild(imageContainer);
      wrapper.appendChild(caption);

      const parent = img.parentNode;
      if (parent) {
        parent.insertBefore(wrapper, img);
        parent.removeChild(img);
      }

      // Add click event for fullscreen
      imageContainer.addEventListener("click", () => {
        // Prevent multiple fullscreen modals
        if (document.querySelector(".fullscreen-modal-active")) {
          return;
        }

        const fullscreenContainer = document.createElement("div");
        fullscreenContainer.className =
          "fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm fullscreen-modal-active";
        fullscreenContainer.style.cursor = "zoom-out";

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "relative max-h-[90vh] max-w-[90vw]";

        const fullscreenImg = enhancedImg.cloneNode(true) as HTMLImageElement;
        fullscreenImg.className = "max-h-[90vh] max-w-[90vw] object-contain";
        fullscreenImg.style.filter = "none";

        const closeButton = document.createElement("button");
        closeButton.className =
          "absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20";
        closeButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
        closeButton.setAttribute("aria-label", "Close fullscreen");

        const altText = document.createElement("div");
        altText.className =
          "absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-center text-white backdrop-blur-sm";
        altText.innerHTML = `<p class="text-sm">${alt}</p>`;

        const instructions = document.createElement("div");
        instructions.className =
          "absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white/70";
        instructions.innerHTML =
          '<p class="text-xs">Press <kbd class="rounded bg-white/20 px-1">ESC</kbd> or click outside to close</p>';

        imageWrapper.appendChild(fullscreenImg);
        imageWrapper.appendChild(altText);
        fullscreenContainer.appendChild(closeButton);
        fullscreenContainer.appendChild(imageWrapper);
        fullscreenContainer.appendChild(instructions);

        document.body.appendChild(fullscreenContainer);
        document.body.style.overflow = "hidden";

        // Close handlers
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            closeFullscreen();
          }
        };

        const closeFullscreen = () => {
          document.removeEventListener("keydown", handleKeyDown);
          // Safely remove the modal
          if (fullscreenContainer && fullscreenContainer.parentNode) {
            fullscreenContainer.parentNode.removeChild(fullscreenContainer);
          }
          document.body.style.overflow = "unset";
        };

        closeButton.addEventListener("click", closeFullscreen);
        fullscreenContainer.addEventListener("click", (e) => {
          if (e.target === fullscreenContainer) {
            closeFullscreen();
          }
        });

        document.addEventListener("keydown", handleKeyDown);
      });

      // Style the original image
      if (!enhancedImg.complete) {
        enhancedImg.addEventListener(
          "load",
          () => {
            enhancedImg.style.maxWidth = "100%";
            enhancedImg.style.height = "auto";
          },
          { once: true },
        );
      }
    }, []);

    const processImages = useCallback(() => {
      const images = document.querySelectorAll(
        "img[alt]:not([data-enhanced-processed]):not([data-caption-processed])",
      ) as NodeListOf<HTMLImageElement>;

      if (images.length > 0) {
        requestAnimationFrame(() => {
          images.forEach(processImage);
        });
      }
    }, [processImage]);

    useEffect(() => {
      processImages();

      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      const observer = new MutationObserver((mutations) => {
        let hasNewImages = false;

        for (const mutation of mutations) {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            for (const node of Array.from(mutation.addedNodes)) {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                if (shouldProcessElement(element)) {
                  hasNewImages = true;
                  break;
                }
              }
            }
            if (hasNewImages) break;
          }
        }

        if (hasNewImages) {
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(processImages, 150);
        }
      });

      const mainContent = document.querySelector(
        "main, .main-content, .blog-typography",
      );
      if (mainContent) {
        observer.observe(mainContent, {
          childList: true,
          subtree: true,
          attributes: false,
          characterData: false,
        });
      }

      return () => {
        observer.disconnect();
      };
    }, [processImages, shouldProcessElement]);

    return null;
  },
);

export default EnhancedImageCaptionRenderer;
