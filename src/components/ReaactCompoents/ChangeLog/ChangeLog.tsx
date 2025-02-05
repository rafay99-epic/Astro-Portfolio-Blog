import { useState, useEffect } from "react";

interface WikiEntry {
  title: string;
  description: string;
  pubDate: string;
  version: string;
  draft?: boolean;
  versionreleasedate: string;
  readTime?: string;
  tags: string[];
  slug: string;
}

interface WebWikiSliderProps {
  wikiData: WikiEntry[];
}

export default function WebWikiSlider({ wikiData }: WebWikiSliderProps) {
  if (!wikiData || wikiData.length === 0) {
    return <div className="text-center text-white">No wiki data available</div>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("Component Rendered, Current Index:", currentIndex);
    console.log("Wiki Data Loaded:", wikiData);
  }, [currentIndex, wikiData]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wikiData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? wikiData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[var(--accent-dark)] text-[var(--text-light)] rounded-2xl">
      <h2 className="text-center text-6xl font-bold mb-6">What's New</h2>

      <a
        href={`/webwiki/${wikiData[currentIndex].slug}`}
        rel="noopener noreferrer"
        className="block p-6 bg-[var(--gray-gradient)] rounded-lg transition-all duration-300 ease-in-out hover:opacity-90 group"
      >
        <h3 className="text-2xl font-semibold text-[var(--accent)] mb-2 transition-all duration-300 group-hover:underline group-hover:underline-offset-4">
          {wikiData[currentIndex].title}
        </h3>
        <p className="text-[var(--text-light)] opacity-90 mb-4 leading-relaxed">
          {wikiData[currentIndex].description}
        </p>

        <div className="text-sm text-[var(--accent)] flex justify-between items-center border-b border-[var(--gray-light)] pb-2 mb-4">
          <span>Version: {wikiData[currentIndex].version}</span>
          <span>
            Released:{" "}
            {new Date(wikiData[currentIndex].versionreleasedate).toDateString()}
          </span>
        </div>

        <div className="text-xs text-[var(--gray-light)] flex justify-between">
          <span>
            Published: {new Date(wikiData[currentIndex].pubDate).toDateString()}
          </span>
          {wikiData[currentIndex].readTime && (
            <span>Read Time: {wikiData[currentIndex].readTime}</span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {wikiData[currentIndex].tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-base	bg-[var(--accent)] text-black rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </a>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevSlide}
          className="px-4 py-2 bg-[var(--accent)] text-black font-semibold rounded-md transition-transform transform hover:scale-105 max-w-xs"
        >
          ← Previous
        </button>
        <button
          onClick={nextSlide}
          className="px-4 py-2 bg-[var(--accent)] text-black font-semibold rounded-md transition-transform transform hover:scale-105 max-w-xs"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
