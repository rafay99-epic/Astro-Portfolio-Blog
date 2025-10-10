
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTableOfContents } from './component/useTableOfContents'; 
import { useMobileDetection } from '@hooks/useMobileDetection'; 

const TableOfContents: React.FC = () => {
  const { headings, activeId } = useTableOfContents('.prose h2, .prose h3, .prose h4');
  const isMobile = useMobileDetection();
  
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  if (headings.length === 0 || isMobile) {
    return null;
  }

  return (
    <motion.div
      className="toc-container fixed right-4 top-32 z-10 max-w-xs rounded-xl border border-[#565f89]/30 bg-[#24283b]/80 p-4 backdrop-blur-lg lg:right-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-sm font-bold text-[#7aa2f7]">Table of Contents</h2>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1b26] text-[#a9b1d6] hover:text-[#7aa2f7]"
          aria-label={isVisible ? 'Collapse' : 'Expand'}
        >
          {isVisible ? '−' : '+'}
        </button>
      </div>
      
      {isVisible && (
        <motion.nav
          className="mt-2 max-h-[50vh] overflow-y-auto pr-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`block rounded-md px-2 py-1 text-xs transition-colors duration-200 hover:bg-[#1a1b26] hover:text-[#7aa2f7] ${
                    activeId === heading.id
                      ? 'bg-[#1a1b26] text-[#7aa2f7]'
                      : 'text-[#a9b1d6]'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </motion.div>
  );
};

export default TableOfContents;