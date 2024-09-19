import { Suspense } from 'react';
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from 'react-tweet';
import { getTweet as fetchTweet } from 'react-tweet/api';
import { unstable_cache } from 'next/cache';
import { components } from "@/components/tweet-components";

const getTweet = unstable_cache(
  async (id: string) => fetchTweet(id),
  ['tweet'],
  { revalidate: 86400 }
);

export default async function TweetPage({ params }: { params: { id: string } }) {
  try {
    const tweet = await getTweet(params.id);
    return tweet ? (
      <EmbeddedTweet tweet={tweet} components={components} />
    ) : (
      <TweetNotFound />
    );
  } catch (error) {
    console.error(error);
    return <TweetNotFound error={error} />;
  }
}
