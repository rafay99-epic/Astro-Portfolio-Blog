import { memo } from "react";
import { motion } from "framer-motion";

interface ProfileImageProps {
  picture: string;
}

const ProfileImage = memo(function ProfileImage({
  picture,
}: ProfileImageProps) {
  return (
    <motion.div
      className="relative flex items-center justify-center w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Simple background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-transparent rounded-full blur-3xl scale-110" />

      {/* Main image container */}
      <motion.div
        className="relative z-10 group"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Single rotating ring */}
        <div className="absolute inset-0 -m-4">
          <motion.div
            className="w-full h-full rounded-full border-2 border-dashed border-[var(--accent)]/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Image frame */}
        <div className="relative rounded-full overflow-hidden border-4 border-[var(--accent)]/40 shadow-2xl bg-gradient-to-br from-[var(--accent-dark)]/20 to-transparent">
          <img
            src={picture}
            alt="Profile Image"
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover transition-all duration-300 group-hover:brightness-110"
          />

          {/* Simple overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Status indicator */}
        <motion.div
          className="absolute -bottom-4 -left-4 bg-[var(--accent-dark)]/90 backdrop-blur-sm border border-[var(--accent)]/30 rounded-xl px-3 py-2 shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
            <span className="text-xs font-medium text-[var(--text-light)]">
              Creating
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

export default ProfileImage;
