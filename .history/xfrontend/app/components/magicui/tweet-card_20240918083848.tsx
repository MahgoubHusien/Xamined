import { Suspense } from "react";
import { enrichTweet, getTweet, type Tweet, type TweetProps } from "react-tweet";
import { cn } from "@/lib/utils";

const TweetHeader = ({ tweet }: { tweet: Tweet }) => (
  <div className="flex items-center space-x-2">
    <a href={tweet.user.url} target="_blank" rel="noreferrer">
      <img src={tweet.user.profile_image_url_https} alt={tweet.user.screen_name} className="rounded-full" />
    </a>
    <div>
      <a href={tweet.user.url} target="_blank" className="font-semibold">{tweet.user.name}</a>
      <a href={tweet.user.url} target="_blank" className="text-sm text-gray-500">@{tweet.user.screen_name}</a>
    </div>
  </div>
);

const TweetBody = ({ tweet }: { tweet: Tweet }) => (
  <p>{tweet.text}</p>
);

const TweetMedia = ({ tweet }: { tweet: Tweet }) => (
  <div>{tweet.photos && <img src={tweet.photos[0].url} alt="Tweet media" className="rounded-lg" />}</div>
);

export const TweetCard = async ({ id }: TweetProps) => {
  const tweet = await getTweet(id).catch(console.error);
  if (!tweet) return <div>Tweet not found</div>;

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <TweetHeader tweet={tweet} />
      <TweetBody tweet={tweet} />
      <TweetMedia tweet={tweet} />
    </div>
  );
};
