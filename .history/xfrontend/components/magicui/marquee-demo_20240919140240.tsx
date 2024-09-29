import React from "react";
import { Tweet } from "react-tweet";

const tweetIds = [
  "1836824626971955537",
  "1836824626971955537",
  "1836824626971955537",
  "1836824626971955537",
  "1836824626971955537",
  "1836824626971955537",
  "1836824626971955537",
  "1836824626971955537",
];

const TweetCard = ({ id }: { id: string }) => (
  <div className="my-4 transform scale-90">
    {/* Scale down the tweets if needed */}
    <Tweet id={id} />
  </div>
);

export const TweetDemo = () => (
  <div className="relative flex flex-col items-center w-full overflow-auto p-8 space-y-4">
    {/* space-y-4 adds vertical space between the tweets */}
    {tweetIds.map((id) => (
      <TweetCard key={id} id={id} />
    ))}
  </div>
);

export default TweetDemo;
