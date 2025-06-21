import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the current viewport is mobile
 * @param breakpoint - The width threshold for mobile detection (default: 768px)
 * @returns boolean indicating if the current viewport is mobile
 */
export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};
