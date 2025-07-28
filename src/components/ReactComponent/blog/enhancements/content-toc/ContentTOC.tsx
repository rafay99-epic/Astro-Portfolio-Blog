import React, { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ContentTOCProps {
  content: string;
  className?: string;
}

const ContentTOC: React.FC<ContentTOCProps> = ({ content, className = '' }) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^#{2,6}\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[0].indexOf(' ');
      const text = match[1];
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      items.push({ id, text, level });
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    // Show TOC after user scrolls past first few paragraphs
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPosition = 400; // Show after scrolling 400px
      setIsVisible(scrollPosition > triggerPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (tocItems.length < 3) {
    return null;
  }

  return (
    <div className={`content-toc my-12 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="bg-gradient-to-r from-[#1a1b26]/60 to-[#1a1b26]/60 backdrop-blur-20 border border-[#565f89]/20 rounded-20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#a9b1d6] flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
            </svg>
            What's in this article?
          </h3>
          <span className="text-xs text-[#565f89] bg-[#1a1b26]/40 px-2 py-1 rounded-8">
            {tocItems.length} sections
          </span>
        </div>
        
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {tocItems.slice(0, 9).map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center gap-2 p-3 bg-[#1a1b26]/40 border border-[#565f89]/10 rounded-12 hover:border-[#7aa2f7]/30 hover:bg-[#1a1b26]/60 transition-all duration-200 group"
            >
              <span className="text-[#7aa2f7] text-xs font-mono">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[#a9b1d6] text-sm group-hover:text-[#7aa2f7] transition-colors duration-200 line-clamp-1">
                {item.text}
              </span>
            </a>
          ))}
        </div>
        
        {tocItems.length > 9 && (
          <div className="mt-4 text-center">
            <span className="text-xs text-[#565f89]">
              +{tocItems.length - 9} more sections
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentTOC; 