import { useState } from "react";
import type { Newsletter } from "../../scheme/newsletter_types.ts";

interface NewsletterLogicProps {
  newsletters: Newsletter[];
  children: (
    currentNewsletters: Newsletter[],
    totalPages: number,
    currentPage: number,
    handlePageChange: (page: number) => void
  ) => JSX.Element;
}

const NewsletterListLogic: React.FC<NewsletterLogicProps> = ({
  newsletters,
  children,
}) => {
  const newslettersPerPage = 5; // Adjust as needed
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalNewsletters = newsletters.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  const totalPages = Math.ceil(totalNewsletters.length / newslettersPerPage);

  const startIndex = (currentPage - 1) * newslettersPerPage;
  const currentNewsletters = totalNewsletters.slice(
    startIndex,
    startIndex + newslettersPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {children(currentNewsletters, totalPages, currentPage, handlePageChange)}
    </>
  );
};

export default NewsletterListLogic;
