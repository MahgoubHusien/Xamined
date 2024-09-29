"use client";

import { TweetProps, useTweet } from "react-tweet";

import {
  MagicTweet,
  TweetNotFound,
  TweetSkeleton,
} from "@/components/magicui/tweet-card";

const mockTweet = {
  user: {
    name: "John Doe",
    screen_name: "johndoe",
    url: "https://twitter.com/johndoe",
    profile_image_url_https: "https://via.placeholder.com/48",
    verified: true,
    is_blue_verified: false,
  },
  text: "This is a mock tweet used for the demo! #mock #tweet",
  photos: [{ url: "https://via.placeholder.com/300" }],
};

const ClientTweetCard = ({
  id,
  fallback = <TweetSkeleton />,
  ...props
}) => {
  const data = mockTweet; // Use mock data

  if (!data) {
    return <TweetNotFound {...props} />;
  }

  return <MagicTweet tweet={data} {...props} />;
};

export default ClientTweetCard;


const ClientTweetCard = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  fetchOptions,
  onError,
  ...props
}: TweetProps & { className?: string }) => {
  const { data, error, isLoading } = useTweet(id, apiUrl, fetchOptions);

  if (isLoading) return fallback;
  if (error || !data) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={onError ? onError(error) : error} />;
  }

  return <MagicTweet tweet={data} components={components} {...props} />;
};

export default ClientTweetCard;
