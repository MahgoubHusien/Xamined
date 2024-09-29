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
      <div className="flex flex-col w-full h-screen items-center justify-center">
        {/* Heading */}
        <div className="flex justify-center items-center mt-8 mb-12 px-4">
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
        <div className="flex flex-col w-full items-center px-4">
          {/* Tweet and Rating Component */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-4">
            {/* Tweet Demo Section */}
            <div className="w-full md:w-auto flex justify-center items-center">
              <TweetDemo />
            </div>

            {/* Rating and Reasoning Section */}
            <div className="w-full md:w-auto flex justify-center items-center">
              <RatingWithReasoning
                tweetContent={tweetContent}
                score={score}
                reasoning={reasoning}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
