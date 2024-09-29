import React from "react";
import { cn } from "@/lib/utils";
import MarqueeComponent from "@/app/components/magicui/marquee";

const reviews = [
  { name: "Jack", username: "@jack", body: "Amazing experience!", img: "https://avatar.vercel.sh/jack" },
  { name: "Jill", username: "@jill", body: "Fantastic app!", img: "https://avatar.vercel.sh/jill" },
  { name: "John", username: "@john", body: "Great service!", img: "https://avatar.vercel.sh/john" },
  // Add more reviews here...
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => (
  <figure
    className={cn(
      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <img className="rounded-full" width="32" height="32" alt={name} src={img} />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
        <p className="text-xs font-medium dark:text-white/40">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm">{body}</blockquote>
  </figure>
);

export const MarqueeDemo = () => (
  <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
    <MarqueeComponent pauseOnHover className="[--duration:20s]">
      {firstRow.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </MarqueeComponent>
    <MarqueeComponent reverse pauseOnHover className="[--duration:20s]">
      {secondRow.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </MarqueeComponent>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
  </div>
);
