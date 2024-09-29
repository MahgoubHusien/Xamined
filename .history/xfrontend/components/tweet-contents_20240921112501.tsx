import { useEffect, useState } from 'react';
import { getTweet, type Tweet } from 'react-tweet/api';

export default function TweetContent({ tweetId }: { tweetId: string }) {
  const [tweet, setTweet] = useState<Tweet | null>(null);

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const fetchedTweet = await getTweet(tweetId);
        if (fetchedTweet) {
          setTweet(fetchedTweet); // Only set state if tweet is defined
        } else {
          console.error("Tweet not found");
        }
      } catch (error) {
        console.error('Error fetching tweet:', error);
      }
    };
    fetchTweet();
  }, [tweetId]);

  if (!tweet) return <div>Loading...</div>;

  return (
    <div>
      <p>{tweet.text}</p>
    </div>
  );
}
