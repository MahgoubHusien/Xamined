import React from 'react';
import { Tweet } from 'react-tweet';

const TweetComponent = () => {
  return (
    <div className="tweet-container">
      <Tweet id="your-tweet-id-here" />
    </div>
  );
};

export default TweetComponent;
