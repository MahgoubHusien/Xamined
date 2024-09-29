import React from 'react';
import { cn } from '@/lib/utils';
import Marquee from 'react-fast-marquee'; // Add this dependency to your project

const reviews = [
  { name: 'Jack', username: '@jack', body: 'I love this app!', img: 'https://avatar.vercel.sh/jack' },
  // Add more reviews as needed
];

const ReviewCard = ({ img, name, username, body }: { img: string; name: string; username: string; body: string }) => (
  <figure className={cn("relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-gray-900")}>
    <div className="flex flex-row items-center gap-2">
      <img className="rounded-full" width="32" height="32" alt="" src={img} />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium text-white">{name}</figcaption>
        <p className="text-xs text-gray-400">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm text-white">{body}</blockquote>
  </figure>
);

export const MarqueeDemo = () => (
  <div className="relative flex flex-col items-center justify-center w-full overflow-hidden">
    <Marquee pauseOnHover className="[--duration:20s]">
      {reviews.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
 Here's the final file, **`components/ui/marquee.tsx`**, for your scrolling tweet/review feature:

```tsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee"; // Install with `npm install react-fast-marquee`

const reviews = [
  { name: "Jack", username: "@jack", body: "I love this app!", img: "https://avatar.vercel.sh/jack" },
  { name: "Jill", username: "@jill", body: "This app is fantastic!", img: "https://avatar.vercel.sh/jill" },
  { name: "John", username: "@john", body: "Amazing experience!", img: "https://avatar.vercel.sh/john" },
];

const ReviewCard = ({ img, name, username, body }: { img: string; name: string; username: string; body: string }) => (
  <figure className={cn("relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-gray-900")}>
    <div className="flex flex-row items-center gap-2">
      <img className="rounded-full" width="32" height="32" alt={name} src={img} />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium text-white">{name}</figcaption>
        <p className="text-xs text-gray-400">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm text-white">{body}</blockquote>
  </figure>
);

export const MarqueeDemo = () => (
  <div className="relative flex flex-col items-center justify-center w-full overflow-hidden">
    <Marquee pauseOnHover className="[--duration:20s]">
      {reviews.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
  </div>
);
