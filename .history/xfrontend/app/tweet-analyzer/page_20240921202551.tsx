import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FeaturesSectionDemo } from "@/components/features-section-demo"; // Assuming you have this component
import Chatbot from "@/components/chatbot"; // Assuming you have a chatbot component

export default function TweetSentimentPage() {
  const [tweetLink, setTweetLink] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [reasoning, setReasoning] = useState("");

  const handleInputChange = (e) => {
    setTweetLink(e.target.value);
  };

  const handleAnalyze = async () => {
    // Assuming you have a function to fetch sentiment and reasoning
    const response = await fetch(`/api/analyze-tweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tweetLink }),
    });
    const data = await response.json();
    setSentiment(data.sentiment);
    setReasoning(data.reasoning);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        Analyze Your Tweet's Sentiment
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="p-8 bg-gray-800 rounded-lg shadow-lg flex flex-col space-y-4">
          <input
            type="text"
            value={tweetLink}
            onChange={handleInputChange}
            placeholder="Paste your tweet link here..."
            className="w-full p-4 rounded-lg bg-gray-700 text-white outline-none"
          />
          <button
            onClick={handleAnalyze}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Analyze Tweet
          </button>
          {sentiment && (
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Sentiment Rating: {sentiment}</h2>
              <p className="mt-2 text-xl">Reasoning: {reasoning}</p>
            </div>
          )}
        </div>
        <div className="p-8 bg-gray-800 rounded-lg shadow-lg">
          {/* Chatbot Section */}
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
