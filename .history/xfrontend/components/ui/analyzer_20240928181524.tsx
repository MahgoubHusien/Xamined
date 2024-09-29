"use client";
import React, { useState } from "react";
import { RatingWithReasoning } from "@/components/ui/RatingWithReasoning";
import { TweetDemo } from "@/components/magicui/tweet";
import Chatbot from "@/components/ui/Chatbot";

const FeaturesPage = () => {
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
    setTweetContent("This is an example tweet.");
    setScores({ positive: 47.7, neutral: 22.87, negative: 29.43 });
    setReasoning(
      "The tweet expresses positive sentiment about the new feature and shows excitement from users."
    );
  };

  return (
    <div className="relative py-10 lg:py-20 max-w-7xl mx-auto font-sans px-4 md:px-8">
      <div className="text-center mb-12">
        <h4 className="text-4xl lg:text-6xl leading-tight tracking-tight font-semibold text-neutral-900">
          Analyze Tweets with Our AI
        </h4>
        <p className="text-lg lg:text-xl mt-4 text-neutral-600">
          Submit any tweet URL to see its sentiment score, reasoning, and chat with our AI about it.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8">
        <FeatureContainer title="Tweet URL" description="Analyze sentiment of the tweet">
          <TwitterSubmission onTweetSubmit={handleTweetSubmit} />
        </FeatureContainer>

        <FeatureContainer title="Sentiment Analysis" description="Get detailed tweet sentiment">
          <RatingWithReasoning
            tweetContent={tweetContent}
            scores={scores}
            reasoning={reasoning}
          />
        </FeatureContainer>

        <FeatureContainer title="Chat with the Bot" description="Discuss the tweet with AI">
          <Chatbot />
        </FeatureContainer>
      </div>

      {tweetUrl && (
        <div className="mt-12 p-6 bg-gray-100 rounded-lg shadow-md">
          <TweetDemo tweetUrl={tweetUrl} />
        </div>
      )}
    </div>
  );
};

const FeatureContainer = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full md:w-[35%] flex-shrink-0 p-8 bg-white border border-gray-200 rounded-lg shadow-lg h-[600px] flex flex-col justify-start items-center">
      <div className="mb-6 text-center">
        <h5 className="text-2xl font-semibold text-neutral-900">{title}</h5>
        <p className="text-lg text-neutral-500">{description}</p>
      </div>
      <div className="flex-grow w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const TwitterSubmission = ({ onTweetSubmit }: { onTweetSubmit: (url: string) => void }) => {
  const [tweet, setTweet] = useState("");

  const handleSubmit = () => {
    if (tweet.trim()) {
      onTweetSubmit(tweet);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-4 w-full">
      <input
        type="text"
        placeholder="Enter tweet URL"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full p-4 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
      />
      <button
        onClick={handleSubmit}
        className="px-8 py-4 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-lg font-semibold"
      >
        Submit
      </button>
    </div>
  );
};

export default FeaturesPage;
