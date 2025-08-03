// import React, { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTagFilter } from "@react/blog/metadata/Tags/useTagFilter";
// import { useIsMobile } from "../../../../../hooks/useIsMobile";
// import type { Post } from "types/articles";

// interface TagFilterProps {
//   posts: Post[];
// }

// const TagFilter: React.FC<TagFilterProps> = ({ posts }) => {
//   const {
//     tags,
//     paginatedPosts,
//     fade,
//     selectedTag,
//     handleTagClick,
//     currentPage,
//     totalPages,
//     setCurrentPage,
//   } = useTagFilter(posts);

//   const isMobile = useIsMobile();

//   const handleNextPage = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delayChildren: 0.1,
//         staggerChildren: 0.05,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   const tagVariants = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <section className="relative overflow-hidden py-8 px-4">
//       {/* Background Elements */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7aa2f7] rounded-full blur-3xl" />
//         <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#bb9af7] rounded-full blur-3xl" />
//         <div className="absolute top-3/4 left-3/4 w-32 h-32 bg-[#9ece6a] rounded-full blur-3xl" />
//       </div>

//       <div className="container mx-auto relative z-10 max-w-6xl">
//         {/* Header Section */}
//         <motion.div
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.h1
//             className={`font-bold mb-4 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent ${
//               isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
//             }`}
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             Browse by Tags
//           </motion.h1>
//           <motion.p
//             className={`text-[#a9b1d6] max-w-2xl mx-auto ${
//               isMobile ? "text-sm" : "text-lg"
//             }`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//           >
//             Discover articles by topic and explore content that interests you
//             most
//           </motion.p>

//           {/* Decorative line */}
//           <motion.div
//             className="mx-auto mt-6 h-0.5 bg-gradient-to-r from-transparent via-[#7aa2f7] to-transparent rounded-full"
//             initial={{ width: 0 }}
//             animate={{ width: isMobile ? "120px" : "200px" }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//           />
//         </motion.div>

//         {/* Tags Section */}
//         <motion.div
//           className="mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//         >
//           <div className="backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 rounded-3xl p-6 md:p-8 shadow-2xl">
//             <motion.h2
//               className={`font-semibold mb-6 bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent ${
//                 isMobile ? "text-xl" : "text-2xl"
//               }`}
//               variants={itemVariants}
//             >
//               Filter by Tags
//             </motion.h2>

//             <motion.div
//               className={`flex flex-wrap gap-3 ${isMobile ? "gap-2" : "gap-3"}`}
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               {tags.map((tag, index) => (
//                 <motion.button
//                   key={tag}
//                   variants={tagVariants}
//                   className={`transition-all duration-300 rounded-xl font-semibold ${
//                     selectedTag === tag
//                       ? "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-white shadow-lg shadow-[#7aa2f7]/25"
//                       : "bg-[#1a1b26]/60 text-[#a9b1d6] border border-[#565f89]/40 hover:border-[#7aa2f7]/50 hover:text-[#c0caf5] hover:bg-[#7aa2f7]/10"
//                   } ${isMobile ? "py-2 px-3 text-sm" : "py-3 px-4 text-base"}`}
//                   onClick={() => handleTagClick(tag)}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   initial="hidden"
//                   animate="visible"
//                   transition={{ delay: 0.1 * index }}
//                 >
//                   <span className="flex items-center gap-2">
//                     <span className="text-lg">#</span>
//                     <span>{tag}</span>
//                     {selectedTag === tag && (
//                       <motion.span
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         className="text-sm"
//                       >
//                         ✓
//                       </motion.span>
//                     )}
//                   </span>
//                 </motion.button>
//               ))}
//             </motion.div>

//             {/* Selected tag info */}
//             {selectedTag && (
//               <motion.div
//                 className="mt-6 p-4 bg-[#1a1b26]/40 border border-[#565f89]/30 rounded-xl"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <p
//                   className={`text-[#a9b1d6] ${isMobile ? "text-sm" : "text-base"}`}
//                 >
//                   Showing articles tagged with{" "}
//                   <span className="text-[#7aa2f7] font-semibold">
//                     #{selectedTag}
//                   </span>{" "}
//                   ({paginatedPosts.length} article
//                   {paginatedPosts.length !== 1 ? "s" : ""} found)
//                 </p>
//               </motion.div>
//             )}
//           </div>
//         </motion.div>

//         {/* Articles Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.6 }}
//         >
//           <motion.h2
//             className={`font-bold mb-8 bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent ${
//               isMobile ? "text-xl" : "text-2xl"
//             }`}
//             variants={itemVariants}
//           >
//             {selectedTag
//               ? `Articles tagged with #${selectedTag}`
//               : "All Articles"}
//           </motion.h2>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={selectedTag || "all"}
//               className="space-y-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: fade ? 0 : 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               {paginatedPosts.length > 0 ? (
//                 paginatedPosts.map((post, index) => (
//                   <motion.div
//                     key={post.slug}
//                     className="group"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1, duration: 0.5 }}
//                     whileHover={{
//                       scale: 1.01,
//                       transition: { duration: 0.3 },
//                     }}
//                   >
//                     <a
//                       href={`/blog/${post.slug}`}
//                       className="block relative overflow-hidden rounded-2xl backdrop-blur-xl bg-[#24283b]/60 border border-[#565f89]/30 shadow-xl hover:shadow-2xl hover:shadow-[#7aa2f7]/10 transition-all duration-500"
//                     >
//                       <div className={`p-6 ${isMobile ? "p-4" : "p-6"}`}>
//                         {/* Article header */}
//                         <div className="flex items-start justify-between mb-4">
//                           <div className="flex-1">
//                             <motion.h3
//                               className={`font-bold mb-2 bg-gradient-to-r from-[#c0caf5] to-[#a9b1d6] bg-clip-text text-transparent group-hover:from-[#7aa2f7] group-hover:to-[#bb9af7] transition-all duration-300 ${
//                                 isMobile ? "text-lg" : "text-xl"
//                               }`}
//                               whileHover={{ scale: 1.01 }}
//                             >
//                               {post.data.title}
//                             </motion.h3>

//                             {/* Meta information */}
//                             <div className="flex flex-wrap items-center gap-4 mb-3">
//                               <div className="flex items-center gap-1 text-[#a9b1d6] text-sm">
//                                 <span className="text-base">📅</span>
//                                 <span>
//                                   {new Date(
//                                     post.data.pubDate
//                                   ).toLocaleDateString()}
//                                 </span>
//                               </div>
//                               <div className="flex items-center gap-1 text-[#a9b1d6] text-sm">
//                                 <span className="text-base">👤</span>
//                                 <span>{post.data.authorName}</span>
//                               </div>
//                               {post.data.tags && (
//                                 <div className="flex items-center gap-1 text-[#a9b1d6] text-sm">
//                                   <span className="text-base">🏷️</span>
//                                   <span>
//                                     {post.data.tags.length} tag
//                                     {post.data.tags.length !== 1 ? "s" : ""}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>

//                           {/* Read more indicator */}
//                           <motion.div
//                             className="flex items-center gap-2 text-[#7aa2f7] font-medium text-sm group-hover:text-[#bb9af7] transition-colors duration-300"
//                             whileHover={{ x: 5 }}
//                           >
//                             <span className={isMobile ? "hidden" : "block"}>
//                               Read Article
//                             </span>
//                             <motion.span
//                               animate={{ x: [0, 3, 0] }}
//                               transition={{ duration: 2, repeat: Infinity }}
//                             >
//                               →
//                             </motion.span>
//                           </motion.div>
//                         </div>

//                         {/* Description */}
//                         {post.data.description && (
//                           <p
//                             className={`text-[#a9b1d6] leading-relaxed group-hover:text-[#c0caf5] transition-colors duration-300 ${
//                               isMobile
//                                 ? "text-sm line-clamp-2"
//                                 : "text-base line-clamp-3"
//                             }`}
//                           >
//                             {post.data.description}
//                           </p>
//                         )}

//                         {/* Tags */}
//                         {post.data.tags && post.data.tags.length > 0 && (
//                           <div className="mt-4 flex flex-wrap gap-2">
//                             {post.data.tags
//                               .slice(0, isMobile ? 3 : 5)
//                               .map((tag) => (
//                                 <span
//                                   key={tag}
//                                   className={`bg-[#1a1b26]/60 border border-[#565f89]/40 text-[#a9b1d6] font-medium rounded-lg transition-all duration-300 group-hover:border-[#7aa2f7]/50 group-hover:text-[#c0caf5] ${
//                                     selectedTag === tag
//                                       ? "border-[#7aa2f7]/70 text-[#7aa2f7]"
//                                       : ""
//                                   } ${isMobile ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm"}`}
//                                 >
//                                   #{tag}
//                                 </span>
//                               ))}
//                             {post.data.tags.length > (isMobile ? 3 : 5) && (
//                               <span
//                                 className={`text-[#a9b1d6] ${isMobile ? "text-xs" : "text-sm"}`}
//                               >
//                                 +{post.data.tags.length - (isMobile ? 3 : 5)}{" "}
//                                 more
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       {/* Hover effects */}
//                       <div className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7]/5 via-transparent to-[#bb9af7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

//                       {/* Bottom accent line */}
//                       <div className="h-1 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                     </a>
//                   </motion.div>
//                 ))
//               ) : (
//                 <motion.div
//                   className="text-center py-12"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-2xl p-8 shadow-xl">
//                     <div className="text-6xl mb-4">📝</div>
//                     <h3
//                       className={`font-semibold text-[#c0caf5] mb-2 ${isMobile ? "text-lg" : "text-xl"}`}
//                     >
//                       No articles found
//                     </h3>
//                     <p
//                       className={`text-[#a9b1d6] ${isMobile ? "text-sm" : "text-base"}`}
//                     >
//                       {selectedTag
//                         ? `No articles found with the tag "${selectedTag}". Try selecting a different tag.`
//                         : "No articles available at the moment."}
//                     </p>
//                   </div>
//                 </motion.div>
//               )}
//             </motion.div>
//           </AnimatePresence>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <motion.div
//               className="flex justify-center items-center mt-12"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 0.6 }}
//             >
//               <div className="backdrop-blur-xl bg-[#24283b]/50 border border-[#565f89]/30 rounded-2xl p-4 shadow-xl">
//                 <div className="flex items-center gap-3">
//                   {/* Previous button */}
//                   <motion.button
//                     onClick={handlePrevPage}
//                     disabled={currentPage === 1}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
//                       currentPage === 1
//                         ? "text-[#565f89] cursor-not-allowed"
//                         : "text-[#a9b1d6] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60"
//                     } ${isMobile ? "text-sm px-3 py-1.5" : "text-base"}`}
//                     whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
//                     whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
//                   >
//                     <span>←</span>
//                     {!isMobile && <span>Previous</span>}
//                   </motion.button>

//                   {/* Page info */}
//                   <div
//                     className={`text-[#a9b1d6] ${isMobile ? "text-sm" : "text-base"}`}
//                   >
//                     <span className="font-medium text-[#c0caf5]">
//                       {currentPage}
//                     </span>
//                     <span className="mx-2">of</span>
//                     <span className="font-medium text-[#c0caf5]">
//                       {totalPages}
//                     </span>
//                   </div>

//                   {/* Next button */}
//                   <motion.button
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
//                       currentPage === totalPages
//                         ? "text-[#565f89] cursor-not-allowed"
//                         : "text-[#a9b1d6] hover:text-[#7aa2f7] hover:bg-[#1a1b26]/60"
//                     } ${isMobile ? "text-sm px-3 py-1.5" : "text-base"}`}
//                     whileHover={
//                       currentPage !== totalPages ? { scale: 1.05 } : {}
//                     }
//                     whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
//                   >
//                     {!isMobile && <span>Next</span>}
//                     <span>→</span>
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default TagFilter;
