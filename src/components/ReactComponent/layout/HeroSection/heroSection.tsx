import React from "react";
import { motion } from "framer-motion";
import Greeting from "./Greeting";
import ProfileImage from "./ProfileImage";
import SocialLinks from "./SocialLinks";
import ConnectButton from "./ConnectButton";

interface HeroSectionProps {
  name: string;
  jobTitle: string;
  position: string;
  picture: string;
  socialLinks: {
    twitter: string;
    github: string;
    upwork: string;
    youtube: string;
    whatsNumber: string;
    linkedin: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  jobTitle,
  position,
  picture,
  socialLinks,
}) => {
  return (
    <motion.section
      className="relative w-full overflow-hidden bg-gradient-to-br from-[var(--background)] via-[var(--accent-dark)]/5 to-[var(--background)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Simple background gradient - no expensive animations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--accent)/8,_transparent_60%)] pointer-events-none" />

      {/* Minimal floating elements - only 3 instead of 12 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-[var(--accent)]/3 rounded-full blur-xl" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-[var(--accent)]/4 rounded-full blur-lg" />
      </div>

      {/* Main Content Container - Full Width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Container - Text Content */}
          <motion.div
            className="space-y-4 lg:space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Greeting name={name} jobTitle={jobTitle} position={position} />

            <SocialLinks socialLinks={socialLinks} />

            <ConnectButton />
          </motion.div>

          {/* Right Container - Profile Image */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ProfileImage picture={picture} />
          </motion.div>
        </div>
      </div>

      {/* Simple decorative elements - static for performance */}
      <div className="absolute top-20 left-8 w-1 h-1 bg-[var(--accent)]/40 rounded-full" />
      <div className="absolute bottom-32 right-16 w-1.5 h-1.5 bg-[var(--accent)]/30 rounded-full" />
      <div className="absolute top-1/3 right-8 w-0.5 h-0.5 bg-[var(--accent)]/50 rounded-full" />
    </motion.section>
  );
};

export default HeroSection;
