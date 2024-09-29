import React from "react";
import { enrichTweet, type EnrichedTweet } from "react-tweet";
import { cn } from "@/lib/utils";

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};

export const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex justify-between">
    <div className="flex items-center space-x-2">
      <a href={tweet.user.url}>
        <img src={tweet.user.profile_image_url_https} alt={tweet.user.screen_name} className="rounded-full w-12 h-12" />
      </a>
      <div>
        <a href={tweet.user.url} className="font-semibold">{truncate(tweet.user.name, 20)}</a>
        <a href={tweet.user.url} className="text-sm text-gray-500">@{truncate(tweet.user.screen_name, 16)}</a>
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

export const MagicTweet = ({ tweet }:
