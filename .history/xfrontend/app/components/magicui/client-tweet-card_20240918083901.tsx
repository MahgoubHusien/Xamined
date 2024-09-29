"use client";
import { useTweet } from "react-tweet";
import { cn } from "@/lib/utils";

const TweetHeader = ({ tweet }) => (
  <div className="flex items-center space-x-2">
    <img src={tweet.user.profile_image_url_https} alt={tweet.user.screen_name} className="rounded-full" />
    <div>
      <span className="font-semibold">{tweet.user.name}</span>
      <span className="text-sm text-gray-500">@{tweet.user.screen_name}</span>
    </div>
  </div>
);

const TweetBody = ({ tweet }) => (
  <p>{tweet.text}</p>
);

const TweetMedia = ({ tweet }) => (
  <div>{tweet.photos && <img src={tweet.photos[0].url} alt="Tweet media" className="rounded-lg" />}</div>
);

const ClientTweetCard = ({ id }: { id: string }) => {
  const { data: tweet, error, isLoading } = useTweet(id);

  if (isLoading) return <div>Loading...</div>;
  if (error || !tweet) return <div>Tweet not found</div>;

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <TweetHeader tweet={tweet} />
      <TweetBody tweet={tweet} />
      <TweetMedia tweet={tweet} />
    </div>
  );
};

export default ClientTweetCard;
