import { useState } from "react";
import Fuse from "fuse.js";
import type { Post } from "types/articles";
import type { Idea, IdeaCategory } from "types/ideas";
import ideaData from "@config/ideaPannel/ideaPannel.json";

interface IdeaPanelProps {
  posts: Post[];
}

const ideaDataTyped: IdeaCategory[] = ideaData;

export default function IdeaPanel({ posts }: IdeaPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

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

  return (
    <div className="bg-[var(--accent-dark)] min-h-screen p-4 sm:p-6">
      <h1 className="text-[var(--text-light)] text-6xl sm:text-6xl font-bold mb-4 text-center">
        Idea Panel
      </h1>

      <div className="mb-4 flex flex-col sm:flex-row sm:gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-[var(--accent)] bg-[var(--gray-gradient)] text-[var(--text-light)] mb-3 sm:mb-0"
          placeholder="Search for ideas..."
        />

        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="p-3 rounded-lg border border-[var(--accent)] bg-[var(--gray-gradient)] text-[var(--text-light)]"
        >
          <option value="">All Categories</option>
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

      {/* Sidebar Toggle for Mobile */}
      <button
        className="sm:hidden p-2 bg-[var(--accent)] text-[var(--text-dark)] rounded-lg mb-4 w-full text-center font-semibold"
        onClick={() => setSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <aside
          className={`sm:block sm:w-1/4 sm:pr-4 ${
            isSidebarVisible ? "block" : "hidden"
          }`}
        >
          <h2 className="text-[var(--accent)] text-xl font-semibold mb-4">
            Filter Options
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-[var(--text-light)] text-lg font-semibold mb-2">
                Categories
              </h3>
              <ul className="space-y-2">
                {uniqueCategories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category ? null : category
                        )
                      }
                      className={`w-full text-left p-2 rounded-lg ${
                        selectedCategory === category
                          ? "bg-[var(--accent)] text-[var(--text-dark)]"
                          : "bg-[var(--gray-gradient)] text-[var(--text-light)]"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[var(--text-light)] text-lg font-semibold mb-2">
                Stages
              </h3>
              <ul className="space-y-2">
                {uniqueStages.map((stage) => (
                  <li key={stage}>
                    <button
                      onClick={() =>
                        setSelectedStage(selectedStage === stage ? null : stage)
                      }
                      className={`w-full text-left p-2 rounded-lg ${
                        selectedStage === stage
                          ? "bg-[var(--accent)] text-[var(--text-dark)]"
                          : "bg-[var(--gray-gradient)] text-[var(--text-light)]"
                      }`}
                    >
                      {stage}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="sm:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryAndStageFilteredResults.map((category) => (
              <section key={category.category}>
                <h2 className="text-[var(--accent)] text-2xl font-semibold mb-4">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.ideas.map((idea) => (
                    <div
                      key={idea.title}
                      className="bg-[var(--gray-gradient)] p-4 sm:p-6 rounded-lg shadow-lg border border-[var(--accent)] 
                                 transform transition-transform duration-300 hover:scale-105 hover:shadow-[var(--box-shadow)]"
                    >
                      <h3 className="text-[var(--text-light)] text-lg sm:text-xl font-semibold">
                        {idea.title}
                      </h3>
                      <p className="text-[var(--gray-light)] mt-2 text-sm sm:text-base">
                        {idea.description}
                      </p>

                      <p className="text-[var(--accent)] mt-4 text-sm">
                        <strong>Status:</strong> {idea.stage || "No status set"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
