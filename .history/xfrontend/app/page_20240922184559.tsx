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
      <div className="flex flex-col w-full h-screen">
        {/* Heading */}
        <div className="flex justify-center items-center mt-8 px-4">
          <div className="text-5xl text-center text-black">
            Xamine{" "}
            <FlipWords
              words={words}
              duration={3000}
              className="text-5xl font-extrabold text-black inline-block"
            />{" "}
            From Tweets In Real-Time!
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-row w-full flex-1 -mt-12">
          {/* Left half */}
          <div className="flex flex-col justify-center items-center w-1/2 px-8">
            <div className="text-xl text-left text-gray-600 max-w-md">
              Dive into real-time analysis of the latest trends and opinions.
              Explore how public sentiment shapes the world, and let us guide
              you through the data that matters. Whether you're a researcher,
              marketer, or curious mind, our insights will give you a fresh
              perspective.
            </div>
          </div>

          {/* Right half */}
          <div className="flex justify-center items-center w-1/2 px-8">
            <TweetDemo />
          </div>
        </div>
      </div>
    </Layout>
  );
}
