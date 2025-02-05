interface WikiNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

export default function WikiNavigation({
  onNext,
  onPrev,
  isPrevDisabled,
  isNextDisabled,
}: WikiNavigationProps) {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onPrev}
        disabled={isPrevDisabled}
        className={`px-4 py-2 bg-[var(--accent)] text-white font-semibold rounded-md transition-transform transform hover:scale-105 ${
          isPrevDisabled
            ? "bg-[var(--gray-light)] text-[var(--gray-dark)] cursor-not-allowed"
            : ""
        }`}
      >
        ← Previous
      </button>
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`px-4 py-2 bg-[var(--accent)] text-white font-semibold rounded-md transition-transform transform hover:scale-105 ${
          isNextDisabled
            ? "bg-[var(--gray-light)] text-[var(--gray-dark)] cursor-not-allowed"
            : ""
        }`}
      >
        Next →
      </button>
    </div>
  );
}
