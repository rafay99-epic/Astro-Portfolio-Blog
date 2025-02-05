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

// Version 01: with tab

// import { useState, useEffect } from "react";
// import type { WikiEntry } from "types/changeLog";

// interface WebWikiSliderProps {
//   wikiData: WikiEntry[];
// }

// export default function WebWikiSlider({ wikiData }: WebWikiSliderProps) {
//   if (!wikiData || wikiData.length === 0) {
//     return <div className="text-center text-white">No wiki data available</div>;
//   }

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [versionType, setVersionType] = useState<"major" | "minor">("major");

//   useEffect(() => {
//     console.log("Component Rendered, Current Index:", currentIndex);
//     console.log("Wiki Data Loaded:", wikiData);
//   }, [currentIndex, wikiData]);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % wikiData.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? wikiData.length - 1 : prevIndex - 1
//     );
//   };

//   useEffect(() => {
//     setCurrentIndex(0);
//   }, [versionType]);

//   const filteredWikiData = wikiData.filter((entry) => {
//     if (versionType === "major") {
//       return entry.tags.includes("Major Release");
//     } else if (versionType === "minor") {
//       return entry.tags.includes("Minior Release");
//     }
//     return true;
//   });

//   const isPrevDisabled = currentIndex === 0;
//   const isNextDisabled = currentIndex === filteredWikiData.length - 1;

//   return (
//     <div className="p-6 max-w-7xl mx-auto bg-[var(--accent-dark)] text-[var(--text-light)] rounded-2xl border-2 border-[var(--accent)]">
//       <h2 className="text-center text-6xl font-bold mb-6">What's New</h2>
//       <p className="text-center text-lg font-bold mb-6">
//         Stay up-to-date with the latest features, updates, and improvements in
//         our platform.
//       </p>
//       <div className="flex justify-center mb-6">
//         <button
//           onClick={() => setVersionType("major")}
//           className={`px-6 py-2 font-semibold text-lg ${
//             versionType === "major"
//               ? "bg-[var(--accent)] text-white"
//               : "bg-[var(--gray-light)] text-[var(--accent)]"
//           } rounded-md transition-all duration-300 hover:scale-105`}
//         >
//           Major Release
//         </button>
//         <button
//           onClick={() => setVersionType("minor")}
//           className={`px-6 py-2 font-semibold text-lg ml-4 ${
//             versionType === "minor"
//               ? "bg-[var(--accent)] text-white"
//               : "bg-[var(--gray-light)] text-[var(--accent)]"
//           } rounded-md transition-all duration-300 hover:scale-105`}
//         >
//           Minor Release
//         </button>
//       </div>

//       {filteredWikiData.length > 0 && (
//         <a
//           href={`/webwiki/${filteredWikiData[currentIndex].slug}`}
//           rel="noopener noreferrer"
//           aria-label={`Wiki entry: ${wikiData[currentIndex].title}`}
//           className="block p-6 bg-[var(--gray-gradient)] rounded-lg transition-all duration-300 ease-in-out hover:opacity-90 group"
//         >
//           <h3 className="text-2xl font-semibold text-[var(--accent)] mb-2 transition-all duration-300 group-hover:underline group-hover:underline-offset-4">
//             {filteredWikiData[currentIndex].title}
//           </h3>
//           <p className="text-[var(--text-light)] opacity-90 mb-4 leading-relaxed">
//             {filteredWikiData[currentIndex].description}
//           </p>

//           <div className="text-sm text-[var(--accent)] flex justify-between items-center border-b border-[var(--gray-light)] pb-2 mb-4">
//             <span>Version: {filteredWikiData[currentIndex].version}</span>
//             <span>
//               Released:{" "}
//               {new Date(
//                 filteredWikiData[currentIndex].versionreleasedate
//               ).toDateString()}
//             </span>
//           </div>

//           <div className="text-xs text-[var(--gray-light)] flex justify-between">
//             <span>
//               Published:{" "}
//               {new Date(filteredWikiData[currentIndex].pubDate).toDateString()}
//             </span>
//             {filteredWikiData[currentIndex].readTime && (
//               <span>Read Time: {filteredWikiData[currentIndex].readTime}</span>
//             )}
//           </div>

//           <div className="mt-4 flex flex-wrap gap-2">
//             {filteredWikiData[currentIndex].tags.map((tag, i) => (
//               <span
//                 key={i}
//                 className="px-3 py-1 text-base bg-[var(--accent)] text-white rounded-md"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         </a>
//       )}

//       <div className="flex justify-between mt-6">
//         <button
//           onClick={prevSlide}
//           disabled={isPrevDisabled}
//           className={`px-4 py-2 bg-[var(--accent)] text-white font-semibold rounded-md transition-transform transform hover:scale-105 ${isPrevDisabled ? "bg-[var(--gray-light)] text-[var(--gray-dark)] cursor-not-allowed" : ""}`}
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={nextSlide}
//           disabled={isNextDisabled}
//           className={`px-4 py-2 bg-[var(--accent)] text-white font-semibold rounded-md transition-transform transform hover:scale-105 ${isNextDisabled ? "bg-[var(--gray-light)] text-[var(--gray-dark)] cursor-not-allowed" : ""}`}
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// }
