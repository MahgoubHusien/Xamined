import React from "react";
import ChatBot from "./chatbot";

const TweetAnalysis = ({ tweetLink }: { tweetLink: string }) => {
  // Mock sentiment data
  const sentimentScore = 78; // Mock score out of 100
  const sentimentReasoning = "This tweet is generally positive, discussing exciting new updates.";

  return (
    <div className="max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex space-x-4 transition-transform duration-500 hover:scale-105">
      {/* Tweet Link Box */}
      <div className="w-1/3 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <input
          type="text"
          value={tweetLink}
          className="w-full p-2 text-lg text-gray-800 dark:text-gray-200 bg-transparent border-none focus:outline-none"
          readOnly
        />
      </div>

      {/* Sentiment Analysis */}
      <div className="w-2/3 p-4">
        <div className="mb-4 flex items-center space-x-2">
          <div className="text-4xl font-bold text-blue-500 dark:text-blue-400">
            {sentimentScore}%
          </div>
          <div className="text-lg text-gray-600 dark:text-gray-300">
            Sentiment Score
          </div>
        </div>
        <p className="text-gray-800 dark:text-gray-200">
          {sentimentReasoning}
        </p>

        {/* ChatBot Placeholder */}
        <div className="mt-4">
        </div>
      </div>
    </div>
  );
};

export default TweetAnalysis;
