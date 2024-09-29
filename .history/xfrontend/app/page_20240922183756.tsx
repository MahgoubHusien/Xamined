"use client";
import React from "react";
import { Layout } from "@/components/Layout";
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
    <Layout>
      <div className="flex flex-row w-full h-screen">
        {/* Left half */}
        <div className="flex flex-col justify-center items-start w-1/2 px-8">
          <div className="text-6xl text-left text-black">
            Xamine{" "}
            <FlipWords
              words={words}
              duration={3000}
              className="text-left text-6xl font-extrabold text-black"
            />
            <br />
            From Tweets In <br />
            Real-Time!
          </div>

          <div className="mt-6 text-xl text-left text-gray-600 max-w-sm">
            Dive into real-time analysis of the latest trends and opinions. Explore how
            public sentiment shapes the world, and let us guide you through the data
            that matters. Whether you're a researcher, marketer, or curious mind, our
            insights will give you a fresh perspective.
          </div>
        </div>

        {/* Right half */}
        <div className="flex justify-center items-center w-1/2">
          <TweetDemo />
        </div>
      </div>
    </Layout>
  );
}
