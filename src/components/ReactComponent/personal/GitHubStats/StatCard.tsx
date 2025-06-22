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
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
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
        scale: 1.01,
        transition: { duration: 0.15 },
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-200`}
      />
      <div
        className="relative rounded-2xl p-4 lg:p-6 shadow-lg backdrop-blur-sm overflow-hidden border"
        style={{
          backgroundColor: "#24283b",
          borderColor: "#565f89",
        }}
      >
        <div className="flex items-center space-x-2 lg:space-x-3">
          <div className="text-[#7aa2f7] text-xl lg:text-2xl flex-shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <p
              className="text-xs lg:text-sm truncate"
              style={{ color: "#a9b1d6" }}
            >
              {title}
            </p>
            <p
              className="text-lg lg:text-2xl font-bold"
              style={{ color: "#c0caf5" }}
            >
              {value.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default StatCard;
