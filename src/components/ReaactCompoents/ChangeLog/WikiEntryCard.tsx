import type { WikiEntry } from "types/changeLog";

interface WikiEntryCardProps {
  entry: WikiEntry;
}

export default function WikiEntryCard({ entry }: WikiEntryCardProps) {
  return (
    <a
      href={`/webwiki/${entry.slug}`}
      rel="noopener noreferrer"
      aria-label={`Wiki entry: ${entry.title}`}
      className="block p-6 bg-[var(--gray-gradient)] rounded-lg transition-all duration-300 ease-in-out hover:opacity-90 group"
    >
      <h3 className="text-2xl font-semibold text-[var(--accent)] mb-2 transition-all duration-300 group-hover:underline group-hover:underline-offset-4">
        {entry.title}
      </h3>
      <p className="text-[var(--text-light)] opacity-90 mb-4 leading-relaxed">
        {entry.description}
      </p>

      <div className="text-sm text-[var(--accent)] flex justify-between items-center border-b border-[var(--gray-light)] pb-2 mb-4">
        <span>Version: {entry.version}</span>
        <span>
          Released: {new Date(entry.versionreleasedate).toDateString()}
        </span>
      </div>

      <div className="text-xs text-[var(--gray-light)] flex justify-between">
        <span>Published: {new Date(entry.pubDate).toDateString()}</span>
        {entry.readTime && <span>Read Time: {entry.readTime}</span>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {entry.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 text-base bg-[var(--accent)] text-white rounded-md"
          >
            #{tag}
          </span>
        ))}
      </div>
    </a>
  );
}
