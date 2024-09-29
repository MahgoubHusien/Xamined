import React from "react";
import ClientTweetCard from "@/components/magicui/client-tweet-card";
import MarqueeComponent from "@/components/magicui/marquee";

const tweetIds = [
  "1441032681968212480",
  "1675849118445436929",
  "1678577280489234432",
  // Add more tweet IDs here for filler content
];

// Split tweet IDs into two rows
const firstRow = tweetIds.slice(0, tweetIds.length / 2);
const secondRow = tweetIds.slice(tweetIds.length / 2);

const TweetsMarqueePage = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* First row */}
      <MarqueeComponent pauseOnHover className="[--duration:20s]">
        {firstRow.map((id) => (
          <ClientTweetCard key={id} id={id} className="shadow-2xl mx-4" />
        ))}
      </MarqueeComponent>

      {/* Second row, moving in reverse */}
      <MarqueeComponent reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((id) => (
          <ClientTweetCard key={id} id={id} className="shadow-2xl mx-4" />
        ))}
      </MarqueeComponent>

      {/* Gradient overlays for better visual transition */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  );
};

export default TweetsMarqueePage;
