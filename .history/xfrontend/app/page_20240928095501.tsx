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
      <div className="flex flex-col w-full min-h-screen items-center justify-center p-4">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-14 -translate-y-16">
          <div className="text-5xl font-bold text-black h-[100px] flex items-center">
            Xamine{" "}
            <FlipWords
              words={words}
              duration={3000}
              className="text-5xl font-extrabold text-black ml-2"
            />
            <span className="ml-2">From Tweets In Real-Time!</span>
          </div>
          <p className="text-lg max-w-2xl text-gray-600 mt-4">
            Dive into real-time analysis of the latest trends and opinions.
            Explore how public sentiment shapes the world, and let us guide you
            through the data that matters. Whether you're a researcher, marketer,
            or curious mind, our insights will give you a fresh perspective.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row w-full max-w-5xl items-start justify-center gap-8">
          {/* Tweet Demo Section */}
          <div className="w-full md:w-1/2 flex justify-end">
            <div className="scale-90 md:scale-100">
              <TweetDemo tweetUrl={"1836824626971955537"} />
            </div>
          </div>
          {/* Rating Section */}
          <div className="w-full md:w-1/2 flex justify-start">
            <div className="w-full md:w-auto transform -translate-y-8 md:-translate-y-0">
              <RatingWithReasoning
                tweetContent={tweetContent}
                scores={scores}
                reasoning={reasoning}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
