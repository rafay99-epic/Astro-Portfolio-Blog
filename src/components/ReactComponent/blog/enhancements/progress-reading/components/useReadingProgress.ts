import { useState, useEffect } from 'react';

// Helper function to calculate reading time
const calculateReadingTime = (): number => {
  if (typeof document === 'undefined') return 0;
  
  const articleContent = document.querySelector('.main-content');
  if (!articleContent) return 0;
  
  const text = articleContent.textContent || '';
  const wordCount = text.split(/\s+/).length;
  const wordsPerMinute = 200; // Average reading speed
  
  return wordCount / wordsPerMinute;
};

// The hook now accepts a parameter to disable its effect
export const useReadingProgress = (isMobile: boolean) => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Prevent the hook from running on mobile devices or if window is not defined
    if (isMobile || typeof window === 'undefined') {
      // Ensure state is reset if conditions change (e.g., resizing from desktop to mobile)
      setProgress(0);
      setIsVisible(false);
      return;
    }
    
    const totalReadingTime = calculateReadingTime();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      
      const currentProgress = (scrollTop / documentHeight) * 100;
      setProgress(currentProgress);
      
      const remainingPercentage = 100 - currentProgress;
      const remainingTime = (totalReadingTime * remainingPercentage) / 100;
      
      if (remainingTime < 1) {
        setTimeRemaining(`${Math.ceil(remainingTime * 60)} sec left`);
      } else {
        setTimeRemaining(`${Math.ceil(remainingTime)} min left`);
      }

      if (scrollTop > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => window.removeEventListener('scroll', handleScroll);
    
  // Add isMobile to the dependency array
  }, [isMobile]);

  return { progress, timeRemaining, isVisible };
};