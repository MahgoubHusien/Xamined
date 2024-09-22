// components/tweet-client.tsx
'use client';

import { TweetProps, EmbeddedTweet, TweetNotFound, TweetSkeleton, useTweet } from 'react-tweet';

export const Tweet = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  onError,
}: TweetProps) => {
  const { data, error, isLoading } = useTweet(id, apiUrl);

  if (isLoading) return fallback;
  if (error || !data) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={onError ? onError(error) : error} />;
  }

  return <EmbeddedTweet tweet={data} components={components} />;
};
