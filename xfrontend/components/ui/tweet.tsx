import React from "react";
import { Tweet } from "react-tweet";

interface TweetDemoProps {
  tweetUrl: string;
}

const TweetCard = ({ id }: { id: string }) => (
  <div className="w-full max-w-full h-full">
    <Tweet id={id} />
  </div>
);

export const TweetDemo: React.FC<TweetDemoProps> = ({ tweetUrl }) => {
  const tweetId = tweetUrl.split("/").pop() || ""; 

  return (
    <div className="relative w-full max-w-full h-full flex justify-center">
      <TweetCard id={tweetId} />
    </div>
  );
};

export default TweetDemo;
