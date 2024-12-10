// src/types.ts or src/types/wikiPageTypes.ts

export interface Version {
  title: string;
  description: string;
  pubDate: string | Date;
  version: string;
  versionreleasedate: string | Date;
  tags: string[];
  slug: string;
  draft: boolean;
}

export interface WikiPageProps {
  versions: any[];
}
