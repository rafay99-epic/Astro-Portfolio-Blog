import { useEffect, memo, useCallback } from "react";

const ImageCaptionRenderer = memo(function ImageCaptionRenderer() {
  const shouldProcessElement = useCallback((element: Element): boolean => {
    return element.tagName === 'IMG' || element.querySelector('img') !== null;
  }, []);

  const processImage = useCallback((img: HTMLImageElement) => {
    const alt = img.getAttribute('alt');
    
    if (!alt || alt.trim() === '' || img.hasAttribute('data-caption-processed')) {
      return;
    }
    
    if (img.closest('figure figcaption')) {
      return;
    }
    
    if (img.naturalWidth < 100 || img.naturalHeight < 100) {
      return;
    }
    
    const wrapper = document.createElement('div');
    wrapper.className = 'my-4 text-center';
    
    const caption = document.createElement('p');
    caption.className = 'mt-2 text-sm text-[#a9b1d6] italic';
    caption.textContent = alt;
    
    const parent = img.parentNode;
    if (parent) {
      parent.insertBefore(wrapper, img);
      
      wrapper.appendChild(img);
      wrapper.appendChild(caption);
      
      img.setAttribute('data-caption-processed', 'true');
      
      if (!img.complete) {
        img.addEventListener('load', () => {
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
        }, { once: true });
      }
    }
  }, []);

  const processImages = useCallback(() => {
    const images = document.querySelectorAll('img[alt]:not([data-caption-processed])') as NodeListOf<HTMLImageElement>;
    
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
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
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
    
    const mainContent = document.querySelector('main, .main-content, .blog-typography');
    if (mainContent) {
      observer.observe(mainContent, {
        childList: true,
        subtree: true,
        attributes: false, 
        characterData: false 
      });
    }
    
    return () => {
      observer.disconnect();
    };
  }, [processImages, shouldProcessElement]);

  return null; 
});

export default ImageCaptionRenderer; 