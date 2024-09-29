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

      {/* Static Phrase and Flip Words */}
      <div className="absolute top-20 left-10 z-50 m-4">
        <div className="text-6xl font-extrabold text-left text-black">
          Xamine Tweets To View :
        </div>
        <FlipWords words={words} duration={3000} className="text-left text-6xl font-extrabold text-black" />

        {/* Mini About Section */}
        <div className="mt-6 text-2xl text-left text-neutral-500 max-w-sm">
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
