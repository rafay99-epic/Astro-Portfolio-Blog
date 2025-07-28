import React, { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^#{1,6}\s+(.+)$/gm;
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
    const handleScroll = () => {
      const headings = tocItems.map(item => document.getElementById(item.id)).filter(Boolean);
      
      if (headings.length === 0) return;

      const scrollPosition = window.scrollY + 100;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="toc-container sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="bg-gradient-to-b from-[#1a1b26]/80 to-[#1a1b26]/60 backdrop-blur-20 border border-[#565f89]/20 rounded-20 p-6">
        <h3 className="text-lg font-semibold text-[#a9b1d6] mb-4">
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm transition-colors duration-200 hover:text-[#7aa2f7] ${
                activeId === item.id 
                  ? 'text-[#7aa2f7] font-medium' 
                  : 'text-[#565f89]'
              }`}
              style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents; 