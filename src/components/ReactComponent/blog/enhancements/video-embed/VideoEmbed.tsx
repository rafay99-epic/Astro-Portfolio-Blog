import type { FunctionComponent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

interface VideoEmbedProps {
  src: string;
  title?: string;
}

const VideoEmbed: FunctionComponent<VideoEmbedProps> = ({
  src,
  title = "Video player",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const isDirectVideo =
    src.includes("ufs.sh") || src.endsWith(".mp4") || src.endsWith(".webm");

  return (
    <div className="w-full max-w-[800px] mx-auto mb-8">
      <div
        className="relative w-full overflow-hidden rounded-xl bg-[var(--accent-dark)]/10"
        style={{
          paddingBottom: "56.25%" ,
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--accent-dark)]/10">
            <div className="w-10 h-10 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {isDirectVideo ? (
          <video
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            controls
            playsInline
            onLoadedData={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            preload="metadata"
            title={title}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe
            src={src}
            title={title}
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        )}
      </div>
    </div>
  );
};

export default VideoEmbed;
