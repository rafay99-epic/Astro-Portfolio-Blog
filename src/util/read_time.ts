export function calculateReadTime(content: string | null | undefined): string {
  if (!content) {
    return '1 min read';
  }
  const wordsPerMinute = 180;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}
