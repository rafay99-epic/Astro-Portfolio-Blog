import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { featureFlags } from "../../../../config/featureFlag/featureFlag.json";
import authorConfig from "../../../../config/siteConfig/info.json";
import {
  LuMenu as Menu,
  LuX as X,
  LuSearch as Search,
  LuTag as Tag,
  LuEllipsis as MoreHorizontal,
  LuHouse as Home,
  LuBookOpen as BookOpen,
  LuMail as Mail,
  LuUser as User,
  LuBriefcase as Briefcase,
  LuRocket as Rocket,
  LuNewspaper as Newspaper,
  LuTrendingUp as TrendingUp,
  LuStickyNote as StickyNote,
  LuBookMarked as BookMarked,
  LuChevronDown as ChevronDown,
  LuExternalLink as ExternalLink
} from "react-icons/lu";

interface NavLinkProps {
  href: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  isMobile?: boolean;
  onClick?: () => void;
}

const NavLink = memo<NavLinkProps>(({ 
  href, 
  children, 
  icon, 
  className = "", 
  isMobile = false,
  onClick 
}) => (
  <motion.a
    href={href}
    onClick={onClick}
    className={`group flex items-center transition-all duration-300 ${
      isMobile
        ? "text-[#c0caf5] hover:text-[#7aa2f7] py-3 px-4 rounded-lg hover:bg-[#24283b]/80 border border-transparent hover:border-[#565f89]/30"
        : "text-[#c0caf5] hover:text-[#7aa2f7] px-3 py-2 rounded-lg hover:bg-[#24283b]/50"
    } ${className}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.15, ease: "easeOut" }}
  >
    {icon && (
      <span className={`${children ? "mr-3" : ""} text-[#7aa2f7] group-hover:text-[#bb9af7] transition-colors duration-300`}>
        {icon}
      </span>
    )}
    {children && (
      <span className={`font-medium ${isMobile ? "text-base" : "text-sm"}`}>
        {children}
      </span>
    )}
    {isMobile && (
      <ExternalLink className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    )}
  </motion.a>
));

const Header = memo(function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Reset mobile menu on page change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
      setIsDropdownOpen(false);
    };

    // Close mobile menu on window resize
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(!isDropdownOpen);
  }, [isDropdownOpen]);

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-xl bg-[#1a1b26]/80"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div className="relative">
                <motion.img
                  src={authorConfig.avator}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#7aa2f7]/30 group-hover:border-[#7aa2f7] transition-all duration-300"
                  whileHover={{ rotateZ: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7aa2f7]/20 to-[#bb9af7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </div>
              <div className="ml-3 hidden sm:block">
                <motion.h1
                  className="text-lg font-bold bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {authorConfig.SiteName}
                </motion.h1>
                <p className="text-xs text-[#a9b1d6]">Developer & Creator</p>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {featureFlags.showBlog && (
                <NavLink href="/blog" icon={<BookOpen className="w-4 h-4" />}>
                  Articles
                </NavLink>
              )}
              {featureFlags.showNewsletter && (
                <NavLink href="/newsletter-subscribe" icon={<Mail className="w-4 h-4" />}>
                  Newsletter
                </NavLink>
              )}
              {featureFlags.showAbout && (
                <NavLink href="/about" icon={<User className="w-4 h-4" />}>
                  About
                </NavLink>
              )}
              {featureFlags.showExperience && (
                <NavLink href="/experience" icon={<Briefcase className="w-4 h-4" />}>
                  Experience
                </NavLink>
              )}
              {featureFlags.showProjects && (
                <NavLink href="/project" icon={<Rocket className="w-4 h-4" />}>
                  Projects
                </NavLink>
              )}
              {featureFlags.showTags && (
                <NavLink href="/tag" icon={<Tag className="w-4 h-4" />} />
              )}
              {featureFlags.showSearch && (
                <NavLink href="/search" icon={<Search className="w-4 h-4" />} />
              )}

              {/* More Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={toggleDropdown}
                  className="flex items-center text-[#c0caf5] hover:text-[#7aa2f7] transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-[#24283b]/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
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
                      initial="hidden"
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
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
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
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
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
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.15, ease: "easeOut" }}
                            >
                              <StickyNote className="w-4 h-4 text-[#e0af68]" />
                              <span className="font-medium">MS Notes</span>
                              <ExternalLink className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.a>
                          </>
                        )}
                        {featureFlags.showWiki && (
                          <motion.a
                            href="/webwiki"
                            className="flex items-center gap-3 py-2 px-3 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-lg transition-all duration-300 group"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                          >
                            <BookMarked className="w-4 h-4 text-[#9ece6a]" />
                            <span className="font-medium">Website Wiki</span>
                            <ExternalLink className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="lg:hidden text-[#c0caf5] hover:text-[#7aa2f7] transition-colors duration-300 p-2 rounded-lg hover:bg-[#24283b]/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMounted && isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.nav
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#1a1b26]/95 backdrop-blur-xl border-l border-[#565f89]/30 z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#565f89]/20">
                <div className="flex items-center gap-3">
                  <img
                    src={authorConfig.avator}
                    alt="Author Avatar"
                    className="w-10 h-10 rounded-full border-2 border-[#7aa2f7]/30"
                  />
                  <div>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent">
                      {authorConfig.SiteName}
                    </h2>
                    <p className="text-xs text-[#a9b1d6]">Developer & Creator</p>
                  </div>
                </div>
                <motion.button
                  onClick={closeMobileMenu}
                  className="text-[#c0caf5] hover:text-[#7aa2f7] p-2 rounded-lg hover:bg-[#24283b]/50 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Mobile Menu Items */}
              <div className="p-6 space-y-2">
                <motion.div
                  variants={mobileMenuItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <NavLink
                    href="/"
                    icon={<Home className="w-5 h-5" />}
                    isMobile={true}
                    onClick={closeMobileMenu}
                  >
                    Home
                  </NavLink>
                </motion.div>

                {featureFlags.showBlog && (
                  <motion.div
                    variants={mobileMenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <NavLink
                      href="/blog"
                      icon={<BookOpen className="w-5 h-5" />}
                      isMobile={true}
                      onClick={closeMobileMenu}
                    >
                      Articles
                    </NavLink>
                  </motion.div>
                )}

                {featureFlags.showNewsletter && (
                  <motion.div
                    variants={mobileMenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <NavLink
                      href="/newsletter-subscribe"
                      icon={<Mail className="w-5 h-5" />}
                      isMobile={true}
                      onClick={closeMobileMenu}
                    >
                      Newsletter
                    </NavLink>
                  </motion.div>
                )}

                {featureFlags.showAbout && (
                  <motion.div
                    variants={mobileMenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.25, duration: 0.3 }}
                  >
                    <NavLink
                      href="/about"
                      icon={<User className="w-5 h-5" />}
                      isMobile={true}
                      onClick={closeMobileMenu}
                    >
                      About
                    </NavLink>
                  </motion.div>
                )}

                {featureFlags.showExperience && (
                  <motion.div
                    variants={mobileMenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <NavLink
                      href="/experience"
                      icon={<Briefcase className="w-5 h-5" />}
                      isMobile={true}
                      onClick={closeMobileMenu}
                    >
                      Experience
                    </NavLink>
                  </motion.div>
                )}

                {featureFlags.showProjects && (
                  <motion.div
                    variants={mobileMenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.35, duration: 0.3 }}
                  >
                    <NavLink
                      href="/project"
                      icon={<Rocket className="w-5 h-5" />}
                      isMobile={true}
                      onClick={closeMobileMenu}
                    >
                      Projects
                    </NavLink>
                  </motion.div>
                )}

                {featureFlags.showTags && (
                  <motion.div
                    variants={mobileMenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <NavLink
                      href="/tag"
                      icon={<Tag className="w-5 h-5" />}
                      isMobile={true}
                      onClick={closeMobileMenu}
                    >
                      Tags
                    </NavLink>
                  </motion.div>
                )}

                {featureFlags.showSearch && (
                  <motion.div
                    variants={mobileMenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.45, duration: 0.3 }}
                  >
                    <NavLink
                      href="/search"
                      icon={<Search className="w-5 h-5" />}
                      isMobile={true}
                      onClick={closeMobileMenu}
                    >
                      Search
                    </NavLink>
                  </motion.div>
                )}

                {/* Additional Links Section */}
                {(featureFlags.showNewsletter || featureFlags.showTrendingPosts || featureFlags.showNotes || featureFlags.showWiki) && (
                  <>
                    <motion.div
                      variants={mobileMenuItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="pt-4"
                    >
                      <div className="border-t border-[#565f89]/20 pt-4">
                        <h3 className="text-sm font-semibold text-[#a9b1d6] mb-3 px-4">More</h3>
                        <div className="space-y-2">
                          {featureFlags.showNewsletter && (
                            <NavLink
                              href="/newsletter"
                              icon={<Newspaper className="w-5 h-5" />}
                              isMobile={true}
                              onClick={closeMobileMenu}
                            >
                              Newsletter Archive
                            </NavLink>
                          )}
                          {featureFlags.showTrendingPosts && (
                            <NavLink
                              href="/trending"
                              icon={<TrendingUp className="w-5 h-5" />}
                              isMobile={true}
                              onClick={closeMobileMenu}
                            >
                              Trending Articles
                            </NavLink>
                          )}
                          {featureFlags.showNotes && (
                            <NavLink
                              href="/ms_notes"
                              icon={<StickyNote className="w-5 h-5" />}
                              isMobile={true}
                              onClick={closeMobileMenu}
                            >
                              MS Notes
                            </NavLink>
                          )}
                          {featureFlags.showWiki && (
                            <NavLink
                              href="/webwiki"
                              icon={<BookMarked className="w-5 h-5" />}
                              isMobile={true}
                              onClick={closeMobileMenu}
                            >
                              Website Wiki
                            </NavLink>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

export default Header;
