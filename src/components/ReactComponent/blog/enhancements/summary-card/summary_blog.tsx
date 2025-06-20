import React from "react";
import { useSummaryLogic } from "./SummaryBlogLogic";
import { SummaryBlogUI } from "./SummaryBlogUI";

type SummaryCardProps = {
  title: string;
  description: string;
  author: string;
  content: string;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  description,
  author,
  content,
}) => {
  const { summary, loading, error, retryCount, handleRetry } = useSummaryLogic({
    title,
    description,
    author,
    content,
  });

  return (
    <SummaryBlogUI
      summary={summary}
      loading={loading}
      error={error}
      retryCount={retryCount}
      onRetry={handleRetry}
    />
  );
};

export default SummaryCard;
