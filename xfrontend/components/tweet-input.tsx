// components/TweetInput.tsx
import React, { useState } from "react";

const TweetInput = ({ onAnalyze }: { onAnalyze: (link: string) => void }) => {
  const [tweetLink, setTweetLink] = useState("");

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h3 className="text-xl font-bold mb-4">Enter Tweet Link</h3>
      <input
        type="text"
        value={tweetLink}
        onChange={(e) => setTweetLink(e.target.value)}
        className="p-2 w-full border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
        placeholder="https://twitter.com/.../status/1234567890"
      />
      <button
        onClick={() => onAnalyze(tweetLink)}
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Analyze Tweet
      </button>
    </div>
  );
};

export default TweetInput;
