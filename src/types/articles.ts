export interface Post {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    heroImage?: string;
    draft: boolean;
    authorName: string;
    authorAvatar?: string;
    tags?: string[];
  };
}
