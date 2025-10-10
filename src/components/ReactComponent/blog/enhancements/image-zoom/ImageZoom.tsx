// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // Helper function to setup image zoom functionality
// const setupImageZoom = (
//   setSelectedImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>,
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
// ) => {
//   if (typeof document === 'undefined') return { cleanup: () => {} };
  
//   // Find all images in the blog content
//   const images = document.querySelectorAll('.prose img');
  
//   // Handler function for click events
//   const handleImageClick = (img: HTMLImageElement) => {
//     setSelectedImage(img);
//     setIsOpen(true);
//     document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
//   };
  
//   // Add click event to each image
//   images.forEach(img => {
//     if (img instanceof HTMLImageElement) {
//       // Add zoom cursor and hover effect
//       img.style.cursor = 'zoom-in';
//       img.classList.add('transition-transform', 'duration-300', 'hover:scale-[1.02]');
      
//       // Add click event
//       img.addEventListener('click', () => handleImageClick(img));
//     }
//   });

//   // Return cleanup function
//   return {
//     cleanup: () => {
//       images.forEach(img => {
//         if (img instanceof HTMLImageElement) {
//           img.style.cursor = '';
//           img.classList.remove('transition-transform', 'duration-300', 'hover:scale-[1.02]');
//           img.removeEventListener('click', () => handleImageClick(img));
//         }
//       });
//     }
//   };
// };

// const ImageZoom: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     // Skip during SSR
//     if (typeof window === 'undefined') return;
    
//     const { cleanup } = setupImageZoom(setSelectedImage, setIsOpen);
//     return cleanup;
//   }, []);

//   const closeModal = () => {
//     setIsOpen(false);
//     if (typeof document !== 'undefined') {
//       document.body.style.overflow = ''; // Re-enable scrolling
//     }
//     setTimeout(() => setSelectedImage(null), 300); // Clear image after animation
//   };

//   // Don't render anything during SSR
//   if (typeof window === 'undefined') {
//     return null;
//   }

//   return (
//     <AnimatePresence>
//       {isOpen && selectedImage && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
//           onClick={closeModal}
//         >
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={selectedImage.src}
//               alt={selectedImage.alt}
//               className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
//             />
            
//             <button
//               onClick={closeModal}
//               className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
//               aria-label="Close image"
//             >
//               <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
            
//             {selectedImage.alt && (
//               <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-center text-sm text-white">
//                 {selectedImage.alt}
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ImageZoom;

// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useImageZoom } from './components/useImageZoom'; // Import the new hook

// const ImageZoom: React.FC = () => {
//   // All logic is now handled by the custom hook
//   const { selectedImage, isOpen, closeModal } = useImageZoom('.prose img');

//   // Don't render anything during server-side rendering
//   if (typeof window === 'undefined') {
//     return null;
//   }

//   return (
//     <AnimatePresence>
//       {isOpen && selectedImage && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
//           onClick={closeModal}
//         >
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl"
//             // Stop click propagation to prevent the modal from closing when the image is clicked
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={selectedImage.src}
//               alt={selectedImage.alt}
//               className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
//             />
            
//             <button
//               onClick={closeModal}
//               className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
//               aria-label="Close image"
//             >
//               <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
            
//             {selectedImage.alt && (
//               <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-2 text-center text-sm text-white/90">
//                 {selectedImage.alt}
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ImageZoom;

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useImageZoom } from './components/useImageZoom'; // Adjust the import path as needed

// /**
//  * This child component contains the actual logic and hook call.
//  * It will only be rendered on the client, thus preventing the hook
//  * from ever running on the server.
//  */
// const ZoomableContent: React.FC = () => {
//   // All logic is now safely handled by the custom hook on the client
//   const { selectedImage, isOpen, closeModal } = useImageZoom('.prose img');

//   return (
//     <AnimatePresence>
//       {isOpen && selectedImage && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
//           onClick={closeModal}
//         >
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl"
//             // Stop click propagation to prevent the modal from closing when the image is clicked
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={selectedImage.src}
//               alt={selectedImage.alt}
//               className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
//             />
            
//             <button
//               onClick={closeModal}
//               className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
//               aria-label="Close image"
//             >
//               <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
            
//             {selectedImage.alt && (
//               <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-2 text-center text-sm text-white/90">
//                 {selectedImage.alt}
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };


// /**
//  * The main exported component acts as a "client boundary".
//  * It renders nothing on the server and then renders the actual
//  * zoomable content only on the client.
//  */
// const ImageZoom: React.FC = () => {
//   const [isClient, setIsClient] = useState(false);

//   // This effect will only run on the client, after the initial render
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Conditionally render the component that uses the hook
//   return isClient ? <ZoomableContent /> : null;
// };

// export default ImageZoom;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useImageZoom } from './components/useImageZoom'; // Adjust import path as needed

const ImageZoom: React.FC = () => {
  // The hook now tells us if it's safe to render.
  const { selectedImage, isOpen, closeModal } = useImageZoom('.prose img');

  // The component's actual UI will only render after mounting on the client.
  return (
    <AnimatePresence>
      {isOpen && selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
            />
            
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              aria-label="Close image"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {selectedImage.alt && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-2 text-center text-sm text-white/90">
                {selectedImage.alt}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageZoom;