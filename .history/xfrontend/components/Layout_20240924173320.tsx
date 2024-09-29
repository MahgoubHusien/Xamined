"use client";
import React from "react";
import { DotBackgroundDemo } from "@/components/ui/dot-background";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-white text-black">
      <div className="absolute inset-0 h-full w-full">
        <DotBackgroundDemo />
      </div>
      <div className="relative z-10 w-full flex-grow">{children}</div>
    </div>
  );
};
