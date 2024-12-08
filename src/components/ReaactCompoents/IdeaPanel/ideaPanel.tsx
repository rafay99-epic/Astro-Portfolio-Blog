import { useState } from "react";
import Fuse from "fuse.js";
import type { Post } from "types/articles";
import type { Idea, IdeaCategory } from "types/ideas";
import ideaData from "@config/IdeaPanel/IdeaPanel.json";

interface IdeaPanelProps {
  posts: Post[];
}

const ideaDataTyped: IdeaCategory[] = ideaData.categories;

export default function IdeaPanel({ posts }: IdeaPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<"ideas" | "blogs">("ideas");

  const uniqueStages = Array.from(
    new Set(
      ideaDataTyped.flatMap((category) =>
        category.ideas.map((idea) => idea.stage)
      )
    )
  );

  const uniqueCategories = ideaDataTyped.map((category) => category.category);

  const fuse = new Fuse(ideaDataTyped, {
    keys: ["category", "ideas.title", "ideas.description", "ideas.stage"],
    includeScore: true,
    threshold: 0.3,
  });

  const filteredIdeas = ideaDataTyped.map((category) => ({
    ...category,
    ideas: category.ideas.filter(
      (idea) => !posts.some((post) => post.data.title === idea.title)
    ),
  }));

  const searchedResults =
    searchQuery.trim() === ""
      ? filteredIdeas
      : fuse
          .search(searchQuery)
          .map((result) => result.item)
          .reduce<IdeaCategory[]>((acc, category) => {
            const existingCategory = acc.find(
              (cat) => cat.category === category.category
            );

            if (existingCategory) {
              existingCategory.ideas.push(...category.ideas);
            } else {
              acc.push(category);
            }
            return acc;
          }, []);

  const categoryAndStageFilteredResults = searchedResults
    .filter((category) =>
      selectedCategory ? category.category === selectedCategory : true
    )
    .map((category) => ({
      ...category,
      ideas: category.ideas.filter((idea) =>
        selectedStage ? idea.stage === selectedStage : true
      ),
    }));

  const [collapsedCategories, setCollapsedCategories] = useState({});

  // Toggle collapse state for a specific category
  const toggleCollapse = (category) => {
    setCollapsedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category], // Toggle the current state
    }));
  };

  return (
    <div className="bg-[var(--accent-dark)] min-h-screen p-4 sm:p-6">
      <h1 className="text-[var(--text-light)] text-6xl sm:text-6xl font-bold mb-4 text-center">
        {currentPage === "ideas" ? "Idea Board" : "Blog Panel"}
      </h1>

      {currentPage === "ideas" && (
        <>
          {/* Filters */}
          <div className="mb-4 flex flex-col sm:flex-row sm:gap-4">
            <input
              type="text"
              value={searchQuery}
              aria-label="Search for ideas"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-[var(--accent)] bg-[var(--gray-gradient)] text-[var(--text-light)] mb-3 sm:mb-0"
              placeholder="Search for ideas..."
            />

            <select
              value={selectedCategory || ""}
              aria-label="Filter by category"
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="p-3 rounded-lg border border-[var(--accent)] bg-[var(--gray-gradient)] text-[var(--text-light)]"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedStage || ""}
              onChange={(e) => setSelectedStage(e.target.value || null)}
              className="p-3 rounded-lg border border-[var(--accent)] bg-[var(--gray-gradient)] text-[var(--text-light)]"
            >
              <option value="">All Stages</option>
              {uniqueStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          {/* Sticker Board */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {categoryAndStageFilteredResults.map((category) => (
              <section key={category.category}>
                <div
                  className="flex justify-between items-center cursor-pointer bg-[var(--gray-gradient)] p-4 sm:p-6 rounded-lg shadow-lg border border-[var(--accent)]"
                  onClick={() => toggleCollapse(category.category)}
                >
                  <h2 className="text-[var(--accent)] text-xl font-bold">
                    {category.category}
                  </h2>
                  <span className="text-[var(--text-light)] text-lg">
                    {collapsedCategories[category.category] ? "▼" : "▲"}
                  </span>
                </div>

                {!collapsedCategories[category.category] && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {category.ideas.map((idea) => (
                      <div
                        key={idea.title}
                        className="bg-[var(--gray-gradient)] p-4 rounded-lg shadow-lg border border-[var(--accent)] transform transition-transform duration-300 hover:scale-105 hover:shadow-[var(--box-shadow)]"
                      >
                        <h3 className="text-[var(--text-light)] text-lg sm:text-xl font-semibold">
                          {idea.title}
                        </h3>
                        <p className="text-[var(--gray-light)] mt-2 text-sm sm:text-base">
                          {idea.description}
                        </p>
                        <p className="text-[var(--accent)] mt-4 text-sm">
                          <strong>Status:</strong>{" "}
                          {idea.stage || "No status set"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </>
      )}
      {currentPage === "blogs" && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.filter((post) => post.data.draft).length > 0 ? (
            posts
              .filter((post) => post.data.draft)
              .map((post) => (
                <a
                  key={post.data.title}
                  href={`/blog/${post.slug}`}
                  className="block bg-[var(--gray-gradient)] p-4 sm:p-6 rounded-lg shadow-lg border border-[var(--accent)] transform transition-transform duration-300 hover:scale-105 hover:shadow-[var(--box-shadow)]"
                >
                  <h3 className="text-[var(--text-light)] text-lg sm:text-xl font-semibold">
                    {post.data.title}
                  </h3>
                  <p className="text-[var(--gray-light)] mt-2 text-sm sm:text-base">
                    {post.data.description}
                  </p>
                </a>
              ))
          ) : (
            <h2 className="text-[var(--text-light)] text-2xl text-center font-bold">
              No draft blog posts available.
            </h2>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-center">
        <button
          className={`p-3 mx-2 rounded-lg text-[var(--text-light)] bg-[var(--gray-gradient)] border ${
            currentPage === "ideas"
              ? "border-[var(--accent)]"
              : "border-transparent"
          }`}
          onClick={() => setCurrentPage("ideas")}
        >
          Ideas
        </button>
        <button
          className={`p-3 mx-2 rounded-lg text-[var(--text-light)] bg-[var(--gray-gradient)] border ${
            currentPage === "blogs"
              ? "border-[var(--accent)]"
              : "border-transparent"
          }`}
          onClick={() => setCurrentPage("blogs")}
        >
          Blogs
        </button>
      </div>
    </div>
  );
}
