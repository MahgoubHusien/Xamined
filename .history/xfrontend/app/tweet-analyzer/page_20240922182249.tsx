// pages/FeaturesPage.tsx
"use client";
import React from "react";
import { Layout } from "@/components/Layout";
import { FeaturesSectionDemo } from "@/components/bento-grid";

export default function FeaturesPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        <FeaturesSectionDemo />
      </div>
    </Layout>
  );
}
