import { useState, useEffect } from 'react';

export const useImageZoom = (imageSelector: string) => {
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // This state is the key to fixing the hydration error.
  // It starts as false and becomes true only after mounting on the client.
  const [isClient ] = useState(false);


  useEffect(() => {
    // The setup logic is now guarded by the isClient flag, preventing
    // it from running on the server or during the initial client render.
    if (!isClient) {
      return;
    }

    const images = document.querySelectorAll<HTMLImageElement>(imageSelector);
    if (images.length === 0) return;

    const handleImageClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLImageElement;
      setSelectedImage(target);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    images.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.classList.add('transition-transform', 'duration-300', 'hover:scale-[1.02]');
      img.addEventListener('click', handleImageClick);
    });

    return () => {
      images.forEach(img => {
        img.style.cursor = '';
        img.classList.remove('transition-transform', 'duration-300', 'hover:scale-[1.02]');
        img.removeEventListener('click', handleImageClick);
      });
    };
  // The effect now depends on isClient to run at the correct time.
  }, [imageSelector, isClient]);

  const closeModal = () => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    setTimeout(() => setSelectedImage(null), 300);
  };

  // We return everything, including the isClient flag.
  return { selectedImage, isOpen, closeModal, isClient };
};