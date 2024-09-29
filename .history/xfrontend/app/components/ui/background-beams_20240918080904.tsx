"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(({ className }: { className?: string }) => {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875", // More paths as needed
  ];

  return (
    <div className={cn("absolute h-full w-full inset-0 flex items-center justify-center", className)}>
      <svg className="z-0 h-full w-full pointer-events-none absolute" width="100%" height="100%" viewBox="0 0 696 316" fill="none">
        <path d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875" stroke="url(#paint0_radial)" strokeOpacity="0.05" strokeWidth="0.5" />
        {paths.map((path, index) => (
          <motion.path key={`path-${index}`} d={path} stroke={`url(#linearGradient-${index})`} strokeOpacity="0.4" strokeWidth="0.5"></motion.path>
        ))}
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";
