"use client";
import React from "react";
import { DotBackgroundDemo } from "@/components/ui/dot-background";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      <DotBackgroundDemo />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
