"use client";
import React, { useState } from "react";
import { RatingWithReasoning } from "@/components/ui/RatingWithReasoning";
import TweetDemo from "@/components/magicui/marquee-demo";
import Chatbot from "@/components/ui/Chatbot"; // Import as necessary
import TwitterSubmission from "@/components/ui/TwitterSubmission"; // Import as necessary

export default function FeaturesPage() {
  const [tweetContent, setTweetContent] = useState("");
  const [tweetUrl, setTweetUrl] = useState<string | null>(null);
  const [scores, setScores] = useState<{ positive: number; neutral: number; negative: number }>({
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const [reasoning, setReasoning] = useState("");

  const handleTweetSubmit = (url: string) => {
    setTweetUrl(url);
    // Example: Call an API or function to fetch tweet details and sentiment analysis
    // For now, we set it with dummy data
    setTweetContent("This is an example tweet.");
    setScores({ positive: 47.7, neutral: 22.87, negative: 29.43 });
    setReasoning(
      "The tweet expresses positive sentiment about the new feature and shows excitement from users."
    );
  };

  return (
    <div className="flex flex-col w-full items-center justify-center px-4 md:px-8 lg:px-16 py-10 lg:py-20 max-w-screen-xl mx-auto">
      <div className="text-center mb-10 md:mb-14">
        <h4 className="text-3xl lg:text-5xl leading-tight font-semibold text-neutral-900 mb-4">
          Analyze Tweets with Our AI
        </h4>
        <p className="text-base lg:text-lg text-neutral-600 max-w-3xl mx-auto">
          Submit any tweet URL to see its sentiment score, reasoning, and chat with our AI about it.
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full items-stretch justify-center gap-8">
        {/* Tweet Submission Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex flex-col items-start gap-4">
            <h5 className="text-2xl font-semibold mb-2">Tweet URL</h5>
            <p className="text-base text-neutral-600 mb-4">
              Enter the tweet URL to analyze its sentiment.
            </p>
            <TwitterSubmission onTweetSubmit={handleTweetSubmit} />
          </div>
        </div>

        {/* Sentiment Analysis Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex flex-col items-start gap-4">
            <h5 className="text-2xl font-semibold mb-2">Sentiment Analysis</h5>
            <p className="text-base text-neutral-600 mb-4">
              See detailed sentiment analysis of the submitted tweet.
            </p>
            <RatingWithReasoning tweetContent={tweetContent} scores={scores} reasoning={reasoning} />
          </div>
        </div>

        {/* Chatbot Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex flex-col items-start gap-4">
            <h5 className="text-2xl font-semibold mb-2">Chat with the Bot</h5>
            <p className="text-base text-neutral-600 mb-4">
              Discuss the tweet with our AI chatbot.
            </p>
            <Chatbot />
          </div>
        </div>
      </div>

      {/* Tweet Demo Section */}
      {tweetUrl && (
        <div className="mt-10 w-full max-w-4xl p-4 bg-gray-100 rounded-lg shadow-md mx-auto">
          <TweetDemo tweetUrl={tweetUrl} />
        </div>
      )}
    </div>
  );
}
