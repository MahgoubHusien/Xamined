// app/tweet-carousel/page.tsx
import React from "react";
import MarqueeComponent from "@/components/magicui/marquee";
import FillerTweetCard from "@/components/magicui/filler-tweet-card";

const tweetIds = ["1441032681968212480", "1675849118445436929", "1678577280489234432"];

const firstRow = tweetIds.slice(0, tweetIds.length);
const secondRow = tweetIds.slice(0, tweetIds.length);

const TweetCarousel = () => (
  <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-8">
    {/* First Row of Tweet Cards */}
    <MarqueeComponent className="[--duration:20s]" pauseOnHover>
      {firstRow.map((id) => (
        <FillerTweetCard key={id} id={id} />
      ))}
    </MarqueeComponent>

    {/* Second Row of Tweet Cards, scrolling in reverse */}
    <MarqueeComponent reverse className="[--duration:20s]" pauseOnHover>
      {secondRow.map((id) => (
        <FillerTweetCard key={id} id={id} />
      ))}
    </MarqueeComponent>
  </div>
);

export default TweetCarousel;
