import React from "react";
import { MarqueeDemo } from "@/components/magicui/marquee-demo"; // Ensure the correct path to MarqueeDemo
import ClientTweetCard from "@/components/magicui/client-tweet-card"

const MarqueeTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <ClientTweetCard key={1441032681968212480} id={id} className="shadow-2xl" />
    </div>
  );
};

export default MarqueeTestPage;
