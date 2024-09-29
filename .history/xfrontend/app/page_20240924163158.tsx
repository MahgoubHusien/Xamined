"use client";
import React from "react";
import { Layout } from "@/components/Layout";
import { FlipWords } from "@/components/ui/flip-words";
import { TweetDemo } from "@/components/magicui/marquee-demo";
import { RatingWithReasoning } from "@/components/RatingWithReasoning";

export default function LandingPage() {
  const words = ["Emotions", "Insights", "Opinions"];

  const tweetContent = "Apple has announced you can now add California driver's licenses and state IDs to Apple Wallet!";
  const scores = { positive: 47.7, neutral: 22.87, negative: 29.43 };
  const reasoning = "The tweet expresses positive sentiment about the new feature and shows excitement from users.";

  return (
    <Layout>
      <div className="flex flex-col w-full min-h-[120vh] items-center justify-center p-4">
        <div className="flex flex-col items-center text-center mb-14" style={{ transform: 'translateY(-90px)' }}>
          <div className="text-5xl font-bold text-black h-[100px]">
            Xamine{" "}
            <FlipWords
              words={words}
              duration={3000}
              className="text-5xl font-extrabold text-black inline-block"
            />
            From Tweets In Real-Time!
          </div>
          <p className="text-lg max-w-2xl text-gray-600 -mt-8">
            Dive into real-time analysis of the latest trends and opinions.
            Explore how public sentiment shapes the world, and let us guide you
            through the data that matters. Whether you're a researcher, marketer,
            or curious mind, our insights will give you a fresh perspective.
          </p>
        </div>

        <div className="flex flex-col md:flex-row w-full max-w-5xl items-center justify-center gap-2" style={{ transform: 'translateX(55px)' }}>
          <div className="w-full md:w-1/2 flex justify-end relative" style={{ top: '-260px', paddingRight: 0, marginRight: -8 }}>
            <div className="scale-90 md:scale-100">
              <TweetDemo />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-start relative" style={{ transform: 'translateY(18px)', paddingLeft: 0, marginLeft: -16 }}>
            <RatingWithReasoning
              tweetContent={tweetContent}
              scores={scores}
              reasoning={reasoning}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}