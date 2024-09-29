// pages/tweet-analyzer.tsx
import React, { useState } from "react";
import TweetInput from "@/components/tweetnput";
import TweetAnalysis from "@/components/TweetAnalysis";
import { DotBackgroundDemo } from "@/components/ui/dot-background";

const TweetAnalyzerPage = () => {
  const [tweetLink, setTweetLink] = useState("");

  const handleAnalyze = (link: string) => {
    setTweetLink(link);
    // Implement analysis logic here or pass it to the child component if needed
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white overflow-hidden">
      <DotBackgroundDemo />

      <div className="absolute top-20 flex flex-row items-start space-x-6 max-w-6xl">
        <TweetInput onAnalyze={handleAnalyze} />
        <TweetAnalysis />
      </div>
    </div>
  );
};

export default TweetAnalyzerPage;
