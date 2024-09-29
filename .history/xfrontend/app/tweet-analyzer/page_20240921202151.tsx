
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Tweet } from "react-tweet";
import Chatbot from "@/components/chatbot"; // Assume you have a Chatbot component

export default function TweetSentimentPage() {
  const [tweetLink, setTweetLink] = useState("");
  const [tweetId, setTweetId] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [reasoning, setReasoning] = useState("");

  const handleAnalyze = () => {
    const id = tweetLink.split("/").pop() || "";
    setTweetId(id);
    // Mock sentiment analysis results
    setSentiment("Positive");
    setReasoning("The tweet has positive language and sentiment.");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gray-900 text-white p-8">
      {/* Tweet Input Section */}
      <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-2">Analyze a Tweet</h2>
        <input
          type="text"
          placeholder="Enter Tweet URL"
          value={tweetLink}
          onChange={(e) => setTweetLink(e.target.value)}
          className="w-full p-2 mb-4 text-gray-800 rounded"
        />
        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Analyze
        </button>
      </div>

      {/* Sentiment & Chat Section */}
      <div className="flex flex-wrap justify-center items-start w-full max-w-6xl space-x-8">
        {/* Sentiment Analysis */}
        <div className="w-full md:w-1/2 bg-gray-800 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold mb-2">Sentiment Analysis</h3>
          <div className="text-lg font-semibold">Rating: {sentiment}</div>
          <p className="text-gray-400 mt-2">Reasoning: {reasoning}</p>
          {tweetId && (
            <div className="mt-4">
              <Tweet id={tweetId} />
            </div>
          )}
        </div>

        {/* Chatbot */}
        <div className="w-full md:w-1/2 bg-gray-800 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold mb-2">Chatbot</h3>
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
