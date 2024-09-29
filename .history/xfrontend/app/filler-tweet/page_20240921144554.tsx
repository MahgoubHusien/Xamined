import React from "react";
import { DotBackgroundDemo } from "@/components/ui/dot-background";
import { FlipWords } from "@/components/ui/flip-words";
import { TweetDemo } from "@/components/magicui/marquee-demo";
import { Tweet from "@/components/tweet-client";

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
      <DotBackgroundDemo />

      <div className="absolute top-20 left-10 z-50 m-4">
        <div className="text-6xl text-left text-black">
          Xamine
          <FlipWords words={words} duration={3000} className="text-left text-6xl font-extrabold text-black" />
          <br></br>From Tweets In <br></br>
          Real-Time!
        </div>

        <div className="mt-6 text-xl text-left text-neutral-500 max-w-sm">
          Dive into real-time analysis of the latest trends and opinions. Explore how public sentiment shapes the world, and let us guide you through 
          the data that matters. Whether you're a researcher, marketer, or curious 
          mind, our insights will give you a fresh perspective.
        </div>
      </div>

      <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Custom Tweet Component</h1>
      <Tweet id="1629307668568633344" />
    </div>

      <div className="absolute bottom-10 w-full m-4">
        <TweetDemo />
      </div>
    </div>
  );
}
