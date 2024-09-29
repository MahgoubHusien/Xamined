import React from "react";
import { DotBackgroundDemo } from "@/components/ui/dot-background";
import { FlipWords } from "@/components/ui/flip-words";
import { TweetDemo } from "@/components/magicui/marquee-demo";

export default function LandingPage() {
  const words = [
    "Sentiment",
    "Trends",
    "Insights",
    "Opinion",
    "Buzz",
    "Decisions",
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white overflow-hidden">
      {/* Background Animation */}
      <DotBackgroundDemo />

      {/* Static Phrase and Flip Words to the Left */}
      <div className="absolute top-24 left-10 z-50 m-4">
        <div className="text-4xl font-bold text-left text-neutral-100">
          Discover the Power of:
        </div>
        <FlipWords words={words} duration={3000} className="text-left text-4xl font-bold" />

        {/* Mini About Section */}
        <div className="mt-6 text-lg text-left text-neutral-400 max-w-sm">
          Dive into real-time analysis of the latest trends and opinions. 
          Explore how public sentiment shapes the world, and let us guide you through 
          the data that matters. Whether you're a researcher, marketer, or curious 
          mind, our insights will give you a fresh perspective.
        </div>
      </div>

      {/* Scrolling Tweets */}
      <div className="absolute bottom-10 w-full m-4">
        <TweetDemo />
      </div>
    </div>
  );
}
