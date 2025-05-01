import React from "react";
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

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  date,
  authorName,
  authorAvatar,
  coverImage,
  tags = [],
  readtime,
}) => {
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="relative z-10 max-w-3xl w-full mx-4 px-6 py-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/20 text-white text-center shadow-lg"
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
                className="text-sm px-3 py-1 border border-white rounded-full bg-transparent text-white"
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

        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          {title}
        </h1>

        <div className="flex flex-col items-center text-sm text-gray-300">
          <div className="flex items-center gap-3 mb-1">
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-8 h-8 rounded-full object-cover border border-white"
            />
            <span className="font-medium text-white">{authorName}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>

          {readtime && (
            <motion.div
              className="flex items-center gap-1 text-xs text-gray-300"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span role="img" aria-label="clock">
                ⏱
              </span>
              <span>{readtime} read</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default BlogHeader;

// Alternative Design

// side by side design

// V3 side the image and blog inof Not bad
// <section className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-6 items-center text-white">
//   {/* Cover Image */}
//   <div className="w-full md:w-1/2">
//     <img
//       src={coverImage}
//       alt="Cover"
//       className="rounded-xl w-full h-auto object-cover shadow-lg"
//     />
//   </div>

//   {/* Content */}
//   <div className="w-full md:w-1/2 text-left">
//     <div className="flex flex-wrap gap-2 mb-4">
//       {tags.map((tag, i) => (
//         <span
//           key={i}
//           className="px-3 py-1 text-sm rounded-full border border-white text-white bg-transparent"
//         >
//           #{tag}
//         </span>
//       ))}
//     </div>

//     <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>

//     <div className="flex items-center gap-3 text-gray-300">
//       <img
//         src={authorAvatar}
//         alt={authorName}
//         className="w-10 h-10 rounded-full border border-white"
//       />
//       <span className="text-white font-medium">{authorName}</span>
//       <span>•</span>
//       <span>{new Date(date).toLocaleDateString()}</span>
//     </div>
//   </div>
// </section>
