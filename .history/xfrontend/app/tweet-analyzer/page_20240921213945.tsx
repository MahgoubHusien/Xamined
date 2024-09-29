"use client";
import React from "react";
import { FeaturesSectionDemo } from "@/components/bento-grid";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white overflow-hidden">
      <DotBackgroundDemo />
    <div className="min-h-screen bg-white-100 dark:bg-black-900">
      <FeaturesSectionDemo />
    </div>
  );
}
