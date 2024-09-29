"use client";
import React, { useState } from "react";
import FeaturesPage from "@/components/ui/analyzer";
import { TweetDemo } from "@/components/ui/tweet";
import { RatingWithReasoning } from "@/components/ui/RatingWithReasoning";
import { Layout } from "@/components/ui/Layout";

const AnalyzedTweetsPage = () => {
  const [submittedTweets] = useState([
    {
      url: "https://twitter.com/user/status/1836824626971955537",
      content: "Apple is releasing new features!",
      scores: { positive: 47.7, neutral: 22.87, negative: 29.43 },
      reasoning: "Positive sentiment about new features.",
    },
    {
      url: "https://twitter.com/user/status/1625363265362472964",
      content: "New products are always exciting.",
      scores: { positive: 67.3, neutral: 10.87, negative: 21.83 },
      reasoning: "Excitement about products.",
    },
    {
      url: "https://twitter.com/user/status/1509635484123457538",
      content: "Will this change the market?",
      scores: { positive: 20.5, neutral: 30.87, negative: 48.63 },
      reasoning: "Uncertainty about market changes.",
    },
    {
      url: "https://twitter.com/user/status/1334505785901490176",
      content: "Amazing innovation!",
      scores: { positive: 80.0, neutral: 10.0, negative: 10.0 },
      reasoning: "High positive sentiment on innovation.",
    },
    {
      url: "https://twitter.com/user/status/1257363512362459136",
      content: "How will competitors respond?",
      scores: { positive: 35.0, neutral: 40.0, negative: 25.0 },
      reasoning: "Neutral sentiment on competitive response.",
    },
  ]);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row h-screen p-4 md:p-8">
        <div className="w-full flex flex-wrap items-center justify-center gap-6 p-4 md:p-8">
          {submittedTweets.map((tweet, index) => (
            <TweetSentimentCard key={index} tweet={tweet} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const TweetSentimentCard = ({
  tweet,
}: {
  tweet: {
    url: string;
    content: string;
    scores: any;
    reasoning: string;
  };
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 w-full md:w-[800px] h-auto">
      {/* TweetDemo component */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end self-center md:self-start">
        <TweetDemo tweetUrl={tweet.url} />
      </div>
      {/* RatingWithReasoning component */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start self-center md:self-start">
        <RatingWithReasoning
          tweetContent={tweet.content}
          scores={tweet.scores}
          reasoning={tweet.reasoning}
        />
      </div>
    </div>
  );
};

export default AnalyzedTweetsPage;
