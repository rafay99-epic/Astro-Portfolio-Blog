import { motion, useInView } from "framer-motion";
import { useRef, memo, useMemo } from "react";
import type { CombinedPost } from "types/popular_post";

interface FeaturedContentProps {
  combinedPopularPosts: CombinedPost[];
}

const FeaturedContent = memo(function FeaturedContent({
  combinedPopularPosts,
}: FeaturedContentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Memoize animation variants for better performance
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.2,
          staggerChildren: 0.1,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
          type: "tween", // More performant than spring
        },
      },
    }),
    []
  );

  // Memoize hover animation for cards
  const cardHoverAnimation = useMemo(
    () => ({
      y: -8,
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut", type: "tween" },
    }),
    []
  );

  return (
    <section
      ref={ref}
      className="text-[var(--text-light)] py-20 relative overflow-hidden"
      style={{
        willChange: "auto",
        transform: "translateZ(0)", // Force GPU layer
      }}
    >
      {/* GPU-optimized Background Elements */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          willChange: "auto",
          transform: "translate3d(0, 0, 0)", // GPU acceleration
        }}
      >
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl"
          style={{
            willChange: "auto",
            transform: "translate3d(0, 0, 0)", // GPU acceleration
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--accent)] rounded-full blur-3xl"
          style={{
            willChange: "auto",
            transform: "translate3d(0, 0, 0)", // GPU acceleration
          }}
        />
      </div>

      <div
        className="container mx-auto px-4 md:px-8 relative z-10"
        style={{
          willChange: "auto",
          transform: "translateZ(0)", // Force GPU layer
        }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut", type: "tween" }}
          style={{
            willChange: "transform, opacity",
            transform: "translateZ(0)", // Force GPU layer
          }}
        >
          <div className="inline-block mb-6">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 relative z-10"
              style={{
                willChange: "auto",
                transform: "translateZ(0)", // Force GPU layer
              }}
            >
              <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--text-light)] to-[var(--accent)] bg-clip-text text-transparent">
                Featured Content
              </span>
            </h1>
          </div>
          <motion.p
            className="text-xl text-[var(--text-light)] opacity-80 font-medium max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: "easeOut",
              type: "tween",
            }}
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)", // Force GPU layer
            }}
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
            animate={isInView ? "visible" : "hidden"}
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)", // Force GPU layer
            }}
          >
            {combinedPopularPosts.map(({ post }, index) => (
              <motion.div
                key={post.slug}
                variants={cardVariants}
                whileHover={cardHoverAnimation}
                className="group"
                style={{
                  willChange: "transform, opacity",
                  transform: "translateZ(0)", // Force GPU layer
                }}
              >
                <article
                  className="relative bg-[var(--accent-dark)] border border-[var(--accent)]/30 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col h-full backdrop-blur-sm"
                  style={{
                    willChange: "transform",
                    transform: "translateZ(0)", // Force GPU layer
                  }}
                >
                  {/* Image Container */}
                  <div
                    className="relative overflow-hidden h-56"
                    style={{
                      willChange: "auto",
                      transform: "translateZ(0)", // Force GPU layer
                    }}
                  >
                    <img
                      src={post.data.heroImage}
                      alt={post.data.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{
                        willChange: "transform",
                        transform: "translateZ(0)", // Force GPU layer
                      }}
                      loading="lazy" // Optimize image loading
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[var(--accent-dark)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        willChange: "opacity",
                        transform: "translateZ(0)", // Force GPU layer
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className="p-6 flex flex-col flex-grow"
                    style={{
                      willChange: "auto",
                      transform: "translateZ(0)", // Force GPU layer
                    }}
                  >
                    <h2
                      className="text-xl font-bold mb-3 text-[var(--text-light)] group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2 leading-tight"
                      style={{
                        willChange: "color",
                        transform: "translateZ(0)", // Force GPU layer
                      }}
                    >
                      {post.data.title}
                    </h2>

                    <div
                      className="flex items-center mb-4"
                      style={{
                        willChange: "auto",
                        transform: "translateZ(0)", // Force GPU layer
                      }}
                    >
                      <div className="flex items-center text-sm text-[var(--text-light)] opacity-60">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          style={{
                            willChange: "auto",
                            transform: "translateZ(0)", // Force GPU layer
                          }}
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
                    </div>

                    <p
                      className="text-[var(--text-light)] opacity-70 line-clamp-3 text-sm leading-relaxed flex-grow"
                      style={{
                        willChange: "auto",
                        transform: "translateZ(0)", // Force GPU layer
                      }}
                    >
                      {post.data.description ||
                        "Discover insights and knowledge in this featured article."}
                    </p>

                    {/* Read More Button */}
                    <div
                      className="mt-6 pt-4 border-t border-[var(--accent)]/20"
                      style={{
                        willChange: "auto",
                        transform: "translateZ(0)", // Force GPU layer
                      }}
                    >
                      <a
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-[var(--accent)] font-semibold text-sm group-hover:text-[var(--text-light)] transition-all duration-300 hover:translate-x-1"
                        style={{
                          willChange: "transform, color",
                          transform: "translateZ(0)", // Force GPU layer
                        }}
                      >
                        Read Article
                        <svg
                          className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          style={{
                            willChange: "transform",
                            transform: "translateZ(0)", // Force GPU layer
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* GPU-optimized Hover Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-[var(--accent)]/5 to-transparent"
                    style={{
                      willChange: "opacity",
                      transform: "translateZ(0)", // Force GPU layer
                    }}
                  />
                </article>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-32"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.5, ease: "easeOut", type: "tween" }}
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)", // Force GPU layer
            }}
          >
            <div
              className="inline-block p-8 rounded-3xl bg-[var(--accent-dark)]/50 border border-[var(--accent)]/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              style={{
                willChange: "transform",
                transform: "translateZ(0)", // Force GPU layer
              }}
            >
              <svg
                className="w-20 h-20 mx-auto mb-6 text-[var(--accent)] opacity-60"
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{
                  willChange: "auto",
                  transform: "translateZ(0)", // Force GPU layer
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <h3
                className="text-3xl font-bold text-[var(--accent)] mb-4"
                style={{
                  willChange: "auto",
                  transform: "translateZ(0)", // Force GPU layer
                }}
              >
                Coming Soon
              </h3>
              <p
                className="text-lg text-[var(--text-light)] opacity-70 max-w-md mx-auto"
                style={{
                  willChange: "auto",
                  transform: "translateZ(0)", // Force GPU layer
                }}
              >
                Featured articles are being carefully curated. Check back soon
                for amazing content!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
});

export default FeaturedContent;
