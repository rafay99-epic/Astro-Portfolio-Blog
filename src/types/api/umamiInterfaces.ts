export interface PageView {
  page: string;
  pageviews: number;
}

export interface TrendingPostResponse {
  message?: string;
  posts?: PageView[];
}
