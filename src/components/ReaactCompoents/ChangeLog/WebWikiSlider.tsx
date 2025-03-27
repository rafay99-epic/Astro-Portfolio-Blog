import { useState, useEffect } from "react";
import type { WikiEntry } from "types/changeLog";
import WikiEntryCard from "./WikiEntryCard";
import WikiNavigation from "./WikiNavigation";
import WikiFilter from "./WikiFilter";

interface WebWikiSliderProps {
  wikiData: WikiEntry[];
}

export default function WebWikiSlider({ wikiData }: WebWikiSliderProps) {
  if (!wikiData || wikiData.length === 0) {
    return <div className="text-center text-white">No wiki data available</div>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [versionType, setVersionType] = useState<"major" | "minor">("major");

  useEffect(() => {}, [currentIndex, wikiData]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [versionType]);

  const filteredWikiData = wikiData.filter((entry) =>
    versionType === "major"
      ? entry.tags.includes("Major Release")
      : entry.tags.includes("Minior Release")
  );

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % filteredWikiData.length);
  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? filteredWikiData.length - 1 : prev - 1
    );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[var(--accent-dark)] text-[var(--text-light)] rounded-2xl border-2 border-[var(--accent)]">
      <h2 className="text-center text-6xl font-bold mb-6">What's New</h2>
      <p className="text-center text-lg font-bold mb-6">
        Stay up-to-date with the latest features, updates, and improvements in
        our platform.
      </p>

      <WikiFilter versionType={versionType} setVersionType={setVersionType} />

      {filteredWikiData.length > 0 && (
        <WikiEntryCard entry={filteredWikiData[currentIndex]} />
      )}

      <WikiNavigation
        onNext={nextSlide}
        onPrev={prevSlide}
        isPrevDisabled={currentIndex === 0}
        isNextDisabled={currentIndex === filteredWikiData.length - 1}
      />
    </div>
  );
}
