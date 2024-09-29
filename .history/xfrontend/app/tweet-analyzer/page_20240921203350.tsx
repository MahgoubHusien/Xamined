import React, { useState } from "react";
import { FeaturesSectionDemo } from "@/components/bento-grid"; // Your imported Bento component styles
import { Chatbot  from "@/components/Chatbot"; // Replace with your chatbot component path
import { MyTweet } from "@/components/my-tweet"; // Replace with your custom tweet component path

export default function TweetSentimentPage() {
  const [tweetId, setTweetId] = useState("");
  const [sentiment, setSentiment] = useState(null);

  const handleAnalyze = () => {
    // Simulate sentiment analysis, replace with actual logic
    setSentiment({
      rating: "Positive",
      reasoning: "The tweet reflects optimism and encouragement.",
    });
  };

  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sentiment Analysis Section */}
        <div className="col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800 p-4">
          <h2 className="text-3xl font-bold text-left">Analyze Your Tweet</h2>
          <input
            type="text"
            placeholder="Enter Tweet URL"
            className="w-full p-2 mt-4 border border-neutral-300 dark:border-neutral-700 rounded-md"
            value={tweetId}
            onChange={(e) => setTweetId(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Analyze
          </button>
          {sentiment && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">
                Sentiment: {sentiment.rating}
              </h3>
              <p className="text-lg mt-2">{sentiment.reasoning}</p>
            </div>
          )}
        </div>

        {/* Chatbot Section */}
        <div className="col-span-1 lg:col-span-2 border-b lg:border-none dark:border-neutral-800 p-4">
          <Chatbot />
        </div>

        {/* Tweet Display */}
        {tweetId && (
          <div className="col-span-1 lg:col-span-4 border-b lg:border-none dark:border-neutral-800 p-4">
            <MyTweet id={tweetId} />
          </div>
        )}
      </div>
    </div>
  );
}
