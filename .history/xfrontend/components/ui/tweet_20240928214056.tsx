import React from "react";
import { Tweet } from "react-tweet";

interface TweetDemoProps {
  tweetUrl: string;
}

const TweetCard = ({ id }: { id: string }) => (
  <div className="transform scale-0 mx-auto">
    <Tweet id={id} />
  </div>
);

export const TweetDemo: React.FC<TweetDemoProps> = ({ tweetUrl }) => {
  const tweetId = tweetUrl.split("/").pop() || ""; 

  return (
    <div className="relative flex w-full max-w-md">
      <TweetCard id={tweetId} />
    </div>
  );
};

export default TweetDemo;
