import React from "react";
import { motion } from "framer-motion";

export default function AboutSection({ authorConfig }: { authorConfig: any }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
        <div className="w-5/6 h-5/6 mx-auto">
          <motion.img
            src={authorConfig?.picture ?? ""}
            alt="Profile Image"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="flex-1 px-4 md:px-0 text-center md:text-left">
        <div className="space-y-4">
          <motion.div
            className="font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-5xl">So, who am I?</h2>
          </motion.div>
          <motion.p
            className="font-normal text-justify"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {authorConfig?.about?.whoAmI ?? ""}
          </motion.p>
          <motion.p
            className="font-normal text-justify"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            {authorConfig?.about?.lifeBeyondCode ?? ""}
          </motion.p>
          <motion.p
            className="font-normal text-justify"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            {authorConfig?.about?.continuousLearning ?? ""}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
