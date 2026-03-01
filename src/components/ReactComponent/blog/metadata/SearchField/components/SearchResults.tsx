import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import type { SearchResultsProps } from "types/search";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.1,
			staggerChildren: 0.05,
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

const SearchResults = memo(function SearchResults({
	query,
	results,
	selectedResultIndex,
	setSelectedResultIndex,
}: SearchResultsProps) {
	if (!query || results.length === 0) return null;

	return (
		<AnimatePresence mode="wait">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
				className="space-y-4"
				role="listbox"
				aria-label="Search results"
			>
				{results.map((post, index) => (
					<SearchResultItem
						key={post.slug}
						post={post}
						index={index}
						isSelected={selectedResultIndex === index}
						setSelectedResultIndex={setSelectedResultIndex}
					/>
				))}
			</motion.div>
		</AnimatePresence>
	);
});

const SearchResultItem = memo(function SearchResultItem({
	post,
	index,
	isSelected,
	setSelectedResultIndex,
}: {
	post: SearchResultsProps["results"][0];
	index: number;
	isSelected: boolean;
	setSelectedResultIndex: (index: number) => void;
}) {
	return (
		<motion.a
			data-result-index={index}
			href={`/blog/${post.slug}`}
			variants={itemVariants}
			className={`group block rounded-2xl border bg-[#24283b]/60 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-[#7aa2f7]/40 hover:bg-[#24283b]/80 hover:shadow-2xl hover:shadow-[#7aa2f7]/10 ${
				isSelected
					? "border-[#7aa2f7]/50 shadow-lg shadow-[#7aa2f7]/10"
					: "border-[#565f89]/30"
			}`}
			whileHover={{ scale: 1.01 }}
			onMouseEnter={() => setSelectedResultIndex(index)}
			role="option"
			aria-selected={isSelected}
		>
			<h3 className="mb-2 text-xl font-bold text-[#c0caf5] transition-colors group-hover:text-[#7aa2f7]">
				{post.data.title}
			</h3>
			<p className="mb-4 text-sm leading-relaxed text-[#a9b1d6]">
				{post.data.description}
			</p>
			{post.data.tags && (
				<div className="flex flex-wrap gap-2">
					{post.data.tags.map((tag) => (
						<span
							key={tag}
							className="rounded-lg bg-[#1a1b26]/80 px-2.5 py-1 text-xs text-[#7aa2f7] transition-colors group-hover:bg-[#1a1b26] group-hover:text-[#bb9af7]"
						>
							#{tag}
						</span>
					))}
				</div>
			)}
		</motion.a>
	);
});

export default SearchResults;
