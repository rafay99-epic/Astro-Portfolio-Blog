import React from "react";
import { motion } from "framer-motion";

interface BlogPost {
  slug: string;
  data: {
    title: string;
    pubDate: Date;
  };
}

interface BlogNavigationProps {
  currentSlug: string;
  allPosts: BlogPost[];
}

const BlogNavigation: React.FC<BlogNavigationProps> = ({ currentSlug, allPosts }) => {
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  if (!prevPost && !nextPost) return null;

  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-6 py-8 border-t border-[#565f89]/20">
      {prevPost ? (
        <motion.a
          href={`/blog/${prevPost.slug}`}
          className="group flex items-center gap-3 text-left max-w-xs"
          whileHover={{ x: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col">
            <span className="text-xs text-[#565f89] uppercase tracking-wide font-medium">
              Previous
            </span>
            <span className="text-sm text-[#a9b1d6] group-hover:text-[#7aa2f7] transition-colors duration-200 line-clamp-2">
              {prevPost.data.title}
            </span>
          </div>
          <svg 
            className="w-4 h-4 text-[#565f89] group-hover:text-[#7aa2f7] transition-colors duration-200 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.a>
      ) : (
        <div></div>
      )}

      {nextPost ? (
        <motion.a
          href={`/blog/${nextPost.slug}`}
          className="group flex items-center gap-3 text-right max-w-xs"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <svg 
            className="w-4 h-4 text-[#565f89] group-hover:text-[#7aa2f7] transition-colors duration-200 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <div className="flex flex-col">
            <span className="text-xs text-[#565f89] uppercase tracking-wide font-medium">
              Next
            </span>
            <span className="text-sm text-[#a9b1d6] group-hover:text-[#7aa2f7] transition-colors duration-200 line-clamp-2">
              {nextPost.data.title}
            </span>
          </div>
        </motion.a>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BlogNavigation; 