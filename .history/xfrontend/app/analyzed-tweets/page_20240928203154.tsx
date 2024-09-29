"use client";
import React, { useState } from "react";
import { TweetDemo } from "@/components/ui/tweet";
import { Layout } from "@/components/ui/Layout";
import { RatingWithReasoning } from "@/components/ui/RatingWithReasoning";

const AnalyzedTweetsPage = () => {
  // Array containing tweet links instead of direct tweet data
  const [submittedTweets, setSubmittedTweets] = useState([
    "https://twitter.com/user/status/1836824626971955537",
    "https://twitter.com/user/status/1625363265362472964",
    "https://twitter.com/user/status/1509635484123457538",
    "https://twitter.com/user/status/1334505785901490176",
    "https://twitter.com/user/status/1257363512362459136",
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

// List of tweet cards to scroll through
const ScrollableTweetsList = ({ tweets }: { tweets: string[] }) => {
  return (
    <div className="space-y-4 w-full">
      {tweets.map((tweetUrl, index) => (
        <div
          key={index}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg w-full flex items-center justify-center"
        >
          <TweetDemo tweetId={extractTweetId(tweetUrl)} />
        </div>
      ))}
    </div>
  );
};

// Grid of tweet demos with sentiment analysis
const TweetSentimentGrid = ({ tweets }: { tweets: string[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tweets.map((tweetUrl, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center space-y-4">
          <TweetDemo tweetId={extractTweetId(tweetUrl)} />
          <RatingWithReasoning
            tweetContent={"This is a sample tweet content"} // Placeholder content, replace with actual content as needed
            scores={{ positive: 47.7, neutral: 22.87, negative: 29.43 }} // Placeholder sentiment data
            reasoning={"This is a sample reasoning."} // Placeholder reasoning
          />
        </div>
      ))}
    </div>
  );
};

// Utility function to extract tweet ID from URL
const extractTweetId = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
};

export default AnalyzedTweetsPage;
