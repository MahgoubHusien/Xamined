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
      <div className="absolute top-20 left-10 z-50 m-4">
        fkjfajfklf
        <div className="text-6xl text-left text-white">
          Xamine
          <FlipWords
            words={words}
            duration={3000}
            className="text-left text-6xl font-extrabold text-white"
          />
          <br />
          From Tweets In <br />
          Real-Time!
        </div>

        <div className="mt-6 text-xl text-left text-neutral-300 max-w-sm">
          Dive into real-time analysis of the latest trends and opinions. Explore how
          public sentiment shapes the world, and let us guide you through the data
          that matters. Whether you're a researcher, marketer, or curious mind, our
          insights will give you a fresh perspective.
        </div>
      </div>

      <div className="absolute bottom-10 w-full m-4">
        <TweetDemo />
      </div>
    </Layout>
  );
}
