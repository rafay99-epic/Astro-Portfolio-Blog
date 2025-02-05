interface WikiFilterProps {
  versionType: "major" | "minor";
  setVersionType: (type: "major" | "minor") => void;
}

export default function WikiFilter({
  versionType,
  setVersionType,
}: WikiFilterProps) {
  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={() => setVersionType("major")}
        className={`px-6 py-2 font-semibold text-lg ${
          versionType === "major"
            ? "bg-[var(--accent)] text-white"
            : "bg-[var(--gray-light)] text-[var(--accent)]"
        } rounded-md transition-all duration-300 hover:scale-105`}
      >
        Major Release
      </button>
      <button
        onClick={() => setVersionType("minor")}
        className={`px-6 py-2 font-semibold text-lg ml-4 ${
          versionType === "minor"
            ? "bg-[var(--accent)] text-white"
            : "bg-[var(--gray-light)] text-[var(--accent)]"
        } rounded-md transition-all duration-300 hover:scale-105`}
      >
        Minor Release
      </button>
    </div>
  );
}
