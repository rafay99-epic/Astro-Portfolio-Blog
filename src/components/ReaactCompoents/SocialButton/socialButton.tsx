import React from "react";
import { siX, siFacebook, siLinkedin, siWhatsapp } from "simple-icons/icons";

interface ShareButtonsProps {
  url: string;
}

// Helper function to inject fill color into the SVG
const injectFillColor = (svg: string, color: string) => {
  return svg.replace("<svg", `<svg fill="${color}"`);
};

const ShareButtons: React.FC<ShareButtonsProps> = ({ url }) => {
  // Share URL generators
  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/share?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
  };

  return (
    <div className="mt-4 text-center">
      {/* Text to indicate sharing */}
      <p className="text-lg font-semibold text-white mb-2">
        Share this blog post:
      </p>

      {/* Share buttons */}
      <div className="flex justify-center space-x-4">
        {/* WhatsApp */}
        <a
          href={shareUrls.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center w-16 h-16 rounded-full bg-[#1f2335] hover:bg-[#7aa2f7] transition duration-300"
          aria-label="Share on WhatsApp"
        >
          <img
            src={`data:image/svg+xml;base64,${btoa(injectFillColor(siWhatsapp.svg, "white"))}`}
            alt="WhatsApp"
            className="w-8 h-8"
          />
        </a>

        {/* Twitter */}
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center w-16 h-16 rounded-full bg-[#1f2335] hover:bg-[#7aa2f7] transition duration-300"
          aria-label="Share on Twitter"
        >
          <img
            src={`data:image/svg+xml;base64,${btoa(injectFillColor(siX.svg, "white"))}`}
            alt="Twitter"
            className="w-8 h-8"
          />
        </a>

        {/* Facebook */}
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center w-16 h-16 rounded-full bg-[#1f2335] hover:bg-[#7aa2f7] transition duration-300"
          aria-label="Share on Facebook"
        >
          <img
            src={`data:image/svg+xml;base64,${btoa(injectFillColor(siFacebook.svg, "white"))}`}
            alt="Facebook"
            className="w-8 h-8"
          />
        </a>

        {/* LinkedIn */}
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center w-16 h-16 rounded-full bg-[#1f2335] hover:bg-[#7aa2f7] transition duration-300"
          aria-label="Share on LinkedIn"
        >
          <img
            src={`data:image/svg+xml;base64,${btoa(injectFillColor(siLinkedin.svg, "white"))}`}
            alt="LinkedIn"
            className="w-8 h-8"
          />
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;
