import React from "react";
import { siX, siFacebook, siLinkedin, siWhatsapp } from "simple-icons/icons";
import { generateShareUrls } from "../scheme/shareUtils";

interface ShareButtonsProps {
  url: string;
  pagetitle: string;
}

const injectFillColor = (svg: string, color: string) => {
  return svg.replace("<svg", `<svg fill="${color}"`);
};

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, pagetitle }) => {
  const shareUrls = generateShareUrls(url);

  return (
    <div className="mt-4 text-center">
      <p className="text-lg font-semibold text-white mb-2">
        Share this {pagetitle}:
      </p>

      <div className="flex justify-center space-x-4">
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
