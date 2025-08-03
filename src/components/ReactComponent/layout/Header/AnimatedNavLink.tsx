// src/components/react/AnimatedNavLink.tsx
import React from "react";
import { motion } from "framer-motion";
import { LuExternalLink as ExternalLink } from "react-icons/lu";

interface NavLinkProps {
  href: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  isMobile?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const AnimatedNavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  icon,
  className = "",
  isMobile = false,
  onClick,
  target,
  rel
}) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`group flex items-center transition-all duration-300 ${
        isMobile
          ? "text-[#c0caf5] hover:text-[#7aa2f7] py-3 px-4 rounded-lg hover:bg-[#24283b]/80 border border-transparent hover:border-[#565f89]/30"
          : "text-[#c0caf5] hover:text-[#7aa2f7] px-3 py-2 rounded-lg hover:bg-[#24283b]/50"
      } ${className}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {icon && (
        <span
          className={`${
            children ? "mr-3" : ""
          } text-[#7aa2f7] group-hover:text-[#bb9af7] transition-colors duration-300`}
        >
          {icon}
        </span>
      )}
      {children && (
        <span className={`font-medium ${isMobile ? "text-base" : "text-sm"}`}>
          {children}
        </span>
      )}
      {isMobile && (
        <ExternalLink className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </motion.a>
  );
};

export default AnimatedNavLink;