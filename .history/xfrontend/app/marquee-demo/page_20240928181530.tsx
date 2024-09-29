import React from "react";
import { MarqueeDemo } from "@/components/ui/tweet"; // Ensure the correct path to MarqueeDemo

const MarqueeTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <MarqueeDemo />
    </div>
  );
};

export default MarqueeTestPage;
