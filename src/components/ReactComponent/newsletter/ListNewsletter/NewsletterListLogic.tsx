import { useState, useMemo } from "react";
import type { Newsletter } from "types/newsletter_types.ts";

interface NewsletterLogicProps {
  newsletters: Newsletter[];
  children: (
    currentNewsletters: Newsletter[],
    totalPages: number,
    currentPage: number,
    handlePageChange: (page: number) => void,
    isLoading: boolean,
    error: string | null,
  ) => React.ReactElement;
}

const NewsletterListLogic: React.FC<NewsletterLogicProps> = ({
  newsletters,
  children,
}) => {
  const newslettersPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sortedNewsletters = useMemo(() => {
    try {
      return [...newsletters].sort((a, b) => {
        const dateA = new Date(a.data.pubDate).getTime();
        const dateB = new Date(b.data.pubDate).getTime();
        return dateB - dateA;
      });
    } catch (err) {
      setError("Failed to sort newsletters. Please try again.");
      return newsletters;
    }
  }, [newsletters]);

  const totalPages = Math.ceil(sortedNewsletters.length / newslettersPerPage);

  const currentNewsletters = useMemo(() => {
    const startIndex = (currentPage - 1) * newslettersPerPage;
    return sortedNewsletters.slice(startIndex, startIndex + newslettersPerPage);
  }, [sortedNewsletters, currentPage, newslettersPerPage]);

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    try {
      setIsLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 200));

      setCurrentPage(page);
    } catch (err) {
      setError("Failed to change page. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {children(
        currentNewsletters,
        totalPages,
        currentPage,
        handlePageChange,
        isLoading,
        error,
      )}
    </>
  );
};

export default NewsletterListLogic;
