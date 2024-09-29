// components/magicui/filler-tweet-card.tsx
import React, { Suspense } from "react";
import { enrichTweet, getTweet, type Tweet } from "react-tweet";
import { enrichTweet, getTweet, type Tweet } from "react-tweet";

import { TweetSkeleton, MagicTweet, TweetNotFound } from "@/components/magicui/tweet-card";

const FillerTweetCard = async ({ id }: { id: string }) => {
  const tweet = await getTweet(id).catch(() => null);

  if (!tweet) {
    return <TweetNotFound />;
  }

  const enrichedTweet = enrichTweet(tweet);

  return (
    <Suspense fallback={<TweetSkeleton />}>
      <MagicTweet tweet={enrichedTweet} />
    </Suspense>
  );
};

export default FillerTweetCard;