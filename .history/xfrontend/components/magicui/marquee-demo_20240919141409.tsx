import React from "react";
import { Tweet } from "react-tweet";

const tweetId = "1836824626971955537"; // Replace with your desired Tweet ID

const TweetCard = ({ id }: { id: string }) => (
  <div className="transform scale-50 absolute right-0 top-1/4 mr-8">
    {/* Adjusted position to right side of the screen */}
    <Tweet id={id} />
  </div>
);

export const TweetDemo = () => (
  <div className="relative flex h-screen w-full overflow-auto p-4">
    {/* Container for the tweet */}
    <TweetCard id={tweetId} />
  </div>
);

export default TweetDemo;
