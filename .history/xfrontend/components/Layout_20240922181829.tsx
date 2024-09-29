// components/Layout.js
"use client";
import React from "react";
import { DotBackgroundDemo } from "@/components/ui/dot-background";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <DotBackgroundDemo />
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
