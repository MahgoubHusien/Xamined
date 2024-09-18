"use client";
import React from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const Button = ({ children, className, borderRadius = "1.75rem", containerClassName, duration, ...otherProps }: { children: React.ReactNode; className?: string; borderRadius?: string; containerClassName?: string; duration?: number }) => (
  <button className={cn("relative h-16 w-40 p-[1px] overflow-hidden", containerClassName)} style={{ borderRadius }}>
    <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
      <MovingBorder duration={duration} rx="30%" ry="30%">
        <div className="h-20 w-20 opacity-80 bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]" />
      </MovingBorder>
    </div>
    <div className={cn("relative bg-slate-900/[0.8] border border-slate-800 text-white flex items-center justify-center", className)} style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
      {children}
    </div>
  </button>
);

export const MovingBorder = ({ children, duration = 2000, rx, ry, ...otherProps }: { children: React.ReactNode; duration?: number; rx?: string; ry?: string }) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <svg className="absolute h-full w-full" preserveAspectRatio="none">
      <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      <motion.div style={{ position: "absolute", top: 0, left: 0, transform }}>{children}</motion.div>
    </svg>
  );
};
