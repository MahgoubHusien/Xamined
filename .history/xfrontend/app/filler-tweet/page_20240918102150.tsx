// app/tweet-carousel/page.tsx
import React from "react";
import FillerTweetCard from "@/components/magicui/filler-tweet-card";
import MarqueeComponent from "@/components/magicui/marquee";

const tweetIds = ["1", "2", "3", "4", "5", "6"]; // Example tweet IDs or placeholders

const firstRow = tweetIds.slice(0, tweetIds.length);
const secondRow = tweetIds.slice(0, tweetIds.length);

const TweetCarousel = () => {
  return (
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
};

export default TweetCarousel;
