import React from "react";
import { cn } from "@/lib/utils";
import MarqueeComponent from "@/components/magicui/marquee";

// Updated list with more reviews
const reviews = [
  { name: "Jack", username: "@jack", body: "Amazing experience!", img: "https://avatar.vercel.sh/jack" },
  { name: "Jill", username: "@jill", body: "Fantastic app!", img: "https://avatar.vercel.sh/jill" },
  { name: "John", username: "@john", body: "Great service!", img: "https://avatar.vercel.sh/john" },
  { name: "Jane", username: "@jane", body: "Superb quality!", img: "https://avatar.vercel.sh/jane" },
  { name: "Jenny", username: "@jenny", body: "Very intuitive!", img: "https://avatar.vercel.sh/jenny" },
  { name: "James", username: "@james", body: "Impressive design!", img: "https://avatar.vercel.sh/james" },
  { name: "Jessica", username: "@jessica", body: "Smooth experience!", img: "https://avatar.vercel.sh/jessica" },
  { name: "Jason", username: "@jason", body: "Highly recommend!", img: "https://avatar.vercel.sh/jason" },
  { name: "Jordan", username: "@jordan", body: "Easy to use!", img: "https://avatar.vercel.sh/jordan" },
  { name: "Julia", username: "@julia", body: "Innovative product!", img: "https://avatar.vercel.sh/julia" },
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
      "border-gray-700 bg-transparent hover:bg-gray-700/20", // Adjusted for dark mode
      "dark:border-gray-500 dark:bg-transparent dark:hover:bg-gray-500/20"
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <img className="rounded-full" width="32" height="32" alt={name} src={img} />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium text-white">{name}</figcaption>
        <p className="text-xs font-medium text-white/60">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm text-white">{body}</blockquote>
  </figure>
);

export const MarqueeDemo = () => (
  <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent">
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
    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-900 dark:from-black"></div>
    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-900 dark:from-black"></div>
  </div>
);
