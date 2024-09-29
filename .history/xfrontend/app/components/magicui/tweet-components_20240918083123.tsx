import React from "react";
import { enrichTweet, type EnrichedTweet } from "react-tweet";
import { cn } from "@/lib/utils";

export const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex justify-between">
    <div className="flex items-center space-x-2">
      <a href={tweet.user.url}>
        <img src={tweet.user.profile_image_url_https} alt={tweet.user.screen_name} className="rounded-full w-12 h-12" />
      </a>
      <div>
        <a href={tweet.user.url} className="font-semibold">{tweet.user.name}</a>
        <a href={tweet.user.url} className="text-sm text-gray-500">@{tweet.user.screen_name}</a>
      </div>
    </div>
  </div>
);

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="leading-normal">
    {tweet.entities.map((entity, idx) => {
      if (entity.type === "text") return <span key={idx} dangerouslySetInnerHTML={{ __html: entity.text }} />;
      return <a key={idx} href={entity.href} className="text-blue-500">{entity.text}</a>;
    })}
  </div>
);

export const TweetMedia = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex justify-center">
    {tweet.photos && tweet.photos.map((photo, idx) => <img key={idx} src={photo.url} className="rounded-lg" />)}
  </div>
);

export const MagicTweet = ({ tweet }: { tweet: EnrichedTweet }) => {
  const enrichedTweet = enrichTweet(tweet);
  return (
    <div className="border p-4 rounded-lg">
      <TweetHeader tweet={enrichedTweet} />
      <TweetBody tweet={enrichedTweet} />
      <TweetMedia tweet={enrichedTweet} />
    </div>
  );
};

export const TweetSkeleton = () => (
  <div className="border p-4 rounded-lg animate-pulse">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      <div className="h-4 w-1/2 bg-gray-300"></div>
    </div>
    <div className="h-4 w-full bg-gray-300 mt-4"></div>
    <div className="h-4 w-full bg-gray-300 mt-2"></div>
  </div>
);

export const TweetNotFound = () => (
  <div className="border p-4 rounded-lg text-center">
    <p>Tweet not found</p>
  </div>
);
