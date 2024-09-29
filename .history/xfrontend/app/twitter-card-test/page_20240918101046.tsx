import React from "react";
import ClientTweetCard from "@/app/components/magicui/client-tweet-card"; // Update the path if necessary

const TwitterCardTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-lg p-4">
        <ClientTweetCard id="1441032681968212480" className="shadow-lg" />
      </div>
    </div>
  );
};

export default TwitterCardTestPage;
