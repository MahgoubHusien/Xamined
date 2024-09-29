import React from "react";
import { DotBackgroundDemo } from "@/components/ui/dot-background";
import { FlipWords } from "@/components/ui/flip-words";
import { TweetDom } from "@/components/magicui/marquee-demo";

export default function LandingPage() {
  const words = ["Explore Sentiment", "Analyze Twitter", "Gain Insights"];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      {/* Background Animation */}
      <DotBackgroundDemo />

     

      {/* Scrolling Tweets */}
      <div className="absolute bottom-0 w-full">
        <TweetCard />
      </div>
    </div>
  );
}