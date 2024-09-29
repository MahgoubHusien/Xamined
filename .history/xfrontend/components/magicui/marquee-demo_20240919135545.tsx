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

const firstRow = tweetIds.slice(0, Math.ceil(tweetIds.length / 2));
const secondRow = tweetIds.slice(Math.ceil(tweetIds.length / 2));

const TweetCard = ({ id }: { id: string }) => (
  <div className="m-0.5 transform scale-75">
    <Tweet id={id} />
  </div>
);

export const TweetDemo = () => (
  <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg p-1">
    <div className="flex space-x-1">
      {firstRow.map((id) => (
        <TweetCard key={id} id={id} />
      ))}
    </div>
    <div className="flex space-x-1 mt-1">
      {secondRow.map((id) => (
        <TweetCard key={id} id={id} />
      ))}
    </div>
  </div>
);

export default TweetDemo;
