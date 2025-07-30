import React, { memo } from "react";
import { motion } from "framer-motion";

interface GreetingProps {
  name: string;
  jobTitle: string;
  position: string;
}

const Greeting = memo(function Greeting({
  name,
  jobTitle,
  position,
}: GreetingProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Status Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#7aa2f7]/10 border border-[#7aa2f7]/20 rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-2 h-2 bg-[#7aa2f7] rounded-full animate-pulse" />
        <span className="text-xs sm:text-sm font-medium text-[#7aa2f7]">
          Available for Projects
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.div
        className="space-y-3 sm:space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
          <motion.span
            className="block text-[#c0caf5]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Hey, I'm
          </motion.span>
          <motion.span
            className="block bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {name}
          </motion.span>
        </h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-[#a9b1d6] font-medium max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="text-[#7aa2f7]">{jobTitle}</span> passionate about creating digital experiences that matter.
          <br />
          I build <span className="text-[#bb9af7]">high-performance</span> web & mobile apps that <span className="text-[#bb9af7]">scale</span>.
        </motion.p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="flex flex-wrap gap-6 sm:gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        {[
          { label: "Projects", value: "50+" },
          { label: "Experience", value: "3+ Years" },
          { label: "Happy Clients", value: "25+" },
        ].map((stat, index) => (
          <div key={stat.label} className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-[#7aa2f7]">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-[#a9b1d6]">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

export default Greeting;