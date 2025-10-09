
import { useState, useEffect } from 'react';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export const useTableOfContents = (headingSelector: string) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
    useEffect(() => {
      
    const getHeadingsFromDOM = (): TOCItem[] => {
      const headingElements = Array.from(
        document.querySelectorAll(headingSelector)
      );
      return headingElements
        .filter((element): element is HTMLElement => element instanceof HTMLElement)
        .map((element: HTMLElement) => {
          
          if (!element.id) {
            const textContent = element.textContent?.trim().toLowerCase().replace(/\s+/g, '-') || '';
            element.id = `${textContent}-${Math.random().toString(36).substring(2, 9)}`;
          }
          return {
            id: element.id,
            text: element.textContent || '',
            level: parseInt(element.tagName.replace('H', ''), 10),
          };
        });
    };

    const articleHeadings = getHeadingsFromDOM();
    setHeadings(articleHeadings);

    if (articleHeadings.length === 0) {
      return; 
    }

    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      
      { rootMargin: '0px 0px -80% 0px' }
    );

    
    articleHeadings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
    
    
    return () => {
      articleHeadings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };

    
  }, [headingSelector]);

  return { headings, activeId };
};