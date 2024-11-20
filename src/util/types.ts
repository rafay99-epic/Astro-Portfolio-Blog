// types.ts

export interface PopularBlog {
  Page: string;
  Visitors: number;
}

export interface ApiTrendingPost {
  slug: string;
  visitors: number;
}

export interface CombinedPost {
  post: any;
  visitors: number;
}
