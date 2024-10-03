"use client";
import React from "react";
import { DotBackgroundDemo } from "@/components/ui/dot-background";
import Navbar from "@/components/ui/navbar"; 

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 w-full z-0">
        <DotBackgroundDemo />
      </div>

      <Navbar />

      <div className="relative z-10 flex-grow w-full">
        {children}
      </div>
    </div>
  );
};
