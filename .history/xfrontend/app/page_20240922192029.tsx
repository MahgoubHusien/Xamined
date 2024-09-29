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
      <div className="flex flex-col w-full min-h-screen items-center justify-center bg-gray-100 p-4">
        {/* Heading Section */}
        <div className="flex flex-col items-start md:items-center text-center mb-12 w-full max-w-7xl">
          <div className="text-5xl font-bold text-black mb-4">
            Xamine{" "}
            <FlipWords
              words={words}
              duration={3000}
              className="text-5xl font-extrabold text-black inline-block"
            />{" "}
            From Tweets In Real-Time!
          </div>
          <p className="text-lg max-w-2xl text-gray-600 self-start md:self-center">
            Dive into real-time analysis of the latest trends and opinions.
            Explore how public sentiment shapes the world, and let us guide you
            through the data that matters. Whether you're a researcher, marketer,
            or curious mind, our insights will give you a fresh perspective.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-row w-full max-w-7xl items-start justify-between gap-8">
          {/* Paragraph Section */}
          <div className="w-full md:w-1/2 flex flex-col items-start justify-start pl-8">
            <div className="text-left text-xl text-gray-600">
              Dive into real-time analysis of the latest trends and opinions.
              Explore how public sentiment shapes the world, and let us guide you
              through the data that matters. Whether you're a researcher, marketer,
              or curious mind, our insights will give you a fresh perspective.
            </div>
          </div>

          {/* Tweet and Rating Container */}
          <div className="flex flex-col items-center md:flex-row w-full md:w-auto md:items-center justify-center">
            {/* Tweet Demo Section */}
            <div className="w-full md:w-auto flex justify-end relative" style={{ top: '-60px' }}>
              <div className="scale-90 md:scale-100">
                <TweetDemo />
              </div>
            </div>

            {/* Rating and Reasoning Section */}
            <div className="w-full md:w-auto flex justify-start ml-8 mt-8 md:mt-0">
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
