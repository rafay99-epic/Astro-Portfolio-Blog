import NewsletterListLogic from "@react/newsletter/ListNewsletter/NewsletterListLogic";
import NewsletterListUI from "@react/newsletter/ListNewsletter/NewsletterListUI.tsx";
import type { Newsletter } from "types/newsletter_types";
import { memo } from "react";
interface NewsletterListProps {
  newsletters: Newsletter[];
}

const NewsletterList = memo(function NewsletterList({
  newsletters,
}: NewsletterListProps) {
  if (newsletters.length === 0) {
    return (
      <div className="mt-[-10vh] flex min-h-screen flex-col items-center justify-center space-y-6 p-8">
        <h2 className="text-3xl font-bold tracking-wide text-[#7aa2f7]">
          No Newsletters Available Yet
        </h2>
        <p className="text-lg text-gray-400">
          Stay tuned! New content is coming soon. In the meantime, check out the
          blog or subscribe for updates.
        </p>
        <a
          href="/"
          className="inline-block rounded-lg bg-[#7aa2f7] px-6 py-3 font-medium text-white shadow-md transition duration-300 hover:bg-[#5f90e8]"
        >
          Go Back to Home
        </a>
      </div>
    );
  }

  return (
    <NewsletterListLogic newsletters={newsletters}>
      {(
        currentNewsletters,
        totalPages,
        currentPage,
        handlePageChange,
        isLoading,
        error,
      ) => (
        <NewsletterListUI
          currentNewsletters={currentNewsletters}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
          error={error}
        />
      )}
    </NewsletterListLogic>
  );
});

export default NewsletterList;
