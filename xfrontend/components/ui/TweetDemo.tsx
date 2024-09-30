// /app/components/TweetDemo.tsx

import { useEffect, useState } from 'react';
import { Tweet, TweetNotFound, TweetSkeleton } from 'react-tweet';

const TweetDemo = ({ tweetId }: { tweetId: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTweetData() {
      try {
        const res = await fetch(`/api/tweet/${tweetId}`);
        if (!res.ok) throw new Error('Tweet not found');
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTweetData();
  }, [tweetId]);

  if (loading) return <TweetSkeleton />;
  if (error) return <TweetNotFound error={error} />;

  return <Tweet id={tweetId} />; // Use id prop for the Tweet component
};

export default TweetDemo;
