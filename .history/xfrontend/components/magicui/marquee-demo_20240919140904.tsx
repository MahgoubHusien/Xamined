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
  <div className="m-0.5 transform scale-50 ">
    <Tweet id={id} />
  </div>
);

export const TweetDemo = () => (
  <div className="relative flex flex-col items-center w-full overflow-auto p-1 space-y-0">
    {tweetIds.map((id) => (
      <TweetCard key={id} id={id} />
    ))}
  </div>
);

export default TweetDemo;
