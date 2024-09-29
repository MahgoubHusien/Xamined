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

  const commonMargin = "m-4"; // Adjusted common margin

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white overflow-hidden">
      {/* Background Animation */}
      <DotBackgroundDemo />

      {/* Static Phrase */}
      <div className={`absolute top-20 left-10 text-2xl font-semibold z-50 ${commonMargin}`}>
       <p></p> Discover the Power of Data:<
      </div>

      {/* Flip Words on the Left Side */}
      <div className={`absolute top-32 left-10 text-5xl font-bold z-50 ${commonMargin}`}>
        
        <FlipWords words={words} duration={3000} className="text-left" />
      </div>

      {/* Scrolling Tweets */}
      <div className={`absolute bottom-10 w-full ${commonMargin}`}>
        <TweetDemo />
      </div>
    </div>
  );
}
