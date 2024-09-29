"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { RatingWithReasoning } from "@/components/RatingWithReasoning";
import { TweetDemo } from "@/components/magicui/marquee-demo";

export function FeaturesSectionDemo() {
  const [tweetContent, setTweetContent] = useState("");
  const [tweetUrl, setTweetUrl] = useState<string | null>(null);
  const [scores, setScores] = useState<{ positive: number; neutral: number; negative: number }>({
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const [reasoning, setReasoning] = useState("");

  const handleTweetSubmit = (url: string) => {
    setTweetUrl(url);
    // Example: Call an API or function to fetch tweet details and sentiment analysis
    // For now, we set it with dummy data
    setTweetContent("This is an example tweet.");
    setScores({ positive: 47.7, neutral: 22.87, negative: 29.43 });
    setReasoning(
      "The tweet expresses positive sentiment about the new feature and shows excitement from users."
    );
  };

  return (
    <div className="relative py-10 lg:py-20 max-w-7xl mx-auto font-sans">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl leading-tight max-w-5xl mx-auto text-center tracking-tight font-semibold text-neutral-900">
          Analyze Tweets with Our AI
        </h4>
        <p className="text-base lg:text-lg max-w-2xl my-4 mx-auto text-neutral-600 text-center font-normal">
          Submit any tweet URL to see its sentiment score, reasoning, and chat with our AI about it.
        </p>
      </div>
      <div className="relative mt-12 grid grid-cols-12 grid-rows-3 gap-6">
        <FeatureCard className="col-span-12 md:col-span-4 row-span-1">
          <FeatureTitle>Tweet URL</FeatureTitle>
          <FeatureDescription>Enter the tweet URL to analyze its sentiment.</FeatureDescription>
          <TwitterSubmission onTweetSubmit={handleTweetSubmit} />
        </FeatureCard>
        <FeatureCard className="col-span-12 md:col-span-4 row-span-1">
          <FeatureTitle>Sentiment Analysis</FeatureTitle>
          <FeatureDescription>See detailed sentiment analysis of the submitted tweet.</FeatureDescription>
          <RatingWithReasoning tweetContent={tweetContent} scores={scores} reasoning={reasoning} />
        </FeatureCard>
        <FeatureCard className="col-span-12 md:col-span-4 row-span-2">
          <FeatureTitle>Chat with the Bot</FeatureTitle>
          <FeatureDescription>Discuss the tweet with our AI chatbot.</FeatureDescription>
          <Chatbot />
        </FeatureCard>
      </div>
      {tweetUrl && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <TweetDemo tweetUrl={tweetUrl} />
        </div>
      )}
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
        `p-4 sm:p-4 relative overflow-hidden h-[600px] border border-gray-200 bg-white rounded-lg shadow-lg min-h-[420px]`,
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

const TwitterSubmission = ({ onTweetSubmit }: { onTweetSubmit: (url: string) => void }) => {
  const [tweet, setTweet] = useState("");

  const handleSubmit = () => {
    onTweetSubmit(tweet);
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

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
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
    <div className="flex flex-col h-[490px]">
      <div className="flex-1 overflow-y-auto mb-4 p-4 border border-neutral-300 rounded-md bg-white">
        {messages.map((message, idx) => (
          <div key={idx} className={`mb-4 flex ${message.sender === "User" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs p-3 rounded-lg ${message.sender === "User" ? "bg-blue-500 text-white" : "bg-neutral-200 text-neutral-900"}`}>
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
        <button onClick={handleSend} className="ml-2 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
          Send
        </button>
      </div>
    </div>
  );
};
