import React from "react";
import { MarqueeDemo } from "@/components/magicui/marquee-demo"; // Ensure the correct path to MarqueeDemo
import { ClientTweetCard }

const MarqueeTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <MarqueeDemo />
    </div>
  );
};

export default MarqueeTestPage;
