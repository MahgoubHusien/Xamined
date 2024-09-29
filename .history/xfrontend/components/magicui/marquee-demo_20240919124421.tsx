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
  { name: "Mike", username: "@mike", body: "Exceeded my expectations!", img: "https://avatar.vercel.sh/mike" },
  { name: "Emma", username: "@emma", body: "Wonderful app!", img: "https://avatar.vercel.sh/emma" },
  { name: "Chris", username: "@chris", body: "User-friendly and intuitive.", img: "https://avatar.vercel.sh/chris" },
  { name: "Olivia", username: "@olivia", body: "Impressive design!", img: "https://avatar.vercel.sh/olivia" },
  { name: "Liam", username: "@liam", body: "Great customer support!", img: "https://avatar.vercel.sh/liam" },
  { name: "Sophia", username: "@sophia", body: "Perfect for my needs.", img: "https://avatar.vercel.sh/sophia" },
  { name: "Noah", username: "@noah", body: "Highly recommended!", img: "https://avatar.vercel.sh/noah" },
  { name: "Isabella", username: "@isabella", body: "Top-notch features!", img: "https://avatar.vercel.sh/isabella" },
  { name: "Ethan", username: "@ethan", body: "Smooth and efficient.", img: "https://avatar.vercel.sh/ethan" },
  { name: "Mia", username: "@mia", body: "Amazing overall!", img: "https://avatar.vercel.sh/mia" },
  { name: "Ava", username: "@ava", body: "Love the interface.", img: "https://avatar.vercel.sh/ava" },
  { name: "Lucas", username: "@lucas", body: "Incredible value!", img: "https://avatar.vercel.sh/lucas" },
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
      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 m-4", // Added margin for spacing
      "border-gray-200 bg-white hover:bg-gray-100", // Light mode
      "dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700", // Dark mode
      "text-gray-900 dark:text-white" // Text color based on theme
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <img className="rounded-full" width="32" height="32" alt={name} src={img} />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium">{name}</figcaption>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm">{body}</blockquote>
  </figure>
);

export const MarqueeDemo = () => (
  <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg space-y-4">
    <MarqueeComponent pauseOnHover className="[--duration:20s]">
      <div className="flex space-x-4"> 
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </div>
    </MarqueeComponent>
    <MarqueeComponent reverse pauseOnHover className="[--duration:20s]">
      <div className="flex space-x-4"> 
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </div>
    </MarqueeComponent>
  </div>
);
