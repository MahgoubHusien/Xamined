// components/magicui/filler-tweet-card.tsx
import React, { Suspense } from "react";
import { enrichTweet, type Tweet } from "react-tweet";
import { TweetSkeleton, MagicTweet, TweetNotFound } from "@/components/magicui/tweet-card";

interface FillerTweetCardProps {
  tweet: Tweet;
}

const FillerTweetCard = ({ tweet }: FillerTweetCardProps) => {
  const enrichedTweet = enrichTweet(tweet);

  return (
    <Suspense fallback={<TweetSkeleton />}>
      <MagicTweet tweet={enrichedTweet} />
    </Suspense>
  );
};

export default FillerTweetCard;
