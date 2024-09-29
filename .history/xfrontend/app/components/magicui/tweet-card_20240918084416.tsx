import { Suspense } from "react";
import { enrichTweet, TweetProps, getTweet } from "react-tweet";
import { cn } from "@/lib/utils";
import { TweetHeader, TweetBody, TweetMedia, TweetNotFound, TweetSkeleton, MagicTweet } from "@/components/magicui/tweet-card-components";

export const TweetCard = async ({ id, components, fallback = <TweetSkeleton />, onError, ...props }: TweetProps & { className?: string }) => {
  const tweet = id ? await getTweet(id).catch(onError || console.error) : undefined;

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound {...props} />;
  }

  return (
    <Suspense fallback={fallback}>
      <MagicTweet tweet={enrichTweet(tweet)} {...props} />
    </Suspense>
  );
};
