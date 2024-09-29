import React from "react";
import { cn } from "@/lib/utils";
import MarqueeComponent from "@/components/magicui/marquee";

const reviews = [
  { name: "Jack", username: "@jack", body: "Amazing experience!", img: "https://avatar.vercel.sh/jack" },
  { name: "Jill", username: "@jill", body: "Fantastic app!", img: "https://avatar.vercel.sh/jill" },
  { name: "John", username: "@john", body: "Great service!", img: "https://avatar.vercel.sh/john" },
  { name: "Jane", username: "@jane", body: "Loved the features!", img: "https://avatar.vercel.sh/jane" },
  { name: "Jenny", username: "@jenny", body: "Superb UI!", img: "https://avatar.vercel.sh/jenny" },
  { name: "James", username: "@james", body: "Highly recommend!", img: "https://avatar.vercel.sh/james" },
  { name: "Alex", username: "@alex", body: "Exceptional experience!", img: "https://avatar.vercel.sh/alex" },
  { name: "Sara", username: "@sara", body: "Outstanding quality!", img: "https://avatar.vercel.sh/sara" },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

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
      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-white shadow-lg",
      "border-gray-950/[.1] hover:bg-gray-950/[.05]",
      "dark:border-gray-50/[.1] dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <img className="rounded-full" width="32" height="32" alt={name} src={img} />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium">{name}</figcaption>
        <p className="text-xs font-medium text-gray-500">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm">{body}</blockquote>
  </figure>
);

export const MarqueeDemo = () => (
  <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
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
  </div>
);
