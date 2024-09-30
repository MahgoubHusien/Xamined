import type { NextApiRequest, NextApiResponse } from 'next';
import { getTweet } from 'react-tweet/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tweet } = req.query;

  if (!tweet || typeof tweet !== 'string') {
    res.status(400).json({ error: 'Tweet ID is required and must be a string' });
    return;
  }

  try {
    const tweetData = await getTweet(tweet);
    res.status(200).json({ tweet: tweetData });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch tweet data' });
  }
}
