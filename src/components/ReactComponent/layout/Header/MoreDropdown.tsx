// src/components/react/MoreDropdown.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuChevronDown as ChevronDown,
  LuExternalLink as ExternalLink,
  LuEllipsis as MoreHorizontal,
  LuNewspaper as Newspaper,
  LuTrendingUp as TrendingUp,
  LuStickyNote as StickyNote,
  LuGlobe as Globe
} from "react-icons/lu";

interface MoreDropdownProps {
  featureFlags: {
    showNewsletter: boolean;
    showTrendingPosts: boolean;
    showNotes: boolean;
    showWiki: boolean;
  };
}

const MoreDropdown: React.FC<MoreDropdownProps> = ({ featureFlags }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const toggleDropdown = useCallback(() => {
    setHasInteracted(true);
    setIsDropdownOpen(!isDropdownOpen);
  }, [isDropdownOpen]);

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={toggleDropdown}
        className="flex items-center text-[#c0caf5] hover:text-[#7aa2f7] transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-[#24283b]/50"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        aria-expanded={isDropdownOpen}
      >
        <MoreHorizontal className="w-4 h-4" />
        <ChevronDown
          className={`w-3 h-3 ml-1 transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            variants={dropdownVariants}
            initial={hasInteracted ? "hidden" : false}
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 backdrop-blur-xl bg-[#24283b]/95 border border-[#565f89]/30 rounded-xl shadow-2xl py-2 z-50"
          >
            <div className="px-2 space-y-1">
              {featureFlags.showNewsletter && (
                <motion.a
                  href="/newsletter"
                  className="flex items-center gap-3 py-2 px-3 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-lg transition-all duration-300 group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Newspaper className="w-4 h-4 text-[#7aa2f7]" />
                  <span className="font-medium">Newsletter Archive</span>
                  <ExternalLink className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              )}
              {featureFlags.showTrendingPosts && (
                <motion.a
                  href="/trending"
                  className="flex items-center gap-3 py-2 px-3 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-lg transition-all duration-300 group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <TrendingUp className="w-4 h-4 text-[#f7768e]" />
                  <span className="font-medium">Trending Articles</span>
                  <ExternalLink className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              )}
              {featureFlags.showNotes && (
                <>
                  <motion.a
                    href="/ms_notes"
                    className="flex items-center gap-3 py-2 px-3 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-lg transition-all duration-300 group"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <StickyNote className="w-4 h-4 text-[#e0af68]" />
                    <span className="font-medium">MS Notes</span>
                    <ExternalLink className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                </>
              )}
              {featureFlags.showWiki && (
                <motion.a
                  href="https://rafay99-docs.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-2 px-3 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-lg transition-all duration-300 group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Globe className="w-4 h-4 text-[#9ece6a]" />
                  <span className="font-medium">Website Wiki</span>
                  <ExternalLink className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoreDropdown; // ONLY THIS LINE IN THIS FILE