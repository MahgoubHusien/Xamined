"use client";
import React, { useState } from "react";
import FeaturesPage from "@/components/ui/analyzer"; // Assuming you have this component for FeaturesPage
import { TweetDemo } from "@/components/ui/tweet";
import { RatingWithReasoning } from "@/components/ui/RatingWithReasoning";
import Chatbot from "@/components/ui/Chatbot";
import { Layout } from "@/components/ui/Layout";

const AnalyzedTweetsPage = () => {
  const [submittedTweets] = useState([
    "https://twitter.com/user/status/1836824626971955537",
    "https://twitter.com/user/status/1625363265362472964",
    "https://twitter.com/user/status/1509635484123457538",
    "https://twitter.com/user/status/1334505785901490176",
    "https://twitter.com/user/status/1257363512362459136",
  ]);

  const [selectedTweetUrl, setSelectedTweetUrl] = useState<string | null>(submittedTweets[0]);
  const [tweetContent, setTweetContent] = useState("Example tweet content."); // Replace with actual content
  const [scores, setScores] = useState({ positive: 47.7, neutral: 22.87, negative: 29.43 });
  const [reasoning, setReasoning] = useState("This is the analysis reasoning for the selected tweet.");

  const extractTweetId = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  // Function to handle tweet selection from the list
  const handleTweetSelection = (tweetUrl: string) => {
    setSelectedTweetUrl(tweetUrl);
    // Fetch and update the tweet content, scores, and reasoning as per the selected tweet
    // Example update, replace with real fetch or logic
    setTweetContent("This is a new tweet content for the selected tweet.");
    setScores({ positive: 50.0, neutral: 30.0, negative: 20.0 }); // Example updated scores
    setReasoning("Updated analysis reasoning based on the new selected tweet.");
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Side: Scrollable Tweet List */}
        <div className="w-full md:w-1/3 bg-gray-100 p-4 md:overflow-y-auto">
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-semibold mb-4">Analyzed Tweets</h2>
            <ScrollableTweetsList tweets={submittedTweets} onTweetSelect={handleTweetSelection} />
          </div>
        </div>

        {/* Right Side: Dynamic Components */}
        <div className="w-full md:w-2/3 bg-white p-4 md:p-8 flex flex-col gap-6">
          {/* Display the selected Tweet */}
          {selectedTweetUrl && (
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg w-full">
              <TweetDemo tweetUrl={selectedTweetUrl} />
            </div>
          )}

          {/* Sentiment Analysis */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg w-full">
            <RatingWithReasoning
              tweetContent={tweetContent}
              scores={scores}
              reasoning={reasoning}
            />
          </div>

          {/* Chatbot */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg w-full">
            <Chatbot />
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Scrollable list of tweets
const ScrollableTweetsList = ({
  tweets,
  onTweetSelect,
}: {
  tweets: string[];
  onTweetSelect: (tweetUrl: string) => void;
}) => {
  return (
    <div className="space-y-4 w-full">
      {tweets.map((tweetUrl, index) => (
        <div
          key={index}
          className="cursor-pointer p-4 bg-white border border-gray-200 rounded-lg shadow-lg w-full flex items-center justify-center hover:bg-gray-200 transition"
          onClick={() => onTweetSelect(tweetUrl)}
        >
          <p>{tweetUrl}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalyzedTweetsPage;
