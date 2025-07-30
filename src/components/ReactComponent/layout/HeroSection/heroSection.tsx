import React, { memo, useMemo } from "react";
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

// Memoized background orbs component for better performance
const BackgroundOrbs = memo(() => {
  const orbVariants = useMemo(() => ({
    primary1: {
      scale: [1, 1.05, 1],
      opacity: [0.4, 0.6, 0.4],
    },
    primary2: {
      scale: [1.05, 1, 1.05],
      opacity: [0.5, 0.7, 0.5],
    },
    secondary1: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3],
    },
    secondary2: {
      scale: [1.1, 1, 1.1],
      opacity: [0.4, 0.6, 0.4],
    },
  }), []);

  return (
    <div className="absolute inset-0 will-change-transform">
      {/* Primary Gradient Orbs - Optimized with GPU acceleration */}
      <motion.div
        className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-[#7aa2f7]/30 via-[#7aa2f7]/15 to-transparent rounded-full blur-3xl transform-gpu"
        animate={orbVariants.primary1}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatDelay: 0
        }}
        style={{ 
          willChange: "transform, opacity",
          backfaceVisibility: "hidden"
        }}
      />
      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-[#bb9af7]/25 via-[#bb9af7]/12 to-transparent rounded-full blur-3xl transform-gpu"
        animate={orbVariants.primary2}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatDelay: 0
        }}
        style={{ 
          willChange: "transform, opacity",
          backfaceVisibility: "hidden"
        }}
      />
      
      {/* Secondary Accent Orbs - Reduced complexity */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-[#9ece6a]/20 via-[#9ece6a]/10 to-transparent rounded-full blur-2xl transform-gpu"
        animate={orbVariants.secondary1}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatDelay: 0
        }}
        style={{ 
          willChange: "transform, opacity",
          backfaceVisibility: "hidden"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-24 sm:w-36 h-24 sm:h-36 bg-gradient-to-br from-[#f7768e]/15 via-[#f7768e]/8 to-transparent rounded-full blur-2xl transform-gpu"
        animate={orbVariants.secondary2}
        transition={{ 
          duration: 13, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatDelay: 0
        }}
        style={{ 
          willChange: "transform, opacity",
          backfaceVisibility: "hidden"
        }}
      />
    </div>
  );
});

BackgroundOrbs.displayName = "BackgroundOrbs";

const HeroSection = memo(function HeroSection({
  name,
  jobTitle,
  position,
  picture,
  socialLinks,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#1a1b26] pt-20 sm:pt-24">
      {/* Optimized Background Elements */}
      <BackgroundOrbs />

      {/* Optimized Grid Pattern - Reduced opacity for better performance */}
      <div
        className="absolute inset-0 opacity-[0.02] transform-gpu"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #7aa2f7 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          willChange: "auto"
        }}
      />

      {/* Optimized Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1a1b26] via-[#1a1b26]/95 to-[#1a1b26]/90 z-10 transform-gpu"
        style={{ willChange: "auto" }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center w-full">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <Greeting name={name} jobTitle={jobTitle} position={position} />
            <SocialLinks socialLinks={socialLinks} />
            <ConnectButton />
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <ProfileImage picture={picture} />
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;