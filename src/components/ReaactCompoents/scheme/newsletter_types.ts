// newsletterTypes.ts

export interface Newsletter {
  slug: string;
  data: {
    title: string;
    summary: string;
    pubDate: Date;
  };
}
