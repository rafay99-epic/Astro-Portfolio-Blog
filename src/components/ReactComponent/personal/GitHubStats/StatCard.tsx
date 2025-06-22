import React from "react";
import { memo } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}

const cardVariants = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
      duration: 0.4,
    },
  },
};

const StatCard = memo(function StatCard({
  title,
  value,
  icon,
  gradient,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative group"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300`}
      />
      <div
        className="relative rounded-2xl p-6 shadow-lg backdrop-blur-sm overflow-hidden border will-change-transform"
        style={{
          backgroundColor: "#24283b",
          borderColor: "#565f89",
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="text-[#7aa2f7] text-2xl flex-shrink-0">{icon}</div>
          <div className="min-w-0">
            <motion.p
              className="text-sm truncate"
              style={{ color: "#a9b1d6" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.2, duration: 0.3 }}
            >
              {title}
            </motion.p>
            <motion.p
              className="text-2xl font-bold"
              style={{ color: "#c0caf5" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.3, duration: 0.3 }}
            >
              {value.toLocaleString()}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default StatCard;
