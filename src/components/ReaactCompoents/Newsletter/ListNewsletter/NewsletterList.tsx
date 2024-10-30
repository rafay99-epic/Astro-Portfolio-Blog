import NewsletterListLogic from "./NewsletterListLogic";
import NewsletterListUI from "./NewsletterListUI.tsx";
import type { Newsletter } from "../../scheme/newsletter_types.ts";

interface NewsletterListProps {
  newsletters: Newsletter[];
}

const NewsletterList: React.FC<NewsletterListProps> = ({ newsletters }) => {
  if (newsletters.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center mt-[-10vh] space-y-6 p-8 ">
        <h2 className="text-3xl font-bold text-[#7aa2f7] tracking-wide">
          No Newsletters Available Yet
        </h2>
        <p className="text-lg text-gray-400">
          Stay tuned! New content is coming soon. In the meantime, check out the
          blog or subscribe for updates.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#7aa2f7] text-white font-medium rounded-lg shadow-md hover:bg-[#5f90e8] transition duration-300"
        >
          Go Back to Home
        </a>
      </div>
    );
  }

  return (
    <NewsletterListLogic newsletters={newsletters}>
      {(currentNewsletters, totalPages, currentPage, handlePageChange) => (
        <NewsletterListUI
          currentNewsletters={currentNewsletters}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </NewsletterListLogic>
  );
};

export default NewsletterList;
