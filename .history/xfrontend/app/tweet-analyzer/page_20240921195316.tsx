"use client"
import React from "react";
import TweetAnalysis from "@/components/tweet-analysis";
import { useRouter } from "next/router";

export default function AnalysisPage() {
  const router = useRouter();
  const tweetLink = router.query.tweetLink || "https://twitter.com/chibicode/status/1629307668568633344";

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <div className="mt-10 text-4xl font-bold">Tweet Analysis</div>
      <div className="p-4">
        <TweetAnalysis tweetLink={tweetLink} />
      </div>
    </div>
  );
}
