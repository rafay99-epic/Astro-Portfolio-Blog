import React, { useState, useEffect, useRef, useCallback } from "react";

interface Heading {
  depth: number;
  text: string;
  slug: string;
}

interface BlogTOCProps {
  headings: Heading[];
}

const BlogTOC: React.FC<BlogTOCProps> = ({ headings }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSticky, setIsSticky] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);

  // Memoized heading elements to avoid repeated DOM queries
  const headingElements = useRef<HTMLElement[]>([]);

  // Initialize heading elements once
  useEffect(() => {
    headingElements.current = headings
      .map((heading) => document.getElementById(heading.slug))
      .filter(Boolean) as HTMLElement[];
  }, [headings]);

  // Optimized scroll handler with throttling
  const updateActiveSection = useCallback(() => {
    if (headingElements.current.length === 0) return;

    const scrollPosition = window.scrollY + 100;
    let newActiveIndex = -1;

    for (let i = 0; i < headingElements.current.length; i++) {
      const element = headingElements.current[i];
      if (element && element.offsetTop <= scrollPosition) {
        newActiveIndex = i;
      }
    }

    setActiveIndex((prev) => (prev !== newActiveIndex ? newActiveIndex : prev));
  }, []);

  // Improved sticky check without causing reflows
  const updateStickyState = useCallback(() => {
    if (!tocRef.current) return;

    const rect = tocRef.current.getBoundingClientRect();
    const shouldBeSticky = rect.top <= 80;

    setIsSticky((prev) => (prev !== shouldBeSticky ? shouldBeSticky : prev));
  }, []);

  // Throttled scroll listener with better performance
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only process if scroll position actually changed
      if (Math.abs(currentScrollY - lastScrollY) < 1) return;
      lastScrollY = currentScrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          updateStickyState();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listeners for better performance
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: false,
    });

    // Initial check with delay to avoid conflicts
    const timer = setTimeout(() => {
      updateActiveSection();
      updateStickyState();
    }, 150);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [updateActiveSection, updateStickyState]);

  // Smooth scroll to heading without causing glitches
  const scrollToHeading = useCallback((slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      // Temporarily disable the scroll listener to prevent conflicts
      const offsetTop = element.offsetTop - 100;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Update URL without triggering scroll
      history.pushState(null, "", `#${slug}`);
    }
  }, []);

  // Determine container height based on content
  const getNavClassName = () => {
    const baseClasses = "space-y-1 overflow-x-hidden blog-toc-nav";

    if (headings.length === 0) {
      return `${baseClasses} min-h-[100px]`;
    } else if (headings.length <= 4) {
      return `${baseClasses} max-h-fit`;
    } else if (headings.length <= 8) {
      return `${baseClasses} max-h-[30vh] overflow-y-auto`;
    } else {
      return `${baseClasses} max-h-[35vh] overflow-y-auto`;
    }
  };

  // Render empty state
  const renderEmptyState = () => (
    <div className="empty-state text-center py-4 md:py-6">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2d3142]/60 rounded-xl flex items-center justify-center mx-auto mb-2">
        <span className="text-[#565f89] text-sm md:text-base">📄</span>
      </div>
      <p className="text-xs text-[#565f89] mb-1">No sections found</p>
      <p className="text-xs text-[#565f89]/60">
        Headings will appear here automatically
      </p>
    </div>
  );

  // Render heading link
  const renderHeadingLink = (heading: Heading, index: number) => {
    const isActive = index === activeIndex;
    const depthClasses = {
      1: "font-semibold text-xs md:text-sm text-[#c0caf5]",
      2: "ml-2 md:ml-3 font-medium text-xs text-[#a9b1d6]",
      3: "ml-4 md:ml-6 text-xs text-[#565f89]",
    };

    const bulletClasses = {
      1: "w-1.5 h-1.5 bg-[#7aa2f7] rounded-full",
      2: "w-1 h-1 bg-[#bb9af7] rounded-full",
      3: "w-0.5 h-0.5 bg-[#9ece6a] rounded-full",
    };

    return (
      <button
        key={`${heading.slug}-${index}`}
        onClick={() => scrollToHeading(heading.slug)}
        className={`
          blog-toc-link group relative block w-full text-left transition-all duration-200 rounded-lg px-2 md:px-3 py-1.5 md:py-2
          ${depthClasses[heading.depth as keyof typeof depthClasses] || depthClasses[3]}
          ${
            isActive
              ? "bg-[#7aa2f7]/15 border-[#7aa2f7]/50 text-[#7aa2f7]"
              : "hover:bg-[#2d3142]/60 hover:border-[#7aa2f7]/40"
          }
          border border-transparent focus:outline-none focus:ring-1 focus:ring-[#7aa2f7]/50
        `}
      >
        {/* Depth indicator line */}
        <div
          className={`
          absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7aa2f7] to-[#bb9af7] 
          transition-all duration-300
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          ${heading.depth === 1 ? "rounded-r-full" : ""}
        `}
        />

        {/* Content */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Bullet indicator */}
          <div
            className={`
            flex-shrink-0 transition-all duration-300 group-hover:scale-125
            ${bulletClasses[heading.depth as keyof typeof bulletClasses] || bulletClasses[3]}
            ${isActive ? "scale-125" : ""}
          `}
          />

          {/* Text */}
          <span className="group-hover:translate-x-0.5 transition-transform duration-300 leading-tight break-words hyphens-auto overflow-hidden text-left">
            {heading.text}
          </span>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-[#7aa2f7]/10 to-[#bb9af7]/10 rounded-full blur-lg" />
        </div>
      </button>
    );
  };

  // Dynamic spacing based on content
  const getContainerClassName = () => {
    let baseClasses = `
      toc-container backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-3 md:p-4
      w-full will-change-transform
    `;

    // Apply sticky positioning more carefully
    if (isSticky) {
      baseClasses += " sticky top-20 z-10";
    }

    // Add dynamic spacing based on content
    if (headings.length === 0) {
      baseClasses += " mb-4"; // Less spacing for empty TOC
    } else if (headings.length <= 4) {
      baseClasses += " mb-6"; // Normal spacing for short TOC
    } else if (headings.length <= 8) {
      baseClasses += " mb-8"; // More spacing for medium TOC
    } else {
      baseClasses += " mb-10"; // Maximum spacing for long TOC
    }

    return baseClasses;
  };

  return (
    <>
      <div
        ref={tocRef}
        className={getContainerClassName()}
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#565f89]/20">
          <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs">📋</span>
          </div>
          <h3 className="text-sm md:text-base font-semibold truncate">
            <span className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] bg-clip-text text-transparent">
              Table of Contents
            </span>
          </h3>
        </div>

        {/* Navigation */}
        <nav className={getNavClassName()}>
          {headings.length > 0
            ? headings.map((heading, index) =>
                renderHeadingLink(heading, index)
              )
            : renderEmptyState()}
        </nav>

        {/* Scroll indicators for long content */}
        {headings.length > 8 && (
          <div className="absolute top-1 right-1 text-xs text-[#565f89]/60 bg-[#1a1b26]/80 px-1.5 py-0.5 rounded-md">
            {headings.length}
          </div>
        )}
      </div>

      <style>{`
        .blog-toc-nav {
          scrollbar-width: thin;
          scrollbar-color: #7aa2f7 transparent;
        }

        .blog-toc-nav::-webkit-scrollbar {
          width: 2px;
        }

        .blog-toc-nav::-webkit-scrollbar-track {
          background: transparent;
        }

        .blog-toc-nav::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #7aa2f7, #bb9af7);
          border-radius: 8px;
        }

        .blog-toc-nav::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #6a8ef7, #ab8af7);
        }

        .blog-toc-link {
          position: relative;
          overflow: hidden;
        }

        .blog-toc-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(122, 162, 247, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .blog-toc-link:hover::before {
          left: 100%;
        }

        /* Improve sticky behavior and prevent glitches */
        .toc-container {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .toc-container.sticky {
          transform: translateZ(0);
        }

        /* Prevent layout shifts during scrolling */
        .toc-container * {
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .toc-container {
            position: relative !important;
            top: 0 !important;
            margin-bottom: 1rem !important;
            padding: 0.75rem;
          }

          .blog-toc-nav {
            max-height: 30vh !important;
          }
        }

        @media (max-width: 640px) {
          .toc-container {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </>
  );
};

export default BlogTOC;
