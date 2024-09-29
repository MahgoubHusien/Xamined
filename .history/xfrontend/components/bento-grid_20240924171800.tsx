"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { RatingWithReasoning } from "@/components/RatingWithReasoning";

export function FeaturesSectionDemo() {
  const [tweetContent, setTweetContent] = useState(
    "Apple has announced you can now add California driver's licenses and state IDs to Apple Wallet!"
  );
  const scores = { positive: 47.7, neutral: 22.87, negative: 29.43 };
  const reasoning =
    "The tweet expresses positive sentiment about the new feature and shows excitement from users.";

  const features = [
    {
      title: "Tweet URL",
      description: "Enter the tweet URL to analyze its sentiment.",
      skeleton: <TwitterSubmission />,
      className: "col-span-12 md:col-span-4 row-span-1",
    },
    {
      title: "Sentiment Analysis",
      description: "See detailed sentiment analysis of the submitted tweet.",
      skeleton: (
        <RatingWithReasoning
          tweetContent={tweetContent}
          scores={scores}
          reasoning={reasoning}
        />
      ),
      className: "col-span-12 md:col-span-4 row-span-1",
    },
    {
      title: "Chat with the Bot",
      description: "Discuss the tweet with our AI chatbot.",
      skeleton: <Chatbot />,
      className: "col-span-12 md:col-span-4 row-span-2",
    },
  ];

  return (
    <div className="relative py-10 lg:py-20 max-w-7xl mx-auto font-sans">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl leading-tight max-w-5xl mx-auto text-center tracking-tight font-semibold text-neutral-900">
          Analyze Tweets with Our AI
        </h4>
        <p className="text-base lg:text-lg max-w-2xl my-4 mx-auto text-neutral-600 text-center font-normal">
          Submit any tweet URL to see its sentiment score, reasoning, and chat
          with our AI about it.
        </p>
      </div>
      <div className="relative mt-12 grid grid-cols-12 grid-rows-3 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} className={feature.className}>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            <div className="h-full w-full">{feature.skeleton}</div>
          </FeatureCard>
        ))}
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `p-4 sm:p-8 relative overflow-hidden h-full border border-gray-200 bg-white rounded-lg shadow-lg min-h-[400px]`, // Apply minimum height for all features
        className
      )}
    >
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="flex items-center text-left tracking-tight text-neutral-900 text-2xl font-semibold">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-base text-left text-neutral-600 font-normal my-2">
      {children}
    </p>
  );
};

export const TwitterSubmission = () => {
  const [tweet, setTweet] = useState("");
  const handleSubmit = () => {
    console.log("Submitted tweet:", tweet);
  };
  return (
    <div className="flex flex-col items-start gap-4 mt-4">
      <input
        type="text"
        placeholder="Enter tweet URL"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full p-3 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "User", text: input }]);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "Bot", text: "That's an interesting point!" },
        ]);
      }, 1000);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full"> 
      <div className="flex-1 overflow-y-auto mb-4 p-4 border border-neutral-300 rounded-md bg-white">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`mb-4 flex ${
              message.sender === "User" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.sender === "User"
                  ? "bg-blue-500 text-white"
                  : "bg-neutral-200 text-neutral-900"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};
