"use client";
import React from "react";
import TweetAnalysis from "@/components/tweet-analysis";
import TweetAnalysis from "@/components/tweet-analysis";

export default function AnalysisPage({
  searchParams,
}: {
  searchParams: { tweetLink?: string };
}) {
  const tweetLink = searchParams.tweetLink || "";

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <div className="mt-10 text-4xl font-bold">Tweet Analysis</div>
      <div className="p-4">
        <TweetAnalysis tweetLink={tweetLink} />
      </div>
    </div>
  );
}

