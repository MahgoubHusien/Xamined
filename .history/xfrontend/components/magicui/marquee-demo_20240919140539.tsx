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
  <div className="my-2 transform scale-50">
    {/* Scale value set to 50% for smaller tweet size */}
    <Tweet id={id} />
  </div>
);

export const TweetDemo = () => (
  <div className="relative flex flex-col items-center w-full overflow-auto p-4 space-y-2">
    {/* space-y-2 for smaller vertical space between tweets */}
    {tweetIds.map((id) => (
      <TweetCard key={id} id={id} />
    ))}
  </div>
);

export default TweetDemo;
