import { EnrichedTweet } from "react-tweet";
import { cn } from "@/lib/utils";

export const Twitter = ({ className, ...props }) => (
  <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
  </svg>
);

export const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex flex-row justify-between tracking-tight">
    <div className="flex items-center space-x-2">
      <a href={tweet.user.url} target="_blank" rel="noreferrer">
        <img alt={tweet.user.screen_name} src={tweet.user.profile_image_url_https} className="overflow-hidden rounded-full" height={48} width={48} />
      </a>
      <div>
        <a href={tweet.user.url} className="font-semibold">{tweet.user.name}</a>
        <a href={tweet.user.url} className="text-sm text-gray-500">@{tweet.user.screen_name}</a>
      </div>
    </div>
    <Twitter className="h-5 w-5 text-blue-500" />
  </div>
);

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="break-words leading-normal">{tweet.text}</div>
);

export const TweetMedia = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex flex-1 items-center justify-center">
    {tweet.photos && (
      <img src={tweet.photos[0].url} className="h-64 rounded-xl border object-cover shadow-sm" alt="tweet media" />
    )}
  </div>
);

export const TweetSkeleton = () => (
  <div className="animate-pulse p-4 border rounded-lg">
    <div className="flex gap-2">
      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
      <div className="flex-1 bg-gray-200 h-10"></div>
    </div>
    <div className="mt-4 bg-gray-200 h-20"></div>
  </div>
);

export const TweetNotFound = () => (
  <div className="text-center p-4 border rounded-lg">
    <h3>Tweet not found</h3>
  </div>
);

export const MagicTweet = ({ tweet, className }: { tweet: EnrichedTweet; className?: string }) => (
  <div className={cn("relative flex flex-col gap-2 border p-4 rounded-lg", className)}>
    <TweetHeader tweet={tweet} />
    <TweetBody tweet={tweet} />
    <TweetMedia tweet={tweet} />
  </div>
);
