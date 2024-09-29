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
  favorite_count: 120,
  conversation_count: 5,
  news_action_type: null,
  retweet_count: 15,
  created_at: "2022-01-01T00:00:00Z",
  entities: [],
  __typename: "Tweet",
};


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
    return <MagicTweet tweet={mockTweet} components={components} {...props} />;
  }

  return <MagicTweet tweet={data} components={components} {...props} />;
};

export default ClientTweetCard;
