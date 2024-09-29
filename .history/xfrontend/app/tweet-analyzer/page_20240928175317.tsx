"use client";
import React from "react";
import { Layout } from "@/components/ui/Layout";
import CustomFeatureSection from "@/components/ui/analyzer";

export default function FeaturesPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        <CustomFeatureSection />
      </div>
    </Layout>
  );
}
