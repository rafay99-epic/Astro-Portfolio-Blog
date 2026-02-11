import { z } from "zod";
import { PostSchema } from "./articles";

export const SearchInputPropsSchema = z.object({
	query: z.string(),
	setQuery: z.function().args(z.string()).returns(z.void()),
	isSearchFocused: z.boolean(),
	setIsSearchFocused: z.function().args(z.boolean()).returns(z.void()),
	setShowSearchTips: z.function().args(z.boolean()).returns(z.void()),
	setSelectedResultIndex: z.function().args(z.number()).returns(z.void()),
	isMobile: z.boolean(),
	resultsLength: z.number(),
});

export const SearchTipsPropsSchema = z.object({
	showSearchTips: z.boolean(),
	query: z.string(),
	setQuery: z.function().args(z.string()).returns(z.void()),
});

export const SearchStatsDataSchema = z.object({
	totalResults: z.number(),
	searchTime: z.number(),
	relevanceScore: z.number(),
	matchedFields: z.array(z.string()),
});

export const SearchStatsPropsSchema = z.object({
	query: z.string(),
	results: z.array(PostSchema),
	searchStats: SearchStatsDataSchema,
});

export const SearchResultsPropsSchema = z.object({
	query: z.string(),
	results: z.array(PostSchema),
	selectedResultIndex: z.number(),
	setSelectedResultIndex: z.function().args(z.number()).returns(z.void()),
});

export const SearchStateSchema = z.object({
	query: z.string(),
	setQuery: z.function().args(z.string()).returns(z.void()),
	results: z.array(PostSchema),
	searchStats: SearchStatsDataSchema,
	searchHistory: z.array(z.string()),
	clearHistory: z.function().args().returns(z.void()),
});

export const SearchCacheSchema = z.object({
	results: z.array(PostSchema),
	stats: SearchStatsDataSchema,
	timestamp: z.number(),
});

export type Post = z.infer<typeof PostSchema>;
export type SearchInputProps = z.infer<typeof SearchInputPropsSchema>;
export type SearchTipsProps = z.infer<typeof SearchTipsPropsSchema>;
export type SearchStatsData = z.infer<typeof SearchStatsDataSchema>;
export type SearchStatsProps = z.infer<typeof SearchStatsPropsSchema>;
export type SearchResultsProps = z.infer<typeof SearchResultsPropsSchema>;
export type SearchState = z.infer<typeof SearchStateSchema>;
export type SearchCache = z.infer<typeof SearchCacheSchema>;
