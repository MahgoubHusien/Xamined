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
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="text-5xl font-bold text-black mb-4">
            Xamine{" "}
            <FlipWords
              words={words}
              duration={3000}
              className="text-5xl font-extrabold text-black inline-block"
            />{" "}
            From Tweets In Real-Time!
          </div>
          <p className="text-lg max-w-2xl text-gray-600">
            Dive into real-time analysis of the latest trends and opinions.
            Explore how public sentiment shapes the world, and let us guide you
            through the data that matters. Whether you're a researcher, marketer,
            or curious mind, our insights will give you a fresh perspective.
          </p>
        </div>

        <div className="flex flex-col md:flex-row w-full max-w-5xl items-center justify-center gap-2" style={{ transform: 'translateX(55px)' }}> {/* Adjust translateX as needed */}
  {/* Tweet Demo Section */}
  <div className="w-full md:w-1/2 flex justify-end relative" style={{ top: '-193px', paddingRight: 0, marginRight: -8 }}>
    <div className="scale-90 md:scale-100">
      <TweetDemo />
    </div>
  </div>
  {/* Rating and Reasoning Section */}
  <div className="w-full md:w-1/2 flex justify-start relative" style={{ transform: 'translateY(80px)', paddingLeft: 0, marginLeft: -16 }}>
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
