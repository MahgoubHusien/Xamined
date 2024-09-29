// components/magicui/filler-tweet-card.tsx
import React from "react";

const FillerTweetCard = ({ id }: { id: string }) => (
  <div className="w-64 p-4 bg-gray-800 rounded-lg shadow-lg">
    <h3 className="text-white font-bold">Tweet {id}</h3>
    <p className="text-gray-400">This is a placeholder tweet.</p>
  </div>
);

export default FillerTweetCard;
