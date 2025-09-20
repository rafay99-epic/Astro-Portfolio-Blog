import { useState, useEffect } from "react";

export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    
    checkMobile();

    
    window.addEventListener("resize", checkMobile);

    
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile ?? false;
};
