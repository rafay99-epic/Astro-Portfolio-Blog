import { memo } from "react";
import { motion } from "framer-motion";
import type { NavigationButtonProps } from "types/image_slider";

export const NavigationButton = memo(function NavigationButton({
  direction,
  onClick,
  themeClasses,
}: NavigationButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`absolute top-1/2 ${direction === "prev" ? "left-4" : "right-4"} transform -translate-y-1/2 p-3 rounded-full 
        opacity-75 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 
        ${themeClasses.buttons} ${themeClasses.ring}`}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} slide`}
    >
      {direction === "prev" ? "❮" : "❯"}
    </motion.button>
  );
});
