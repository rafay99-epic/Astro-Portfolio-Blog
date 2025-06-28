import type { Post } from "types/articles";

export interface SearchInputProps {
  query: string;
  setQuery: (value: string) => void;
  isSearchFocused: boolean;
  setIsSearchFocused: (value: boolean) => void;
  setShowSearchTips: (value: boolean) => void;
  setSelectedResultIndex: (value: number) => void;
  isMobile: boolean;
  resultsLength: number;
}

export interface SearchTipsProps {
  showSearchTips: boolean;
  query: string;
  setQuery: (value: string) => void;
}

export interface SearchStatsProps {
  query: string;
  results: Post[];
  searchStats: {
    totalResults: number;
    searchTime: number;
    relevanceScore: number;
    matchedFields: string[];
  };
}

export interface SearchResultsProps {
  query: string;
  results: Post[];
  selectedResultIndex: number;
  setSelectedResultIndex: (value: number) => void;
}

export interface SearchState {
  query: string;
  setQuery: (value: string) => void;
  results: Post[];
  searchStats: {
    totalResults: number;
    searchTime: number;
    relevanceScore: number;
    matchedFields: string[];
  };
  searchHistory: string[];
  clearHistory: () => void;
}

export interface SearchCache {
  results: Post[];
  stats: SearchState["searchStats"];
  timestamp: number;
}
