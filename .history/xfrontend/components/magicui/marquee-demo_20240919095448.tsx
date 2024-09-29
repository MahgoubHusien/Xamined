import React from "react";
import { cn } from "@/lib/utils";
import MarqueeComponent from "@/components/magicui/marquee";

const reviews = [
  { name: "Jack", username: "@jack", body: "Amazing experience!", img: "https://avatar.vercel.sh/jack" },
  { name: "Jill", username: "@jill", body: "Fantastic app!", img: "https://avatar.vercel.sh/jill" },
  { name: "John", username: "@john", body: "Great service!", img: "https://avatar.vercel.sh/john" },
  { name: "Jane", username: "@jane", body: "Absolutely love it!", img: "https://avatar.vercel.sh/jane" },
  { name: "Jenny", username: "@jenny", body: "Impressive features!", img: "https://avatar.vercel.sh/jenny" },
  { name: "James", username: "@james", body: "Highly recommend!", img: "https://avatar.vercel.sh/james" },
  { name: "Jake", username: "@jake", body: "Great user experience!", img: "https://avatar.vercel.sh/jake" },
  { name: "Julie", username: "@julie", body: "So easy to use!", img: "https://avatar.vercel.sh/julie" },
  { name: "Jordan", username: "@jordan", body: "Excellent support!", img: "https://avatar.vercel.sh/jordan" },
  { name: "Jessie", username: "@jessie", body: "Intuitive design!", img: "https://avatar.vercel.sh/jessie" },
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
      "border-gray-800 bg-gray-900 hover:bg-gray-800"
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <img className="rounded-full" width="32" height="32" alt={name} src={img} />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium text-white">{name}</figcaption>
        <p className="text-xs font-medium text-gray-400">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm text-white">{body}</blockquote>
  </figure>
);

export const MarqueeDemo = () => (
  <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent md:shadow-xl">
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
    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-900"></div>
    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-900"></div>
  </div>
);
