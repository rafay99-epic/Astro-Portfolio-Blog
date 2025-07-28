import { useEffect, memo, useCallback } from "react";

const ImageCaptionRenderer = memo(function ImageCaptionRenderer() {
  // Memoized function to check if element should be processed
  const shouldProcessElement = useCallback((element: Element): boolean => {
    return element.tagName === 'IMG' || element.querySelector('img') !== null;
  }, []);

  // Memoized function to process a single image
  const processImage = useCallback((img: HTMLImageElement) => {
    const alt = img.getAttribute('alt');
    
    // Skip if no alt text, already processed, or empty alt
    if (!alt || alt.trim() === '' || img.hasAttribute('data-caption-processed')) {
      return;
    }
    
    // Skip if image is already inside a figure with caption
    if (img.closest('figure figcaption')) {
      return;
    }
    
    // Skip if image is too small (likely an icon)
    if (img.naturalWidth < 100 || img.naturalHeight < 100) {
      return;
    }
    
    // Create wrapper container
    const wrapper = document.createElement('div');
    wrapper.className = 'my-4 text-center';
    
    // Create caption
    const caption = document.createElement('p');
    caption.className = 'mt-2 text-sm text-[#a9b1d6] italic';
    caption.textContent = alt;
    
    // Insert the wrapper before the image
    const parent = img.parentNode;
    if (parent) {
      parent.insertBefore(wrapper, img);
      
      // Move image into the wrapper
      wrapper.appendChild(img);
      wrapper.appendChild(caption);
      
      // Mark as processed
      img.setAttribute('data-caption-processed', 'true');
      
      // Add loading optimization
      if (!img.complete) {
        img.addEventListener('load', () => {
          // Ensure proper sizing after load
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
        }, { once: true });
      }
    }
  }, []);

  // Memoized function to process all images
  const processImages = useCallback(() => {
    const images = document.querySelectorAll('img[alt]:not([data-caption-processed])') as NodeListOf<HTMLImageElement>;
    
    // Use requestAnimationFrame for better performance
    if (images.length > 0) {
      requestAnimationFrame(() => {
        images.forEach(processImage);
      });
    }
  }, [processImage]);

  useEffect(() => {
    // Process images immediately
    processImages();
    
    // Optimized mutation observer
    const observer = new MutationObserver((mutations) => {
      let hasNewImages = false;
      
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
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
        // Use debounced processing for better performance
        const timeoutId = setTimeout(processImages, 150);
        return () => clearTimeout(timeoutId);
      }
    });
    
    // Observe the main content area with optimized options
    const mainContent = document.querySelector('main, .main-content, .blog-typography');
    if (mainContent) {
      observer.observe(mainContent, {
        childList: true,
        subtree: true,
        attributes: false, // Don't watch for attribute changes
        characterData: false // Don't watch for text changes
      });
    }
    
    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [processImages, shouldProcessElement]);

  return null; // This component doesn't render anything visible
});

export default ImageCaptionRenderer; 