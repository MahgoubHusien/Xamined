"use client";
import React, { useState } from "react";
import { TweetDemo } from "@/components/ui/tweet";
import { Layout } from "@/components/ui/Layout";
import { RatingWithReasoning } from "@/components/ui/RatingWithReasoning";

const AnalyzedTweetsPage = () => {
  // Use full URLs for each tweet
  const [submittedTweets, setSubmittedTweets] = useState([
    { url: "https://twitter.com/user/status/1836824626971955537", content: "Apple is releasing new features!", scores: { positive: 47.7, neutral: 22.87, negative: 29.43 }, reasoning: "Positive sentiment about new features." },
    { url: "https://twitter.com/user/status/1625363265362472964", content: "New products are always exciting.", scores: { positive: 67.3, neutral: 10.87, negative: 21.83 }, reasoning: "Excitement about products." },
    { url: "https://twitter.com/user/status/1509635484123457538", content: "Will this change the market?", scores: { positive: 20.5, neutral: 30.87, negative: 48.63 }, reasoning: "Uncertainty about market changes." },
    { url: "https://twitter.com/user/status/1334505785901490176", content: "Amazing innovation!", scores: { positive: 80.0, neutral: 10.0, negative: 10.0 }, reasoning: "High positive sentiment on innovation." },
    { url: "https://twitter.com/user/status/1257363512362459136", content: "How will competitors respond?", scores: { positive: 35.0, neutral: 40.0, negative: 25.0 }, reasoning: "Neutral sentiment on competitive response." },
  ]);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row h-screen p-4 md:p-8">
        <div className="w-full md:w-1/3 bg-gray-100 p-4 md:overflow-y-auto">
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-semibold mb-4">Analyzed Tweets</h2>
            <ScrollableTweetsList tweets={submittedTweets} />
          </div>
        </div>

        <div className="w-full md:w-2/3 bg-white p-4 md:p-8">
          <TweetSentimentGrid tweets={submittedTweets} />
        </div>
      </div>
    </Layout>
  );
};

const ScrollableTweetsList = ({ tweets }: { tweets: { url: string, content: string }[] }) => {
  return (
    <div className="space-y-4 w-full">
      {tweets.map((tweet, index) => (
        <div
          key={index}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg w-full flex items-center justify-center"
        >
          <TweetDemo tweetUrl={tweet.url} /> 
        </div>
      ))}
    </div>
  );
};

// Display a grid of tweets with sentiment analysis
const TweetSentimentGrid = ({ tweets }: { tweets: { url: string, content: string, scores: any, reasoning: string }[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tweets.map((tweet, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center space-y-4">
          <TweetDemo tweetUrl={tweet.url} />
          <RatingWithReasoning
            tweetContent={tweet.content}
            scores={tweet.scores}
            reasoning={tweet.reasoning}
          />
        </div>
      ))}
    </div>
  );
};

export default AnalyzedTweetsPage;
