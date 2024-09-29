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
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white overflow-hidden">
      {/* Background Animation */}
      <DotBackgroundDemo />

      {/* Flip Words and Static Phrase */}
      <div className="absolute top-32 left-10 z-50 m-4">
        <FlipWords words={words} duration={3000} className="text-left" />
      </div>

      {/* Scrolling Tweets */}
      <div className="absolute bottom-10 w-full m-4">
        <TweetDemo />
      </div>
    </div>
  );
}
