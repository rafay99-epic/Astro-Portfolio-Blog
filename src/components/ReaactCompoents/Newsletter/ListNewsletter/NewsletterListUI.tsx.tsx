import { motion } from "framer-motion";

interface Newsletter {
  slug: string;
  data: {
    title: string;
    summary: string;
    pubDate: Date;
  };
}

interface NewsletterListUIProps {
  currentNewsletters: Newsletter[];
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const NewsletterListUI: React.FC<NewsletterListUIProps> = ({
  currentNewsletters,
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  // Sort newsletters by date, with the newest first
  const sortedNewsletters = [...currentNewsletters].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  // Format the date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-4xl font-bold text-[#F8F8F8] mb-8 text-center">
        Newsletter Archive
      </h1>
      <ul className="space-y-8 max-w-4xl mx-auto list-none">
        {" "}
        {/* Add list-none here to remove dots */}
        {sortedNewsletters.map((newsletter) => (
          <li
            key={newsletter.slug}
            className="bg-[#1a1b26] p-6 rounded-lg group transition-shadow duration-300"
            style={{ boxShadow: "var(--box-shadow)" }}
          >
            <a href={`/newsletter/${newsletter.slug}`} className="block group">
              <h2 className="text-2xl font-semibold text-[#7aa2f7] mb-4 group-hover:text-[#9bb8f7] transition duration-200">
                {newsletter.data.title}
              </h2>
              <p className="text-[#F8F8F8] mb-2 group-hover:text-[#7aa2f7] transition duration-200">
                {newsletter.data.summary}
              </p>
              <time
                dateTime={newsletter.data.pubDate.toISOString()}
                className="text-gray-light"
              >
                {formatDate(newsletter.data.pubDate)}
              </time>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <nav className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                index + 1 === currentPage
                  ? "bg-[#7aa2f7] text-white"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default NewsletterListUI;
