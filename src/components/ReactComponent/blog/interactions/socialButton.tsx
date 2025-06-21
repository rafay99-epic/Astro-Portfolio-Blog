import React from "react";
import { siX, siFacebook, siLinkedin, siWhatsapp } from "simple-icons/icons";
import { generateShareUrls } from "types/shareUtils";

interface ShareButtonsProps {
  url: string;
  pagetitle: string;
}

const injectFillColor = (svg: string, color: string) => {
  return svg.replace("<svg", `<svg fill="${color}"`);
};

const sharePlatforms = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: siWhatsapp,
    color: "#25D366",
  },
  {
    id: "twitter",
    label: "Twitter",
    icon: siX,
    color: "#1DA1F2",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: siFacebook,
    color: "#1877F2",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: siLinkedin,
    color: "#0A66C2",
  },
];

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, pagetitle }) => {
  const shareUrls = generateShareUrls(url);

  return (
    <div className="mt-12">
      {/* Container */}
      <div className="backdrop-blur-xl bg-[#24283b]/40 border border-[#565f89]/30 rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📤</span>
            </div>
            <h3 className="text-xl font-bold">
              <span className="bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-clip-text text-transparent">
                Share this {pagetitle}
              </span>
            </h3>
          </div>
          <p className="text-[#a9b1d6] text-base">
            Help others discover this content by sharing it on your favorite
            platform
          </p>
        </div>

        {/* Share Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          {sharePlatforms.map((platform) => (
            <a
              key={platform.id}
              href={shareUrls[platform.id]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${platform.label}`}
              className="group relative flex flex-col items-center justify-center w-20 h-20 rounded-xl backdrop-blur-sm bg-[#1a1b26]/60 border border-[#565f89]/40 hover:border-[#7aa2f7]/60 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#7aa2f7]/20"
            >
              {/* Platform Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 mb-1"
                style={{
                  background: `linear-gradient(135deg, ${platform.color}20, ${platform.color}10)`,
                  border: `1px solid ${platform.color}40`,
                }}
              >
                <img
                  src={`data:image/svg+xml;base64,${btoa(
                    injectFillColor(platform.icon.svg, platform.color)
                  )}`}
                  alt={platform.label}
                  className="w-7 h-7 object-contain group-hover:brightness-110 transition-all duration-300"
                />
              </div>

              {/* Label */}
              <span className="text-[#a9b1d6] text-xs font-medium group-hover:text-[#c0caf5] transition-colors duration-300">
                {platform.label}
              </span>

              {/* Hover Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl">
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full blur-lg"
                  style={{
                    background: `${platform.color}20`,
                  }}
                />
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#565f89]/20 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-[#565f89]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#9ece6a] rounded-full"></div>
              <span>Ready to Share</span>
            </div>
            <span>•</span>
            <span>{sharePlatforms.length} Platforms Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;
