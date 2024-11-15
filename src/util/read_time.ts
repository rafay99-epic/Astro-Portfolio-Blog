/**
 * Calculate the read time of Markdown content, handling code blocks, tables, and Markdown syntax.
 * @param content - The Markdown content string
 * @returns Estimated read time as a string (e.g., "3 min read")
 */
export function calculateReadTime(content: string | null | undefined): string {
  if (!content) {
    return "1 min read";
  }

  const wordsPerMinute = 180;

  // Enhanced word count logic
  const getWordCount = (text: string): number => {
    // Remove fenced code blocks (e.g., ``` code ```)
    const noCodeBlocks = text.replace(/```[\s\S]*?```/g, "");

    // Remove inline code (e.g., `code`)
    const noInlineCode = noCodeBlocks.replace(/`[^`]*`/g, "");

    // Remove HTML tags (e.g., <p>, <a href="">)
    const noHtmlTags = noInlineCode.replace(/<\/?[^>]+(>|$)/g, "");

    // Remove Markdown links and images (e.g., [text](url) or ![alt](url))
    const noLinksAndImages = noHtmlTags.replace(
      /!\[.*?\]\(.*?\)|\[(.*?)\]\(.*?\)/g,
      "$1"
    );

    // Remove Markdown headers, blockquotes, and tables
    const noMarkdownSyntax = noLinksAndImages
      .replace(/^#+\s/gm, "") // Headers (e.g., # Header)
      .replace(/>\s?/g, "") // Blockquotes (e.g., > Quote)
      .replace(/^\|.*\|$/gm, "") // Tables (e.g., | Col1 | Col2 |)

      // Remove extra Markdown formatting characters (e.g., *, _, ~)
      .replace(/[*_~`]+/g, "");

    // Split the cleaned content by whitespace and count the words
    const wordCount = noMarkdownSyntax
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    return wordCount;
  };

  const wordCount = getWordCount(content);
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return `${minutes} min read`;
}
