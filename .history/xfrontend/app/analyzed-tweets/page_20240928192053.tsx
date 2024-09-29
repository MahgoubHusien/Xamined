"use client";
import React, { useState } from "react";
import FeaturesPage from "@/components/FeaturesPage";
import { TweetDemo } from "@/components/ui/marquee-demo"; 

const AnalyzedTweetsPage = () => {
  const [submittedTweets, setSubmittedTweets] = useState([
    "https://twitter.com/user/status/1836824626971955537",
    "https://twitter.com/user/status/1625363265362472964",
    "https://twitter.com/user/status/1509635484123457538",
    "https://twitter.com/user/status/1334505785901490176",
    "https://twitter.com/user/status/1257363512362459136",
  ]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 bg-gray-100 p-4 md:overflow-y-auto">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-semibold mb-4">Analyzed Tweets</h2>
          <ScrollableTweetsList tweets={submittedTweets} />
        </div>
      </div>

      <div className="w-full md:w-2/3 bg-white p-4 md:p-8">
        <FeaturesPage />
      </div>
    </div>
  );
};

const ScrollableTweetsList = ({ tweets }: { tweets: string[] }) => {
  return (
    <div className="space-y-4 w-full">
      {tweets.map((tweetUrl, index) => (
        <div
          key={index}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg w-full flex items-center justify-center"
        >
          <TweetDemo tweetUrl={tweetUrl} />
        </div>
      ))}
    </div>
  );
};

export default AnalyzedTweetsPage;
