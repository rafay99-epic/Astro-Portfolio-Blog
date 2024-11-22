export function calculateReadTime(content: string | null | undefined): string {
  if (!content) {
    return "1 min read";
  }

  const wordsPerMinute = 180;

  const getWordCount = (text: string): number => {
    const noCodeBlocks = text.replace(/```[\s\S]*?```/g, "");

    const noInlineCode = noCodeBlocks.replace(/`[^`]*`/g, "");

    const noHtmlTags = noInlineCode.replace(/<\/?[^>]+(>|$)/g, "");

    const noLinksAndImages = noHtmlTags.replace(
      /!\[.*?\]\(.*?\)|\[(.*?)\]\(.*?\)/g,
      "$1"
    );

    const noMarkdownSyntax = noLinksAndImages
      .replace(/^#+\s/gm, "")
      .replace(/>\s?/g, "")
      .replace(/^\|.*\|$/gm, "")

      .replace(/[*_~`]+/g, "");

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
