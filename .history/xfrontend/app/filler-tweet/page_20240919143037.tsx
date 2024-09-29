import React from "react";
import { DotBackgroundDemo } from "@/components/ui/dot-background";
import { FlipWords } from "@/components/ui/flip-words";
import { TweetDemo } from "@/components/magicui/marquee-demo";

export default function LandingPage() {
  const words = [
    "Explore Sentiment",
    "Analyze X Trends",
    "Gain Real-time Insights",
    "Understand Public Opinion",
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      {/* Background Animation */}
      <DotBackgroundDemo />

      {/* Flip Words */}
      <div className="absolute top-1/3 text-5xl font-bold">
        <FlipWords words={words} duration={3000} />
      </div>

      {/* Scrolling Tweets */}
      <div className="absolute bottom-0 w-full">
        <TweetDemo />
      </div>
    </div>
  );
}