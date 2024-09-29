import React from "react";
import ClientTweetCard from "@/app/components/magicui/client-tweet-card";
import MarqueeComponent from "@/app/components/magicui/marquee";

const tweetIds = [
  "1441032681968212480", // Replace with actual tweet IDs
  "1675849118445436929",
  "1678577280489234432",
  // Add more tweet IDs here...
];

const firstRow = tweetIds.slice(0, tweetIds.length / 2);
const secondRow = tweetIds.slice(tweetIds.length / 2);

export const MarqueeDemo = () => (
  <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
    <MarqueeComponent pauseOnHover className="[--duration:20s]">
      {firstRow.map((id) => (
        <ClientTweetCard key={id} id={id} className="shadow-2xl" />
      ))}
    </MarqueeComponent>
    <MarqueeComponent reverse pauseOnHover className="[--duration:20s]">
      {secondRow.map((id) => (
        <ClientTweetCard key={id} id={id} className="shadow-2xl" />
      ))}
    </MarqueeComponent>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
  </div>
);
