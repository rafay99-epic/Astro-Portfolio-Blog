import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const ConnectButton = memo(function ConnectButton() {
  // Optimized smooth scroll function with cubic easing
  const smoothScrollTo = useCallback((targetPosition: number, duration: number = 2000) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let start: number | null = null;

    // Cubic easing function for smooth animation
    const easeInOutCubic = (t: number, b: number, c: number, d: number): number => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Button clicked!');
    
    try {
      const contactSection = document.querySelector('#contact-section') as HTMLElement;
      console.log('Contact section found:', contactSection);
      
      if (contactSection) {
        // Scroll to contact section with 100px offset for better positioning
        const targetPosition = contactSection.offsetTop - 100;
        smoothScrollTo(targetPosition);
      } else {
        console.warn('Contact section not found. Available sections:', 
          Array.from(document.querySelectorAll('section[id]')).map(s => s.id)
        );
        // Fallback: scroll to bottom of page
        smoothScrollTo(document.body.scrollHeight);
      }
    } catch (error) {
      console.error('Error scrolling to contact section:', error);
      // Fallback: scroll to bottom of page
      smoothScrollTo(document.body.scrollHeight);
    }
  }, [smoothScrollTo]);

  return (
    <motion.div
      className="flex justify-start relative"
      style={{ zIndex: 100 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: 1.2, // Appears after Greeting animations (0.2, 0.4, 0.6, 0.8, 1.0)
        ease: "easeOut"
      }}
    >
      <motion.button
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()}
        className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#7aa2f7]/30 text-base sm:text-lg shadow-lg cursor-pointer"
        style={{ 
          position: 'relative',
          zIndex: 100,
          pointerEvents: 'auto'
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 flex items-center justify-center gap-3 drop-shadow-sm">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
          Available for Projects
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </motion.button>
    </motion.div>
  );
});

export default ConnectButton;