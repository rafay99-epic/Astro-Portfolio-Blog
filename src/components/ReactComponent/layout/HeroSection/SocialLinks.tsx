import React, { memo } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

interface SocialLinksProps {
  socialLinks: {
    twitter: string;
    github: string;
    upwork: string;
    youtube: string;
    whatsNumber: string;
    linkedin: string;
  };
}

const SocialLinks = memo(function SocialLinks({
  socialLinks,
}: SocialLinksProps) {
  const socialPlatforms = [
    {
      name: "GitHub",
      url: socialLinks.github,
      icon: Github,
      color: "hover:text-[#a9b1d6]",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/in/${socialLinks.linkedin}`,
      icon: Linkedin,
      color: "hover:text-[#7aa2f7]",
    },
    {
      name: "Twitter",
      url: socialLinks.twitter,
      icon: Twitter,
      color: "hover:text-[#bb9af7]",
    },
    {
      name: "YouTube",
      url: socialLinks.youtube,
      icon: Youtube,
      color: "hover:text-[#9ece6a]",
    },
  ];

  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}
    >
      <span className="text-sm font-medium text-[#a9b1d6]">Follow me</span>
      <div className="flex gap-3 sm:gap-4">
        {socialPlatforms.map((platform, index) => {
          const IconComponent = platform.icon;
          return (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#a9b1d6] transition-all duration-300 ${platform.color} hover:scale-125`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + index * 0.1, duration: 0.3 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
});

export default SocialLinks;