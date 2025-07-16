import React, { memo } from "react";
import { motion } from "framer-motion";

interface BlogHeaderProps {
  title: string;
  date: string;
  authorName: string;
  authorAvatar: string;
  coverImage: string;
  tags?: string[];
  readtime?: string;
}

const BlogHeader = memo(function BlogHeader({
  title,
  date,
  authorName,
  authorAvatar,
  coverImage,
  tags = [],
  readtime,
}: BlogHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      <motion.img
        src={coverImage}
        alt="Cover"
        loading="eager"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#1a1b26]/80 via-[#24283b]/70 to-[#1f2335]/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="relative z-10 max-w-3xl w-full mx-4 px-6 py-8 bg-gradient-to-br from-[#24283b]/60 to-[#1a1b26]/60 backdrop-blur-md rounded-xl border border-[#7aa2f7]/30 text-white text-center shadow-lg shadow-[#7aa2f7]/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {tags.length > 0 && (
          <motion.div
            className="flex justify-center flex-wrap gap-2 mb-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {tags.map((tag, index) => (
              <motion.span
                key={index}
                className="text-sm px-3 py-1 border border-[#7aa2f7]/50 rounded-full bg-gradient-to-r from-[#7aa2f7]/20 to-[#bb9af7]/20 text-[#c0caf5] hover:border-[#7aa2f7] hover:bg-gradient-to-r hover:from-[#7aa2f7]/30 hover:to-[#bb9af7]/30 transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                #{tag}
              </motion.span>
            ))}
          </motion.div>
        )}

        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent">
          {title}
        </h1>

        <div className="flex flex-col items-center text-sm text-[#a9b1d6]">
          <div className="flex items-center gap-3 mb-1">
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-8 h-8 rounded-full object-cover border-2 border-[#7aa2f7]/50"
            />
            <span className="font-medium text-[#c0caf5]">{authorName}</span>
            <span className="text-[#565f89]">•</span>
            <span className="text-[#a9b1d6]">{formattedDate}</span>
          </div>

          {readtime && (
            <motion.div
              className="flex items-center gap-1 text-xs text-[#a9b1d6]"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span role="img" aria-label="clock" className="text-[#9ece6a]">
                ⏱
              </span>
              <span>{readtime} read</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
});

export default BlogHeader;
