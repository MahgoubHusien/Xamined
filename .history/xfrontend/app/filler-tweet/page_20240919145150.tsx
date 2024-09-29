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

  const commonMargin = "m-8"; // Define common margin for consistent spacing

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <DotBackgroundDemo />

      {/* Static Phrase */}
      <div className={`absolute top-1/4 left-10 text-2xl font-semibold z-50 ${commonMargin}`}>
        Discover the Power of Data:
      </div>

      {/* Flip Words on the Left Side with Common Margin */}
      <div className={`absolute top-1/3 left-10 text-5xl font-bold z-50 ${commonMargin}`}>
        <FlipWords words={words} duration={3000} className="text-left" />
      </div>

      {/* Scrolling Tweets with Common Margin */}
      <div className={`absolute bottom-0 w-full ${commonMargin}`}>
        <TweetDemo />
      </div>
    </div>
  );
}
