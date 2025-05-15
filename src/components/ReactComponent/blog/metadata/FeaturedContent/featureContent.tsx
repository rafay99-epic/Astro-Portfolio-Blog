import { motion } from "framer-motion";
import type { CombinedPost } from "types/popular_post";

const FeaturedContent = ({
  combinedPopularPosts,
}: {
  combinedPopularPosts: CombinedPost[];
}) => {
  return (
    <section className="bg-[var(--accent-dark)] text-[var(--text-light)] py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Featured Content
          </h1>
          <p className="text-lg text-[var(--text-light)] opacity-80 font-medium">
            A collection of my best and most popular articles. Make sure to take
            a look!
          </p>
        </div>

        {combinedPopularPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {combinedPopularPosts.map(({ post }) => (
              <motion.a
                href={`/blog/${post.slug}`}
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="block group"
              >
                <article className="bg-[var(--accent-dark)] border border-[var(--accent)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.03] flex flex-col h-full">
                  <img
                    src={post.data.heroImage}
                    alt={post.data.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5 flex flex-col h-full">
                    <h2 className="text-xl font-semibold mb-1 text-[var(--accent)] group-hover:underline">
                      {post.data.title}
                    </h2>
                    <p className="text-sm text-[var(--text-light)] opacity-60 mb-3">
                      {new Date(post.data.pubDate).toLocaleDateString()}
                    </p>
                    <p className="text-[var(--text-light)] opacity-90 line-clamp-3 text-sm">
                      {post.data.description || "No description available"}
                    </p>
                    <div className="mt-auto" />
                  </div>
                </article>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-[var(--accent)] mb-3">
              Sorry, No Featured Blog Posts
            </p>
            <p className="text-base text-[var(--text-light)] opacity-70">
              It seems we don’t have any featured blog posts right now. Check
              back later!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedContent;
