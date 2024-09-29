"use client";
import React from "react";
import { Layout } from "@/components/Layout";
import { FlipWords } from "@/components/ui/flip-words";
import { TweetDemo } from "@/components/magicui/marquee-demo";
import { RatingWithReasoning } from "@/components/RatingWithReasoning";

export default function LandingPage() {
  const words = [
    "Sentiment",
    "Trends",
    "Insights",
    "Opinion",
    "Buzz",
    "Decisions",
  ];

  const tweetContent = "Apple has announced you can now add California driver's licenses and state IDs to Apple Wallet!";
  const score = 75; // Example score
  const reasoning = "The tweet expresses positive sentiment about the new feature and shows excitement from users.";

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
        <div className="flex flex-col md:flex-row w-full flex-1 items-center justify-center">
          {/* Left Section */}
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8">
            <div className="text-xl text-left text-gray-600 max-w-md mb-8">
              Dive into real-time analysis of the latest trends and opinions.
              Explore how public sentiment shapes the world, and let us guide
              you through the data that matters. Whether you're a researcher,
              marketer, or curious mind, our insights will give you a fresh
              perspective.
            </div>
            <TweetDemo />
          </div>

          {/* Right Section */}
          <div className="flex justify-center items-center w-full md:w-1/2 px-8">
            <RatingWithReasoning
              tweetContent={tweetContent}
              score={score}
              reasoning={reasoning}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
