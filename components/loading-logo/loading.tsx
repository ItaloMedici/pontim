"use client";

import { motion } from "framer-motion";
import { ThemeAwareLogo } from "../logo/theme-aware-logo";

export function LoadingLogo() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <motion.div
        animate={{ rotate: [0, 360, 360] }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          times: [0, 0.6, 1],
          ease: "easeInOut",
        }}
      >
        <ThemeAwareLogo.Icon />
      </motion.div>
    </div>
  );
}
