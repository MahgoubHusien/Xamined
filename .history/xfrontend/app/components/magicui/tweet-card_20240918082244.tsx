import React, { Suspense } from "react";
import { getTweet } from "react-tweet/api";
import { MagicTweet, TweetSkeleton, TweetNotFound } from "./tweet-components";
import { TweetProps } from "react-tweet";

export const TweetCard = async ({
  id,
  components,
  fallback = <TweetSkeleton />,
  onError,
  ...props
}: TweetProps & { className?: string }) => {
  const tweet = id
    ? await getTweet(id).catch((err) => {
        if (onError) onError(err);
        else console.error(err);
      })
    : undefined;

  if (!tweet) return <TweetNotFound {...props} />;

  return (
    <Suspense fallback={fallback}>
      <MagicTweet tweet={tweet} {...props} />
    </Suspense>
  );
};

export default TweetCard;
