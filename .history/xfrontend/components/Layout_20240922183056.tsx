// components/Layout.tsx
"use client";
import React from "react";
import { DotBackgroundDemo } from "@/components/ui/dot-background";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-900 text-white">
      <div className="absolute inset-0 z-0">
        <DotBackgroundDemo />
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
