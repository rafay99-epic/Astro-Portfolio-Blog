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
  { id: "whatsapp", label: "WhatsApp", icon: siWhatsapp },
  { id: "twitter", label: "Twitter", icon: siX },
  { id: "facebook", label: "Facebook", icon: siFacebook },
  { id: "linkedin", label: "LinkedIn", icon: siLinkedin },
];

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, pagetitle }) => {
  const shareUrls = generateShareUrls(url);

  return (
    <div className="mt-8 text-center">
      <p className="text-xl font-semibold text-gray-100 dark:text-white mb-4">
        Share this {pagetitle}:
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {sharePlatforms.map((platform) => (
          <a
            key={platform.id}
            href={shareUrls[platform.id]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${platform.label}`}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#1f2335] hover:bg-[#7aa2f7] transition-all duration-300 hover:scale-105"
          >
            <img
              src={`data:image/svg+xml;base64,${btoa(
                injectFillColor(platform.icon.svg, "white")
              )}`}
              alt={platform.label}
              className="w-8 h-8 object-contain pt-1"
            />
            <span className="absolute bottom-[-1.75rem] text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity ">
              {platform.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;
