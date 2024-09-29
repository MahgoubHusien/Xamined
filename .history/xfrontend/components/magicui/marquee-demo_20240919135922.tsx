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
  <div className="m-4 transform scale-75">
    <Tweet id={id} />
  </div>
);

export function TweetDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
      <div className="flex space-x-4">
        {firstRow.map((id) => (
          <TweetCard key={id} id={id} />
        ))}
      </div>
      <div className="flex space-x-4 mt-8">
        {secondRow.map((id) => (
          <TweetCard key={id} id={id} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

export default TweetDemo;
