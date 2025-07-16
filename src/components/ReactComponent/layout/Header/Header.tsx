// // import React, { useState, useEffect, useRef, memo } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { featureFlags } from "@config/featureFlag/featureFlag.json";
// // import authorConfig from "@config/siteConfig/info.json";

// // // Enhanced SVG Components with animations
// // const TagIcon = () => (
// //   <motion.svg
// //     width="24"
// //     height="24"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     xmlns="http://www.w3.org/2000/svg"
// //     whileHover={{ scale: 1.1, rotate: 5 }}
// //     transition={{ duration: 0.2 }}
// //   >
// //     <path
// //       d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //   </motion.svg>
// // );

// // const SearchIcon = () => (
// //   <motion.svg
// //     className="w-6 h-6"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     xmlns="http://www.w3.org/2000/svg"
// //     whileHover={{ scale: 1.1, rotate: 10 }}
// //     transition={{ duration: 0.2 }}
// //   >
// //     <path
// //       d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //   </motion.svg>
// // );

// // const MoreIcon = () => (
// //   <motion.svg
// //     className="w-6 h-6"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     xmlns="http://www.w3.org/2000/svg"
// //     whileHover={{ scale: 1.1 }}
// //     transition={{ duration: 0.2 }}
// //   >
// //     <path
// //       d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.4477 6 11 5.55228 11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6ZM12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13ZM12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20Z"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //   </motion.svg>
// // );

// // const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
// //   <motion.div
// //     className="w-6 h-6 flex flex-col justify-center items-center cursor-pointer"
// //     animate={isOpen ? "open" : "closed"}
// //   >
// //     <motion.span
// //       className="w-6 h-0.5 bg-current mb-1 rounded-full"
// //       variants={{
// //         closed: { rotate: 0, y: 0 },
// //         open: { rotate: 45, y: 6 },
// //       }}
// //       transition={{ duration: 0.3 }}
// //     />
// //     <motion.span
// //       className="w-6 h-0.5 bg-current mb-1 rounded-full"
// //       variants={{
// //         closed: { opacity: 1 },
// //         open: { opacity: 0 },
// //       }}
// //       transition={{ duration: 0.3 }}
// //     />
// //     <motion.span
// //       className="w-6 h-0.5 bg-current rounded-full"
// //       variants={{
// //         closed: { rotate: 0, y: 0 },
// //         open: { rotate: -45, y: -6 },
// //       }}
// //       transition={{ duration: 0.3 }}
// //     />
// //   </motion.div>
// // );

// // const NavLink: React.FC<{
// //   href: string;
// //   children?: React.ReactNode;
// //   icon?: React.ReactNode;
// //   className?: string;
// //   isMobile?: boolean;
// // }> = ({ href, children, icon, className = "", isMobile = false }) => (
// //   <motion.a
// //     href={href}
// //     className={`group flex items-center transition-all duration-300 ${
// //       isMobile
// //         ? "text-[#c0caf5] hover:text-[#7aa2f7] py-3 px-4 rounded-xl hover:bg-[#24283b]/60 backdrop-blur-sm"
// //         : "text-[#c0caf5] hover:text-[#7aa2f7]"
// //     } ${className}`}
// //     whileHover={{ scale: 1.05 }}
// //     whileTap={{ scale: 0.95 }}
// //   >
// //     {icon && (
// //       <span
// //         className={`${children ? "mr-3" : ""} text-[#7aa2f7] group-hover:text-[#bb9af7] transition-colors duration-300`}
// //       >
// //         {icon}
// //       </span>
// //     )}
// //     {children && (
// //       <span className={`font-medium ${isMobile ? "text-base" : "text-sm"}`}>
// //         {children}
// //       </span>
// //     )}
// //   </motion.a>
// // );

// // const Header = memo(function Header() {
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
// //   const dropdownRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (
// //         dropdownRef.current &&
// //         !dropdownRef.current.contains(event.target as Node)
// //       ) {
// //         setIsDropdownOpen(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
// //   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

// //   return (
// //     <motion.header
// //       className="relative z-50 transition-all duration-500"
// //       initial={{ y: -100 }}
// //       animate={{ y: 0 }}
// //       transition={{ duration: 0.6, ease: "easeOut" }}
// //     >
// //       {/* Background gradient overlay */}
// //       <div className="absolute inset-0  pointer-events-none" />

// //       <div className="container mx-auto px-4 sm:px-6 relative z-10">
// //         <div className="flex justify-between items-center py-4">
// //           {/* Logo */}
// //           <motion.a
// //             href="/"
// //             className="flex items-center group"
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //           >
// //             <div className="relative">
// //               <motion.img
// //                 src={authorConfig.avator}
// //                 alt="Author Avatar"
// //                 className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#7aa2f7]/30 group-hover:border-[#7aa2f7] transition-all duration-300"
// //                 whileHover={{ rotate: 5 }}
// //               />
// //               {/* Glow effect */}
// //               <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7aa2f7]/20 to-[#bb9af7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
// //             </div>
// //             <div className="ml-3 hidden sm:block">
// //               <motion.h1
// //                 className="text-lg font-bold bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent"
// //                 whileHover={{ scale: 1.02 }}
// //               >
// //                 {authorConfig.SiteName}
// //               </motion.h1>
// //               <p className="text-xs text-[#a9b1d6]">Developer & Creator</p>
// //             </div>
// //           </motion.a>

// //           {/* Desktop Navigation */}
// //           <nav className="hidden lg:flex items-center space-x-8">
// //             {featureFlags.showBlog && <NavLink href="/blog">Articles</NavLink>}
// //             {featureFlags.showNewsletter && (
// //               <NavLink href="/newsletter-subscribe">Newsletter</NavLink>
// //             )}
// //             {featureFlags.showAbout && <NavLink href="/about">About</NavLink>}
// //             {featureFlags.showExperience && (
// //               <NavLink href="/experience">Experience</NavLink>
// //             )}
// //             {featureFlags.showProjects && (
// //               <NavLink href="/project">Projects</NavLink>
// //             )}
// //             {featureFlags.showTags && (
// //               <NavLink href="/tag" icon={<TagIcon />} />
// //             )}
// //             {featureFlags.showSearch && (
// //               <NavLink href="/search" icon={<SearchIcon />} />
// //             )}

// //             {/* Desktop Dropdown Menu */}
// //             <div className="relative" ref={dropdownRef}>
// //               <motion.button
// //                 onClick={toggleDropdown}
// //                 className="flex items-center text-[#c0caf5] hover:text-[#7aa2f7] transition-colors duration-300 p-2 rounded-xl hover:bg-[#24283b]/60 backdrop-blur-sm"
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 aria-expanded={isDropdownOpen}
// //               >
// //                 <MoreIcon />
// //               </motion.button>

// //               <AnimatePresence>
// //                 {isDropdownOpen && (
// //                   <motion.div
// //                     initial={{ opacity: 0, y: -10, scale: 0.95 }}
// //                     animate={{ opacity: 1, y: 0, scale: 1 }}
// //                     exit={{ opacity: 0, y: -10, scale: 0.95 }}
// //                     transition={{ duration: 0.2 }}
// //                     className="absolute right-0 mt-2 w-64 backdrop-blur-xl bg-[#24283b]/90 border border-[#565f89]/30 rounded-2xl shadow-2xl py-2 z-50"
// //                   >
// //                     <div className="px-2">
// //                       {featureFlags.showNewsletter && (
// //                         <motion.a
// //                           href="/newsletter"
// //                           className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
// //                           whileHover={{ x: 5 }}
// //                         >
// //                           <span className="text-lg">📰</span>
// //                           <span className="font-medium">
// //                             Newsletter Archive
// //                           </span>
// //                           <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                             →
// //                           </span>
// //                         </motion.a>
// //                       )}
// //                       {featureFlags.showTrendingPosts && (
// //                         <motion.a
// //                           href="/trending"
// //                           className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
// //                           whileHover={{ x: 5 }}
// //                         >
// //                           <span className="text-lg">🔥</span>
// //                           <span className="font-medium">Trending Articles</span>
// //                           <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                             →
// //                           </span>
// //                         </motion.a>
// //                       )}
// //                       {featureFlags.showNotes && (
// //                         <>
// //                           <motion.a
// //                             href="/ms_notes"
// //                             className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
// //                             whileHover={{ x: 5 }}
// //                           >
// //                             <span className="text-lg">📝</span>
// //                             <span className="font-medium">MS Notes</span>
// //                             <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                               →
// //                             </span>
// //                           </motion.a>
// //                         </>
// //                       )}
// //                       {featureFlags.showWiki && (
// //                         <motion.a
// //                           href="/webwiki"
// //                           className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
// //                           whileHover={{ x: 5 }}
// //                         >
// //                           <span className="text-lg">📚</span>
// //                           <span className="font-medium">Website Wiki</span>
// //                           <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                             →
// //                           </span>
// //                         </motion.a>
// //                       )}
// //                     </div>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </div>
// //           </nav>

// //           {/* Mobile Menu Button */}
// //           <motion.button
// //             onClick={toggleMobileMenu}
// //             className="lg:hidden text-[#c0caf5] hover:text-[#7aa2f7] transition-colors duration-300 p-2 rounded-xl hover:bg-[#24283b]/60 backdrop-blur-sm"
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             aria-label="Toggle menu"
// //           >
// //             <MenuIcon isOpen={isMobileMenuOpen} />
// //           </motion.button>
// //         </div>

// //         {/* Mobile Menu */}
// //         <AnimatePresence>
// //           {isMobileMenuOpen && (
// //             <motion.nav
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: "auto" }}
// //               exit={{ opacity: 0, height: 0 }}
// //               transition={{ duration: 0.3 }}
// //               className="lg:hidden overflow-hidden"
// //             >
// //               <motion.div
// //                 className="py-4 space-y-2 backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 rounded-2xl mt-4 mb-4"
// //                 initial={{ y: -20 }}
// //                 animate={{ y: 0 }}
// //                 transition={{ delay: 0.1 }}
// //               >
// //                 <NavLink
// //                   href="/"
// //                   className="flex items-center gap-3"
// //                   isMobile={true}
// //                 >
// //                   <span className="text-lg">🏠</span>
// //                   Home
// //                 </NavLink>
// //                 {featureFlags.showBlog && (
// //                   <NavLink
// //                     href="/blog"
// //                     className="flex items-center gap-3"
// //                     isMobile={true}
// //                   >
// //                     <span className="text-lg">📚</span>
// //                     Articles
// //                   </NavLink>
// //                 )}
// //                 {featureFlags.showNewsletter && (
// //                   <NavLink
// //                     href="/newsletter-subscribe"
// //                     className="flex items-center gap-3"
// //                     isMobile={true}
// //                   >
// //                     <span className="text-lg">📧</span>
// //                     Newsletter
// //                   </NavLink>
// //                 )}
// //                 {featureFlags.showAbout && (
// //                   <NavLink
// //                     href="/about"
// //                     className="flex items-center gap-3"
// //                     isMobile={true}
// //                   >
// //                     <span className="text-lg">👤</span>
// //                     About
// //                   </NavLink>
// //                 )}
// //                 {featureFlags.showExperience && (
// //                   <NavLink
// //                     href="/experience"
// //                     className="flex items-center gap-3"
// //                     isMobile={true}
// //                   >
// //                     <span className="text-lg">💼</span>
// //                     Experience
// //                   </NavLink>
// //                 )}
// //                 {featureFlags.showProjects && (
// //                   <NavLink
// //                     href="/project"
// //                     className="flex items-center gap-3"
// //                     isMobile={true}
// //                   >
// //                     <span className="text-lg">🚀</span>
// //                     Projects
// //                   </NavLink>
// //                 )}
// //                 {featureFlags.showTags && (
// //                   <NavLink
// //                     href="/tag"
// //                     className="flex items-center gap-3"
// //                     isMobile={true}
// //                   >
// //                     <span className="text-lg">🏷️</span>
// //                     Tags
// //                   </NavLink>
// //                 )}
// //                 {featureFlags.showSearch && (
// //                   <NavLink
// //                     href="/search"
// //                     className="flex items-center gap-3"
// //                     isMobile={true}
// //                   >
// //                     <span className="text-lg">🔍</span>
// //                     Search
// //                   </NavLink>
// //                 )}

// //                 {/* Mobile More Section */}
// //                 {(featureFlags.showNewsletter ||
// //                   featureFlags.showTrendingPosts ||
// //                   featureFlags.showNotes) && (
// //                   <div className="border-t border-[#565f89]/20 pt-2 mt-2">
// //                     <motion.button
// //                       onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
// //                       className="w-full flex items-center justify-between py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#24283b]/60 rounded-xl transition-all duration-300"
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                     >
// //                       <div className="flex items-center gap-3">
// //                         <span className="text-lg">⚡</span>
// //                         <span className="font-medium">More</span>
// //                       </div>
// //                       <motion.span
// //                         animate={{ rotate: isMobileMoreOpen ? 180 : 0 }}
// //                         transition={{ duration: 0.3 }}
// //                         className="text-[#7aa2f7]"
// //                       >
// //                         ▼
// //                       </motion.span>
// //                     </motion.button>

// //                     <AnimatePresence>
// //                       {isMobileMoreOpen && (
// //                         <motion.div
// //                           initial={{ opacity: 0, height: 0 }}
// //                           animate={{ opacity: 1, height: "auto" }}
// //                           exit={{ opacity: 0, height: 0 }}
// //                           transition={{ duration: 0.3 }}
// //                           className="overflow-hidden pl-4 space-y-2 mt-2"
// //                         >
// //                           {featureFlags.showNewsletter && (
// //                             <NavLink
// //                               href="/newsletter"
// //                               className="flex items-center gap-3"
// //                               isMobile={true}
// //                             >
// //                               <span className="text-lg">📰</span>
// //                               Newsletter Archive
// //                             </NavLink>
// //                           )}
// //                           {featureFlags.showTrendingPosts && (
// //                             <NavLink
// //                               href="/trending"
// //                               className="flex items-center gap-3"
// //                               isMobile={true}
// //                             >
// //                               <span className="text-lg">🔥</span>
// //                               Trending Articles
// //                             </NavLink>
// //                           )}
// //                           {featureFlags.showNotes && (
// //                             <>
// //                               <NavLink
// //                                 href="/ms_notes"
// //                                 className="flex items-center gap-3"
// //                                 isMobile={true}
// //                               >
// //                                 <span className="text-lg">📝</span>
// //                                 MS Notes
// //                               </NavLink>
// //                               <NavLink
// //                                 href="/webwiki"
// //                                 className="flex items-center gap-3"
// //                                 isMobile={true}
// //                               >
// //                                 <span className="text-lg">📚</span>
// //                                 Website Wiki
// //                               </NavLink>
// //                             </>
// //                           )}
// //                         </motion.div>
// //                       )}
// //                     </AnimatePresence>
// //                   </div>
// //                 )}
// //               </motion.div>
// //             </motion.nav>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //     </motion.header>
// //   );
// // });

// // export default Header;

// import React, { useState, useEffect, useRef, memo, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { featureFlags } from "@config/featureFlag/featureFlag.json";
// import authorConfig from "@config/siteConfig/info.json";

// // Enhanced SVG Components with optimized animations
// const TagIcon = memo(() => (
//   <motion.svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     whileHover={{ scale: 1.1, rotate: 5 }}
//     transition={{ duration: 0.2, ease: "easeOut" }}
//   >
//     <path
//       d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </motion.svg>
// ));

// const SearchIcon = memo(() => (
//   <motion.svg
//     className="w-6 h-6"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     whileHover={{ scale: 1.1, rotate: 10 }}
//     transition={{ duration: 0.2, ease: "easeOut" }}
//   >
//     <path
//       d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </motion.svg>
// ));

// const MoreIcon = memo(() => (
//   <motion.svg
//     className="w-6 h-6"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     whileHover={{ scale: 1.1 }}
//     transition={{ duration: 0.2, ease: "easeOut" }}
//   >
//     <path
//       d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.4477 6 11 5.55228 11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6ZM12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13ZM12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </motion.svg>
// ));

// const MenuIcon = memo(({ isOpen }: { isOpen: boolean }) => (
//   <motion.div
//     className="w-6 h-6 flex flex-col justify-center items-center cursor-pointer"
//     animate={isOpen ? "open" : "closed"}
//   >
//     <motion.span
//       className="w-6 h-0.5 bg-current mb-1 rounded-full"
//       variants={{
//         closed: { rotate: 0, y: 0 },
//         open: { rotate: 45, y: 6 },
//       }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//     />
//     <motion.span
//       className="w-6 h-0.5 bg-current mb-1 rounded-full"
//       variants={{
//         closed: { opacity: 1 },
//         open: { opacity: 0 },
//       }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//     />
//     <motion.span
//       className="w-6 h-0.5 bg-current rounded-full"
//       variants={{
//         closed: { rotate: 0, y: 0 },
//         open: { rotate: -45, y: -6 },
//       }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//     />
//   </motion.div>
// ));

// const NavLink = memo<{
//   href: string;
//   children?: React.ReactNode;
//   icon?: React.ReactNode;
//   className?: string;
//   isMobile?: boolean;
// }>(({ href, children, icon, className = "", isMobile = false }) => (
//   <motion.a
//     href={href}
//     className={`group flex items-center transition-all duration-300 ${
//       isMobile
//         ? "text-[#c0caf5] hover:text-[#7aa2f7] py-3 px-4 rounded-xl hover:bg-[#24283b]/60 backdrop-blur-sm"
//         : "text-[#c0caf5] hover:text-[#7aa2f7]"
//     } ${className}`}
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     transition={{ duration: 0.15, ease: "easeOut" }}
//   >
//     {icon && (
//       <span
//         className={`${children ? "mr-3" : ""} text-[#7aa2f7] group-hover:text-[#bb9af7] transition-colors duration-300`}
//       >
//         {icon}
//       </span>
//     )}
//     {children && (
//       <span className={`font-medium ${isMobile ? "text-base" : "text-sm"}`}>
//         {children}
//       </span>
//     )}
//   </motion.a>
// ));

// const Header = memo(function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleClickOutside = useCallback((event: MouseEvent) => {
//     if (
//       dropdownRef.current &&
//       !dropdownRef.current.contains(event.target as Node)
//     ) {
//       setIsDropdownOpen(false);
//     }
//   }, []);

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [handleClickOutside]);

//   const toggleMobileMenu = useCallback(
//     () => setIsMobileMenuOpen(!isMobileMenuOpen),
//     [isMobileMenuOpen]
//   );
//   const toggleDropdown = useCallback(
//     () => setIsDropdownOpen(!isDropdownOpen),
//     [isDropdownOpen]
//   );
//   const toggleMobileMore = useCallback(
//     () => setIsMobileMoreOpen(!isMobileMoreOpen),
//     [isMobileMoreOpen]
//   );

//   // Optimized animation variants
//   const dropdownVariants = {
//     hidden: { opacity: 0, y: -10, scale: 0.95 },
//     visible: { opacity: 1, y: 0, scale: 1 },
//   };

//   const mobileMenuVariants = {
//     hidden: { opacity: 0, height: 0 },
//     visible: { opacity: 1, height: "auto" },
//   };

//   return (
//     <motion.header
//       className="relative z-50 transition-all duration-500"
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//     >
//       {/* Background gradient overlay */}
//       <div className="absolute inset-0 pointer-events-none" />

//       <div className="container mx-auto px-4 sm:px-6 relative z-10">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <motion.a
//             href="/"
//             className="flex items-center group"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ duration: 0.15, ease: "easeOut" }}
//           >
//             <div className="relative">
//               <motion.img
//                 src={authorConfig.avator}
//                 alt="Author Avatar"
//                 className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#7aa2f7]/30 group-hover:border-[#7aa2f7] transition-all duration-300"
//                 whileHover={{ rotate: 5 }}
//                 transition={{ duration: 0.2, ease: "easeOut" }}
//               />
//               {/* Glow effect */}
//               <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7aa2f7]/20 to-[#bb9af7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
//             </div>
//             <div className="ml-3 hidden sm:block">
//               <motion.h1
//                 className="text-lg font-bold bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent"
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.15, ease: "easeOut" }}
//               >
//                 {authorConfig.SiteName}
//               </motion.h1>
//               <p className="text-xs text-[#a9b1d6]">Developer & Creator</p>
//             </div>
//           </motion.a>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-8">
//             {featureFlags.showBlog && <NavLink href="/blog">Articles</NavLink>}
//             {featureFlags.showNewsletter && (
//               <NavLink href="/newsletter-subscribe">Newsletter</NavLink>
//             )}
//             {featureFlags.showAbout && <NavLink href="/about">About</NavLink>}
//             {featureFlags.showExperience && (
//               <NavLink href="/experience">Experience</NavLink>
//             )}
//             {featureFlags.showProjects && (
//               <NavLink href="/project">Projects</NavLink>
//             )}
//             {featureFlags.showTags && (
//               <NavLink href="/tag" icon={<TagIcon />} />
//             )}
//             {featureFlags.showSearch && (
//               <NavLink href="/search" icon={<SearchIcon />} />
//             )}

//             {/* Desktop Dropdown Menu */}
//             <div className="relative" ref={dropdownRef}>
//               <motion.button
//                 onClick={toggleDropdown}
//                 className="flex items-center text-[#c0caf5] hover:text-[#7aa2f7] transition-colors duration-300 p-2 rounded-xl hover:bg-[#24283b]/60 backdrop-blur-sm"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 transition={{ duration: 0.15, ease: "easeOut" }}
//                 aria-expanded={isDropdownOpen}
//               >
//                 <MoreIcon />
//               </motion.button>

//               <AnimatePresence mode="wait">
//                 {isDropdownOpen && (
//                   <motion.div
//                     variants={dropdownVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="hidden"
//                     transition={{ duration: 0.2, ease: "easeOut" }}
//                     className="absolute right-0 mt-2 w-64 backdrop-blur-xl bg-[#24283b]/90 border border-[#565f89]/30 rounded-2xl shadow-2xl py-2 z-50"
//                   >
//                     <div className="px-2">
//                       {featureFlags.showNewsletter && (
//                         <motion.a
//                           href="/newsletter"
//                           className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
//                           whileHover={{ x: 5 }}
//                           transition={{ duration: 0.15, ease: "easeOut" }}
//                         >
//                           <span className="text-lg">📰</span>
//                           <span className="font-medium">
//                             Newsletter Archive
//                           </span>
//                           <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                             →
//                           </span>
//                         </motion.a>
//                       )}
//                       {featureFlags.showTrendingPosts && (
//                         <motion.a
//                           href="/trending"
//                           className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
//                           whileHover={{ x: 5 }}
//                           transition={{ duration: 0.15, ease: "easeOut" }}
//                         >
//                           <span className="text-lg">🔥</span>
//                           <span className="font-medium">Trending Articles</span>
//                           <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                             →
//                           </span>
//                         </motion.a>
//                       )}
//                       {featureFlags.showNotes && (
//                         <>
//                           <motion.a
//                             href="/ms_notes"
//                             className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
//                             whileHover={{ x: 5 }}
//                             transition={{ duration: 0.15, ease: "easeOut" }}
//                           >
//                             <span className="text-lg">📝</span>
//                             <span className="font-medium">MS Notes</span>
//                             <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                               →
//                             </span>
//                           </motion.a>
//                         </>
//                       )}
//                       {featureFlags.showWiki && (
//                         <motion.a
//                           href="/webwiki"
//                           className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
//                           whileHover={{ x: 5 }}
//                           transition={{ duration: 0.15, ease: "easeOut" }}
//                         >
//                           <span className="text-lg">📚</span>
//                           <span className="font-medium">Website Wiki</span>
//                           <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                             →
//                           </span>
//                         </motion.a>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </nav>

//           {/* Mobile Menu Button */}
//           <motion.button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-[#c0caf5] hover:text-[#7aa2f7] transition-colors duration-300 p-2 rounded-xl hover:bg-[#24283b]/60 backdrop-blur-sm"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ duration: 0.15, ease: "easeOut" }}
//             aria-label="Toggle menu"
//           >
//             <MenuIcon isOpen={isMobileMenuOpen} />
//           </motion.button>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence mode="wait">
//           {isMobileMenuOpen && (
//             <motion.nav
//               variants={mobileMenuVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               className="lg:hidden overflow-hidden"
//             >
//               <motion.div
//                 className="py-4 space-y-2 backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 rounded-2xl mt-4 mb-4"
//                 initial={{ y: -20 }}
//                 animate={{ y: 0 }}
//                 transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
//               >
//                 <NavLink
//                   href="/"
//                   className="flex items-center gap-3"
//                   isMobile={true}
//                 >
//                   <span className="text-lg">🏠</span>
//                   Home
//                 </NavLink>
//                 {featureFlags.showBlog && (
//                   <NavLink
//                     href="/blog"
//                     className="flex items-center gap-3"
//                     isMobile={true}
//                   >
//                     <span className="text-lg">📚</span>
//                     Articles
//                   </NavLink>
//                 )}
//                 {featureFlags.showNewsletter && (
//                   <NavLink
//                     href="/newsletter-subscribe"
//                     className="flex items-center gap-3"
//                     isMobile={true}
//                   >
//                     <span className="text-lg">📧</span>
//                     Newsletter
//                   </NavLink>
//                 )}
//                 {featureFlags.showAbout && (
//                   <NavLink
//                     href="/about"
//                     className="flex items-center gap-3"
//                     isMobile={true}
//                   >
//                     <span className="text-lg">👤</span>
//                     About
//                   </NavLink>
//                 )}
//                 {featureFlags.showExperience && (
//                   <NavLink
//                     href="/experience"
//                     className="flex items-center gap-3"
//                     isMobile={true}
//                   >
//                     <span className="text-lg">💼</span>
//                     Experience
//                   </NavLink>
//                 )}
//                 {featureFlags.showProjects && (
//                   <NavLink
//                     href="/project"
//                     className="flex items-center gap-3"
//                     isMobile={true}
//                   >
//                     <span className="text-lg">🚀</span>
//                     Projects
//                   </NavLink>
//                 )}
//                 {featureFlags.showTags && (
//                   <NavLink
//                     href="/tag"
//                     className="flex items-center gap-3"
//                     isMobile={true}
//                   >
//                     <span className="text-lg">🏷️</span>
//                     Tags
//                   </NavLink>
//                 )}
//                 {featureFlags.showSearch && (
//                   <NavLink
//                     href="/search"
//                     className="flex items-center gap-3"
//                     isMobile={true}
//                   >
//                     <span className="text-lg">🔍</span>
//                     Search
//                   </NavLink>
//                 )}

//                 {/* Mobile More Section */}
//                 {(featureFlags.showNewsletter ||
//                   featureFlags.showTrendingPosts ||
//                   featureFlags.showNotes) && (
//                   <div className="border-t border-[#565f89]/20 pt-2 mt-2">
//                     <motion.button
//                       onClick={toggleMobileMore}
//                       className="w-full flex items-center justify-between py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#24283b]/60 rounded-xl transition-all duration-300"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       transition={{ duration: 0.15, ease: "easeOut" }}
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className="text-lg">⚡</span>
//                         <span className="font-medium">More</span>
//                       </div>
//                       <motion.span
//                         animate={{ rotate: isMobileMoreOpen ? 180 : 0 }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                         className="text-[#7aa2f7]"
//                       >
//                         ▼
//                       </motion.span>
//                     </motion.button>

//                     <AnimatePresence mode="wait">
//                       {isMobileMoreOpen && (
//                         <motion.div
//                           variants={mobileMenuVariants}
//                           initial="hidden"
//                           animate="visible"
//                           exit="hidden"
//                           transition={{ duration: 0.3, ease: "easeInOut" }}
//                           className="overflow-hidden pl-4 space-y-2 mt-2"
//                         >
//                           {featureFlags.showNewsletter && (
//                             <NavLink
//                               href="/newsletter"
//                               className="flex items-center gap-3"
//                               isMobile={true}
//                             >
//                               <span className="text-lg">📰</span>
//                               Newsletter Archive
//                             </NavLink>
//                           )}
//                           {featureFlags.showTrendingPosts && (
//                             <NavLink
//                               href="/trending"
//                               className="flex items-center gap-3"
//                               isMobile={true}
//                             >
//                               <span className="text-lg">🔥</span>
//                               Trending Articles
//                             </NavLink>
//                           )}
//                           {featureFlags.showNotes && (
//                             <>
//                               <NavLink
//                                 href="/ms_notes"
//                                 className="flex items-center gap-3"
//                                 isMobile={true}
//                               >
//                                 <span className="text-lg">📝</span>
//                                 MS Notes
//                               </NavLink>
//                               <NavLink
//                                 href="/webwiki"
//                                 className="flex items-center gap-3"
//                                 isMobile={true}
//                               >
//                                 <span className="text-lg">📚</span>
//                                 Website Wiki
//                               </NavLink>
//                             </>
//                           )}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 )}
//               </motion.div>
//             </motion.nav>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.header>
//   );
// });

// export default Header;

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { featureFlags } from "@config/featureFlag/featureFlag.json";
import authorConfig from "@config/siteConfig/info.json";

// Enhanced SVG Components with GPU-accelerated animations
const TagIcon = memo(() => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.1, rotateZ: 5 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    style={{ willChange: "transform" }}
  >
    <path
      d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
));

const SearchIcon = memo(() => (
  <motion.svg
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.1, rotateZ: 10 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    style={{ willChange: "transform" }}
  >
    <path
      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
));

const MoreIcon = memo(() => (
  <motion.svg
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    style={{ willChange: "transform" }}
  >
    <path
      d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.4477 6 11 5.55228 11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6ZM12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13ZM12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
));

const MenuIcon = memo(({ isOpen }: { isOpen: boolean }) => (
  <motion.div
    className="w-6 h-6 flex flex-col justify-center items-center cursor-pointer"
    animate={isOpen ? "open" : "closed"}
    style={{ willChange: "transform" }}
  >
    <motion.span
      className="w-6 h-0.5 bg-current mb-1 rounded-full"
      variants={{
        closed: { rotateZ: 0, y: 0 },
        open: { rotateZ: 45, y: 6 },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
    />
    <motion.span
      className="w-6 h-0.5 bg-current mb-1 rounded-full"
      variants={{
        closed: { opacity: 1, scaleX: 1 },
        open: { opacity: 0, scaleX: 0 },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ willChange: "transform, opacity" }}
    />
    <motion.span
      className="w-6 h-0.5 bg-current rounded-full"
      variants={{
        closed: { rotateZ: 0, y: 0 },
        open: { rotateZ: -45, y: -6 },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
    />
  </motion.div>
));

const NavLink = memo<{
  href: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  isMobile?: boolean;
}>(({ href, children, icon, className = "", isMobile = false }) => (
  <motion.a
    href={href}
    className={`group flex items-center transition-all duration-300 ${
      isMobile
        ? "text-[#c0caf5] hover:text-[#7aa2f7] py-3 px-4 rounded-xl hover:bg-[#24283b]/60 backdrop-blur-sm"
        : "text-[#c0caf5] hover:text-[#7aa2f7]"
    } ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.15, ease: "easeOut" }}
    style={{ willChange: "transform" }}
  >
    {icon && (
      <span
        className={`${children ? "mr-3" : ""} text-[#7aa2f7] group-hover:text-[#bb9af7] transition-colors duration-300`}
      >
        {icon}
      </span>
    )}
    {children && (
      <span className={`font-medium ${isMobile ? "text-base" : "text-sm"}`}>
        {children}
      </span>
    )}
  </motion.a>
));

const Header = memo(function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen(!isMobileMenuOpen),
    [isMobileMenuOpen]
  );
  const toggleDropdown = useCallback(
    () => setIsDropdownOpen(!isDropdownOpen),
    [isDropdownOpen]
  );
  const toggleMobileMore = useCallback(
    () => setIsMobileMoreOpen(!isMobileMoreOpen),
    [isMobileMoreOpen]
  );

  // GPU-optimized animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      scaleY: 0.8,
    },
    visible: {
      opacity: 1,
      height: "auto",
      scaleY: 1,
    },
  };

  const slideInVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.header
      className="relative z-50 transition-all duration-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ willChange: "transform" }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ willChange: "transform" }}
          >
            <div className="relative">
              <motion.img
                src={authorConfig.avator}
                alt="Author Avatar"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#7aa2f7]/30 group-hover:border-[#7aa2f7] transition-all duration-300"
                whileHover={{ rotateZ: 5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ willChange: "transform" }}
              />
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7aa2f7]/20 to-[#bb9af7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </div>
            <div className="ml-3 hidden sm:block">
              <motion.h1
                className="text-lg font-bold bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{ willChange: "transform" }}
              >
                {authorConfig.SiteName}
              </motion.h1>
              <p className="text-xs text-[#a9b1d6]">Developer & Creator</p>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {featureFlags.showBlog && <NavLink href="/blog">Articles</NavLink>}
            {featureFlags.showNewsletter && (
              <NavLink href="/newsletter-subscribe">Newsletter</NavLink>
            )}
            {featureFlags.showAbout && <NavLink href="/about">About</NavLink>}
            {featureFlags.showExperience && (
              <NavLink href="/experience">Experience</NavLink>
            )}
            {featureFlags.showProjects && (
              <NavLink href="/project">Projects</NavLink>
            )}
            {featureFlags.showTags && (
              <NavLink href="/tag" icon={<TagIcon />} />
            )}
            {featureFlags.showSearch && (
              <NavLink href="/search" icon={<SearchIcon />} />
            )}

            {/* Desktop Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={toggleDropdown}
                className="flex items-center text-[#c0caf5] hover:text-[#7aa2f7] transition-colors duration-300 p-2 rounded-xl hover:bg-[#24283b]/60 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{ willChange: "transform" }}
                aria-expanded={isDropdownOpen}
              >
                <MoreIcon />
              </motion.button>

              <AnimatePresence mode="wait">
                {isDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-64 backdrop-blur-xl bg-[#24283b]/90 border border-[#565f89]/30 rounded-2xl shadow-2xl py-2 z-50"
                    style={{
                      willChange: "transform, opacity",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="px-2">
                      {featureFlags.showNewsletter && (
                        <motion.a
                          href="/newsletter"
                          className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          style={{ willChange: "transform" }}
                        >
                          <span className="text-lg">📰</span>
                          <span className="font-medium">
                            Newsletter Archive
                          </span>
                          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            →
                          </span>
                        </motion.a>
                      )}
                      {featureFlags.showTrendingPosts && (
                        <motion.a
                          href="/trending"
                          className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          style={{ willChange: "transform" }}
                        >
                          <span className="text-lg">🔥</span>
                          <span className="font-medium">Trending Articles</span>
                          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            →
                          </span>
                        </motion.a>
                      )}
                      {featureFlags.showNotes && (
                        <>
                          <motion.a
                            href="/ms_notes"
                            className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            style={{ willChange: "transform" }}
                          >
                            <span className="text-lg">📝</span>
                            <span className="font-medium">MS Notes</span>
                            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              →
                            </span>
                          </motion.a>
                        </>
                      )}
                      {featureFlags.showWiki && (
                        <motion.a
                          href="/webwiki"
                          className="flex items-center gap-3 py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60 rounded-xl transition-all duration-300 group"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          style={{ willChange: "transform" }}
                        >
                          <span className="text-lg">📚</span>
                          <span className="font-medium">Website Wiki</span>
                          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            →
                          </span>
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
            className="lg:hidden text-[#c0caf5] hover:text-[#7aa2f7] transition-colors duration-300 p-2 rounded-xl hover:bg-[#24283b]/60 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ willChange: "transform" }}
            aria-label="Toggle menu"
          >
            <MenuIcon isOpen={isMobileMenuOpen} />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.nav
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
              style={{
                willChange: "transform, opacity",
                transformOrigin: "top",
              }}
            >
              <motion.div
                className="py-4 space-y-2 backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 rounded-2xl mt-4 mb-4"
                variants={slideInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
                style={{ willChange: "transform, opacity" }}
              >
                <NavLink
                  href="/"
                  className="flex items-center gap-3"
                  isMobile={true}
                >
                  <span className="text-lg">🏠</span>
                  Home
                </NavLink>
                {featureFlags.showBlog && (
                  <NavLink
                    href="/blog"
                    className="flex items-center gap-3"
                    isMobile={true}
                  >
                    <span className="text-lg">📚</span>
                    Articles
                  </NavLink>
                )}
                {featureFlags.showNewsletter && (
                  <NavLink
                    href="/newsletter-subscribe"
                    className="flex items-center gap-3"
                    isMobile={true}
                  >
                    <span className="text-lg">📧</span>
                    Newsletter
                  </NavLink>
                )}
                {featureFlags.showAbout && (
                  <NavLink
                    href="/about"
                    className="flex items-center gap-3"
                    isMobile={true}
                  >
                    <span className="text-lg">👤</span>
                    About
                  </NavLink>
                )}
                {featureFlags.showExperience && (
                  <NavLink
                    href="/experience"
                    className="flex items-center gap-3"
                    isMobile={true}
                  >
                    <span className="text-lg">💼</span>
                    Experience
                  </NavLink>
                )}
                {featureFlags.showProjects && (
                  <NavLink
                    href="/project"
                    className="flex items-center gap-3"
                    isMobile={true}
                  >
                    <span className="text-lg">🚀</span>
                    Projects
                  </NavLink>
                )}
                {featureFlags.showTags && (
                  <NavLink
                    href="/tag"
                    className="flex items-center gap-3"
                    isMobile={true}
                  >
                    <span className="text-lg">🏷️</span>
                    Tags
                  </NavLink>
                )}
                {featureFlags.showSearch && (
                  <NavLink
                    href="/search"
                    className="flex items-center gap-3"
                    isMobile={true}
                  >
                    <span className="text-lg">🔍</span>
                    Search
                  </NavLink>
                )}

                {/* Mobile More Section */}
                {(featureFlags.showNewsletter ||
                  featureFlags.showTrendingPosts ||
                  featureFlags.showNotes) && (
                  <div className="border-t border-[#565f89]/20 pt-2 mt-2">
                    <motion.button
                      onClick={toggleMobileMore}
                      className="w-full flex items-center justify-between py-3 px-4 text-[#c0caf5] hover:text-[#7aa2f7] hover:bg-[#24283b]/60 rounded-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      style={{ willChange: "transform" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">⚡</span>
                        <span className="font-medium">More</span>
                      </div>
                      <motion.span
                        animate={{ rotateZ: isMobileMoreOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-[#7aa2f7]"
                        style={{ willChange: "transform" }}
                      >
                        ▼
                      </motion.span>
                    </motion.button>

                    <AnimatePresence mode="wait">
                      {isMobileMoreOpen && (
                        <motion.div
                          variants={mobileMenuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden pl-4 space-y-2 mt-2"
                          style={{
                            willChange: "transform, opacity",
                            transformOrigin: "top",
                          }}
                        >
                          {featureFlags.showNewsletter && (
                            <NavLink
                              href="/newsletter"
                              className="flex items-center gap-3"
                              isMobile={true}
                            >
                              <span className="text-lg">📰</span>
                              Newsletter Archive
                            </NavLink>
                          )}
                          {featureFlags.showTrendingPosts && (
                            <NavLink
                              href="/trending"
                              className="flex items-center gap-3"
                              isMobile={true}
                            >
                              <span className="text-lg">🔥</span>
                              Trending Articles
                            </NavLink>
                          )}
                          {featureFlags.showNotes && (
                            <>
                              <NavLink
                                href="/ms_notes"
                                className="flex items-center gap-3"
                                isMobile={true}
                              >
                                <span className="text-lg">📝</span>
                                MS Notes
                              </NavLink>
                              <NavLink
                                href="/webwiki"
                                className="flex items-center gap-3"
                                isMobile={true}
                              >
                                <span className="text-lg">📚</span>
                                Website Wiki
                              </NavLink>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
});

export default Header;
