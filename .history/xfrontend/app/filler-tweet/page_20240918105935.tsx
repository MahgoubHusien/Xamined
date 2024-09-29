import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlipWords } from "@/components/ui/flip-words";
import { MarqueeDemo } from "@a/components/ui/marquee";

export default function LandingPage() {
  const words = ["Explore Sentiment", "Analyze Twitter", "Gain Insights"];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      {/* Background Animation */}
      <BackgroundBeams className="absolute inset-0" />

      {/* Text Generation */}
      <div className="z-10 text-center mb-10">
        <h1 className="text-5xl font-bold">Real-Time Sentiment Analysis</h1>
        <FlipWords words={words} className="text-3xl mt-4" />
      </div>

      {/* Scrolling Tweets */}
      <div className="absolute bottom-0 w-full">
        <MarqueeDemo />
      </div>
    </div>
  );
}
