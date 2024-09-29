// pages/tweet-analyzer.tsx
import React, { useState } from "react";
import { Tweet } from "react-tweet";
import ChatBot from "@/components/
chatbot";
import CircularProgress from "@/components/CircularProgress";

export default function TweetAnalyzer() {
  const [tweetLink, setTweetLink] = useState("");
  const [tweetId, setTweetId] = useState("");
  const [sentimentScore, setSentimentScore] = useState(75); // Placeholder score
  const [reasoning, setReasoning] = useState(
    "The tweet expresses positive sentiment with strong emphasis on excitement and encouragement."
  ); // Placeholder reasoning

  const handleAnalyze = () => {
    const id = extractTweetId(tweetLink);
    setTweetId(id);

    // For demonstration, use static values for sentiment score and reasoning.
    // You can replace these with a real sentiment analysis function in the future.
    setSentimentScore(Math.floor(Math.random() * 100)); // Random score for now
    setReasoning("The sentiment analysis shows positive emotion with mentions of support and optimism.");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6">
        
        {/* Input Form */}
        <div className="flex justify-center items-center space-x-4">
          <input
            type="text"
            placeholder="Enter Tweet Link"
            value={tweetLink}
            onChange={(e) => setTweetLink(e.target.value)}
            className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAnalyze}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Analyze
          </button>
        </div>

        {/* Analysis Container */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sentiment Score and Reasoning */}
          <div className="flex-1 bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            {tweetId ? (
              <>
                <CircularProgress
                  percentage={sentimentScore}
                  size={120}
                  strokeWidth={12}
                  color={sentimentScore > 60 ? "#4CAF50" : sentimentScore > 30 ? "#FFC107" : "#F44336"}
                />
                <div className="mt-4 text-center text-gray-700">
                  {reasoning}
                </div>
              </>
            ) : (
              <div className="text-gray-500">Enter a Tweet link to analyze sentiment.</div>
            )}
          </div>

          {/* Chatbot */}
          <div className="flex-1">
            <ChatBot tweetId={tweetId} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility function to extract Tweet ID
function extractTweetId(link: string): string {
  const regex = /status\/(\d+)/;
  const match = link.match(regex);
  return match ? match[1] : "";
}
