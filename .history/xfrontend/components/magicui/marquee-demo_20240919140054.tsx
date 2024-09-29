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

const firstRow = tweetIds.slice(0, tweetIds.length / 2);
const secondRow = tweetIds.slice(tweetIds.length / 2);

const TweetCard = ({ id }: { id: string }) => (
  <div className="m-4 transform scale-75 flex-shrink-0">
    <Tweet id={id} />
  </div>
);

export const TweetDemo = () => (
  <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-auto rounded-lg p-8">
    <div className="flex flex-wrap justify-center">
      {firstRow.map((id) => (
        <TweetCard key={id} id={id} />
      ))}
    </div>
    <div className="flex flex-wrap justify-center mt-8">
      {secondRow.map((id) => (
        <TweetCard key={id} id={id} />
      ))}
    </div>
  </div>
);

export default TweetDemo;
