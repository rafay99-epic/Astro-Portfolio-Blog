// export default ReadingProgressBar;
import React from 'react';
import { motion } from 'framer-motion';
import { useMobileDetection } from '@hooks/useMobileDetection';
import { useReadingProgress } from './components/useReadingProgress';

interface ReadingProgressBarProps {
  showPercentage?: boolean;
  showTimeRemaining?: boolean;
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  showPercentage = true,
  showTimeRemaining = true,
}) => {
  const isMobile = useMobileDetection();
  // Pass the isMobile state to the reading progress hook
  const { progress, timeRemaining, isVisible } = useReadingProgress(isMobile);

  // The conditional return remains, but the hook above is now efficient
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Progress bar at the top of the page */}
      <div
        id="reading-progress-bar"
        className="fixed top-0 left-0 z-50 h-1 w-full bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a]"
        style={{
          transform: `scaleX(${progress / 100})`,
          transformOrigin: 'left',
          transition: 'transform 0.1s linear',
        }}
      />

      {/* Floating progress indicator */}
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-[#24283b]/90 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {showPercentage && (
            <div className="flex items-center gap-2">
              <svg className="h-3 w-3 text-[#7aa2f7]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{Math.round(progress)}%</span>
            </div>
          )}

          {showPercentage && showTimeRemaining && <span className="mx-1 text-[#565f89]">•</span>}

          {showTimeRemaining && (
            <div className="flex items-center gap-2">
              <svg className="h-3 w-3 text-[#bb9af7]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{timeRemaining}</span>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default ReadingProgressBar;