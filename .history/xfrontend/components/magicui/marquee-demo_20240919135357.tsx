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
  <div className="m-1 transform scale-75">
    {/* Adjust the scale value to change the size */}
    <Tweet id={id} />
  </div>
);

export const TweetDemo = () => (
  <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg p-2">
    <div className="flex space-x-2">
      {firstRow.map((id) => (
        <TweetCard key={id} id={id} />
      ))}
    </div>
    <div className="flex space-x-2 mt-2">
      {secondRow.map((id) => (
        <TweetCard key={id} id={id} />
      ))}
    </div>
  </div>
);

export default TweetDemo;
