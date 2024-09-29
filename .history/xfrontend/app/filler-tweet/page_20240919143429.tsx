import React from "react";
import { DotBackgroundDemo } from "@/components/ui/dot-background";
import { FlipWords } from "@/components/ui/flip-words";
import { TweetDemo } from "@/components/magicui/marquee-demo";

export default function LandingPage() {
  const words = [
    "Explore Sentiment",
    "Analyze Twitter Trends",
    "Gain Real-time Insights",
    "Understand Public Opinion",
    "Track Social Media Buzz",
    "Leverage Data for Decisions",
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      {/* Background Animation */}
      <DotBackgroundDemo />

      {/* Flip Words */}
      <div className="absolute top-1/3 text-5xl font-bold z-10">
        <FlipWords words={words} duration={3000} className="text-center" />
      </div>

      {/* Scrolling Tweets */}
      <div className="absolute bottom-0 w-full">
        <TweetDemo />
      </div>
    </div>
  );
}