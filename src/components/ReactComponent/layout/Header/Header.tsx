import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { featureFlags } from "@config/featureFlag/featureFlag.json";
import authorConfig from "@config/siteConfig/info.json";

// SVG Components
const TagIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Tags</title>
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
        stroke="#e8e6e3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-darkreader-inline-stroke=""
      ></path>
    </g>
  </svg>
);

const SearchIcon = () => (
  <svg
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoreIcon = () => (
  <svg
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.4477 6 11 5.55228 11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6ZM12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13ZM12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}> = ({ href, children, icon, className = "" }) => (
  <a
    href={href}
    className={`text-white hover:text-gray-300 transition-colors duration-200 ${
      icon ? "flex items-center space-x-2" : "text-lg font-medium"
    } ${className}`}
  >
    {icon && <span className="w-6 h-6">{icon}</span>}
    <span>{children}</span>
  </a>
);

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="bg-[#1f2335] text-white">
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src={authorConfig.avator}
              alt="Author Avatar"
              className="w-16 h-16 rounded-full"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {featureFlags.showBlog && <NavLink href="/blog">Articles</NavLink>}
            {featureFlags.showNewsletter && (
              <NavLink href="/newsletter-subscribe">Newsletter</NavLink>
            )}
            {featureFlags.showAbout && <NavLink href="/about">About</NavLink>}
            {featureFlags.showProjects && (
              <NavLink href="/project">Projects</NavLink>
            )}
            {featureFlags.showTags && (
              <NavLink
                href="/tag"
                icon={<TagIcon />}
                children={undefined}
              ></NavLink>
            )}
            {featureFlags.showSearch && (
              <NavLink
                href="/search"
                icon={<SearchIcon />}
                children={undefined}
              ></NavLink>
            )}

            {/* Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center text-white hover:text-gray-300 transition-colors duration-200"
                aria-expanded={isDropdownOpen}
              >
                <MoreIcon />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-4 w-64 bg-[#2e3440] rounded-xl shadow-lg py-6 px-4 z-50"
                  >
                    <div className="space-y-4">
                      {featureFlags.showNewsletter && (
                        <NavLink
                          href="/newsletter"
                          className="block py-2 hover:bg-[#3b4252] rounded-lg px-3 transition-colors duration-200"
                        >
                          Newsletter Archive
                        </NavLink>
                      )}
                      {featureFlags.showTrendingPosts && (
                        <NavLink
                          href="/trending"
                          className="block py-2 hover:bg-[#3b4252] rounded-lg px-3 transition-colors duration-200"
                        >
                          Trending Articles
                        </NavLink>
                      )}
                      {featureFlags.showNotes && (
                        <>
                          <NavLink
                            href="/ms_notes"
                            className="block py-2 hover:bg-[#3b4252] rounded-lg px-3 transition-colors duration-200"
                          >
                            MS Note
                          </NavLink>
                          <NavLink
                            href="/webwiki"
                            className="block py-2 hover:bg-[#3b4252] rounded-lg px-3 transition-colors duration-200"
                          >
                            Website Wiki
                          </NavLink>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white hover:text-gray-300 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-6 flex flex-col space-y-3 px-2 py-4 pb-8 rounded-xl "
            >
              <NavLink
                href="/"
                className="block py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#3b4252] transition-colors duration-200"
              >
                Home
              </NavLink>
              {featureFlags.showBlog && (
                <NavLink
                  href="/blog"
                  className="block py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#3b4252] transition-colors duration-200"
                >
                  Articles
                </NavLink>
              )}
              {featureFlags.showNewsletter && (
                <NavLink
                  href="/newsletter-subscribe"
                  className="block py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#3b4252] transition-colors duration-200"
                >
                  Newsletter
                </NavLink>
              )}
              {featureFlags.showAbout && (
                <NavLink
                  href="/about"
                  className="block py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#3b4252] transition-colors duration-200"
                >
                  About
                </NavLink>
              )}
              {featureFlags.showProjects && (
                <NavLink
                  href="/project"
                  className="block py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#3b4252] transition-colors duration-200"
                >
                  Projects
                </NavLink>
              )}
              {featureFlags.showTags && (
                <NavLink
                  href="/tag"
                  className="block py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#3b4252] transition-colors duration-200"
                >
                  Tags
                </NavLink>
              )}
              {featureFlags.showSearch && (
                <NavLink
                  href="/search"
                  className="block py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#3b4252] transition-colors duration-200"
                >
                  Search
                </NavLink>
              )}
              {/* Collapsible More Section */}
              {(featureFlags.showNewsletter ||
                featureFlags.showTrendingPosts ||
                featureFlags.showNotes) && (
                <div>
                  <button
                    onClick={() => setIsMobileMoreOpen((open) => !open)}
                    className="w-full text-left block py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#3b4252] transition-colors duration-200 focus:outline-none"
                    aria-expanded={isMobileMoreOpen}
                  >
                    {isMobileMoreOpen ? "Less" : "More"}
                  </button>
                  <AnimatePresence>
                    {isMobileMoreOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col space-y-3 mt-2"
                      >
                        {featureFlags.showNewsletter && (
                          <NavLink
                            href="/newsletter"
                            className="block py-3 px-4 rounded-lg text-base font-medium hover:bg-[#3b4252] transition-colors duration-200"
                          >
                            Newsletter Archive
                          </NavLink>
                        )}
                        {featureFlags.showTrendingPosts && (
                          <NavLink
                            href="/trending"
                            className="block py-3 px-4 rounded-lg text-base font-medium hover:bg-[#3b4252] transition-colors duration-200"
                          >
                            Trending Articles
                          </NavLink>
                        )}
                        {featureFlags.showNotes && (
                          <>
                            <NavLink
                              href="/ms_notes"
                              className="block py-3 px-4 rounded-lg text-base font-medium hover:bg-[#3b4252] transition-colors duration-200"
                            >
                              MS Note
                            </NavLink>
                            <NavLink
                              href="/webwiki"
                              className="block py-3 px-4 rounded-lg text-base font-medium hover:bg-[#3b4252] transition-colors duration-200"
                            >
                              Website Wiki
                            </NavLink>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
