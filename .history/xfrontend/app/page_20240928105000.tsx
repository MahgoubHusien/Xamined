"use client";
import React from "react";
import { Layout } from "@/components/ui/Layout";
import { FlipWords } from "@/components/ui/flip-words";
import { TweetDemo } from "@/components/magicui/marquee-demo";
import { RatingWithReasoning } from "@/components/ui/RatingWithReasoning";

export default function LandingPage() {
  const words = ["Emotions", "Insights", "Opinions"];

  const tweetContent = "Apple has announced you can now add California driver's licenses and state IDs to Apple Wallet!";
  const scores = { positive: 47.7, neutral: 22.87, negative: 29.43 };
  const reasoning = "The tweet expresses positive sentiment about the new feature and shows excitement from users.";

  return (
    <Layout>
      <div className="flex flex-col w-full min-h-screen items-center justify-center p-4 md:px-8">
        {/* Adding margin to move the content down */}
        <div className="mt-10 md:mt-10">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-10 md:mb-14">
            <div className="text-4xl md:text-5xl font-bold text-black mb-4 md:mb-6">
              Xamine{" "}
              <FlipWords
                words={words}
                duration={3000}
                className="text-4xl md:text-5xl font-extrabold text-black inline-block"
              />
              From Tweets In Real-Time!
            </div>
            <p className="text-base md:text-lg max-w-lg md:max-w-2xl text-gray-600">
              Dive into real-time analysis of the latest trends and opinions.
              Explore how public sentiment shapes the world, and let us guide you
              through the data that matters. 
            </p>
          </div>

          {/* Content Section */}
          <div className="flex flex-col md:flex-row w-full max-w-4xl items-center justify-center gap-6 md:gap-8">
            {/* Tweet Demo Section */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0">
              <div className="scale-90 md:scale-100 max-w-xs md:max-w-none">
                <TweetDemo tweetUrl={"1836824626971955537"} />
              </div>
            </div>
            {/* Rating and Reasoning Section */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="max-w-xs md:max-w-md">
                <RatingWithReasoning
                  tweetContent={tweetContent}
                  scores={scores}
                  reasoning={reasoning}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}