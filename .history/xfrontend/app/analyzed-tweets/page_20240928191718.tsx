"use client";
import React, { useState } from "react";
import FeaturesPage from "@/components/FeaturesPage"; // Import FeaturesPage component
import TweetDemo from "@/components/magicui/marquee-demo"; // Import the updated TweetDemo component

const AnalyzedTweetsPage = () => {
  // Example submitted tweet IDs, replace with actual tweet IDs if available
  const [submittedTweets, setSubmittedTweets] = useState([
    "1836824626971955537",
    "1625363265362472964",
    "1509635484123457538",
    "1334505785901490176",
    "1257363512362459136",
  ]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side: Scrollable Tweet List */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 md:overflow-y-auto">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-semibold mb-4">Analyzed Tweets</h2>
          <ScrollableTweetsList tweets={submittedTweets} />
        </div>
      </div>

      {/* Right Side: FeaturesPage Content */}
      <div className="w-full md:w-2/3 bg-white p-4 md:p-8">
        <FeaturesPage />
      </div>
    </div>
  );
};

// Component for Scrollable Tweets List using TweetDemo
const ScrollableTweetsList = ({ tweets }: { tweets: string[] }) => {
  return (
    <div className="space-y-4 w-full">
      {tweets.map((tweetId, index) => (
        <div
          key={index}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg w-full flex items-center justify-center"
        >
          <TweetDemo tweetId={tweetId} />
        </div>
      ))}
    </div>
  );
};

export default AnalyzedTweetsPage;
