export interface WikiEntry {
  title: string;
  description: string;
  pubDate: string;
  version: string;
  draft?: boolean;
  versionreleasedate: string;
  readTime?: string;
  tags: string[];
  slug: string;
}
