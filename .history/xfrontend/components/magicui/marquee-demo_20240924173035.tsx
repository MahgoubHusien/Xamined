import React from "react";
import { Tweet } from "react-tweet";

interface TweetDemoProps {
  tweetUrl: string;
}

const TweetCard = ({ id }: { id: string }) => (
  <div className="transform scale-75 absolute right-0 top-1/4 mr-8">
    <Tweet id={id} />
  </div>
);

export const TweetDemo: React.FC<TweetDemoProps> = ({ tweetUrl }) => {
  const tweetId = tweetUrl.split("/").pop() || ""; // Extracts the last part of the URL as the tweet ID

  return (
    <div className="relative flex w-[500px]">
      <TweetCard id={tweetId} />
    </div>
  );
};

export default TweetDemo;
