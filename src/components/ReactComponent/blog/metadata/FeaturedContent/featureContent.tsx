import { motion } from "framer-motion";
import type { CombinedPost } from "types/popular_post";

const FeaturedContent = ({
  combinedPopularPosts,
}: {
  combinedPopularPosts: CombinedPost[];
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className=" text-[var(--text-light)] py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--accent)] rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.05, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 relative z-10">
                <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--text-light)] to-[var(--accent)] bg-clip-text text-transparent">
                  Featured Content
                </span>
              </h1>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/20 to-transparent blur-2xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
          <motion.p
            className="text-xl text-[var(--text-light)] opacity-80 font-medium max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A carefully curated collection of my most impactful and popular
            articles
          </motion.p>
        </motion.div>

        {combinedPopularPosts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {combinedPopularPosts.map(({ post }, index) => (
              <motion.div
                key={post.slug}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group"
              >
                <article className="relative bg-[var(--accent-dark)] border border-[var(--accent)]/30 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 flex flex-col h-full backdrop-blur-sm">
                  {/* Image Container with Overlay */}
                  <div className="relative overflow-hidden h-56">
                    <motion.img
                      src={post.data.heroImage}
                      alt={post.data.title}
                      className="w-full h-full object-cover"
                      variants={imageVariants}
                      whileHover="hover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-[var(--accent-dark)]/80 via-transparent to-transparent"
                      variants={overlayVariants}
                      initial="initial"
                      whileHover="hover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                    >
                      <h2 className="text-xl font-bold mb-3 text-[var(--text-light)] group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2 leading-tight">
                        {post.data.title}
                      </h2>
                    </motion.div>

                    <motion.div
                      className="flex items-center mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 1 }}
                    >
                      <div className="flex items-center text-sm text-[var(--text-light)] opacity-60">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {new Date(post.data.pubDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </motion.div>

                    <motion.p
                      className="text-[var(--text-light)] opacity-70 line-clamp-3 text-sm leading-relaxed flex-grow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 1.2 }}
                    >
                      {post.data.description ||
                        "Discover insights and knowledge in this featured article."}
                    </motion.p>

                    {/* Read More Button */}
                    <motion.div
                      className="mt-6 pt-4 border-t border-[var(--accent)]/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 1.4 }}
                    >
                      <motion.a
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-[var(--accent)] font-semibold text-sm group-hover:text-[var(--text-light)] transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        Read Article
                        <motion.svg
                          className="w-4 h-4 ml-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          whileHover={{ x: 3 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, var(--accent)/10, transparent, var(--accent)/5)`,
                    }}
                  />
                </article>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-32"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block p-8 rounded-3xl bg-[var(--accent-dark)]/50 border border-[var(--accent)]/30 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.svg
                className="w-20 h-20 mx-auto mb-6 text-[var(--accent)] opacity-60"
                fill="currentColor"
                viewBox="0 0 20 20"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </motion.svg>
              <h3 className="text-3xl font-bold text-[var(--accent)] mb-4">
                Coming Soon
              </h3>
              <p className="text-lg text-[var(--text-light)] opacity-70 max-w-md mx-auto">
                Featured articles are being carefully curated. Check back soon
                for amazing content!
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedContent;
