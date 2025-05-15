export interface CacheEntry {
  summary: string;
  hash: string;
  timestamp: number;
  metadata: SummaryMetadata;
}

export interface SummaryMetadata {
  originalLength: number;
  summaryLength: number;
  compressionRatio: string;
}

export interface RateLimitEntry {
  count: number;
  timestamp: number;
}

export interface ApiResponse {
  summary?: string;
  metadata?: SummaryMetadata;
  cached?: boolean;
  error?: string;
  code?: string;
  details?: string;
}
