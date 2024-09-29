"use client";
import React from "react";
import { FeaturesSectionDemo } from "@/components/bento-grid";
import { DotBackgroundDemo } from "@/components/ui/dot-background";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl px-4">
        <FeaturesSectionDemo />
      </div>
    </div>
  );
}
