"use client";
import React, { useState } from "react";
import { RatingWithReasoning } from "@/components/ui/RatingWithReasoning";
import { TweetDemo } from "@/components/magicui/marquee-demo";
import { cn } from "@/lib/utils";

export default function CustomFeatureSection() {
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
    <div className="relative py-10 lg:py-20 max-w-7xl mx-auto font-sans px-4 sm:px-6 md:px-8">
      {/* Page Heading */}
      <div className="px-8 text-center">
        <h4 className="text-3xl lg:text-5xl leading-tight max-w-5xl mx-auto tracking-tight font-semibold text-neutral-900">
          Analyze Tweets with Our AI
        </h4>
        <p className="text-base lg:text-lg max-w-2xl my-4 mx-auto text-neutral-600 font-normal">
          Submit any tweet URL to see its sentiment score, reasoning, and chat with our AI about it.
        </p>
      </div>

      {/* Custom Feature Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-4xl mx-auto mt-12">
        {/* Submit Tweet Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center bg-white border border-gray-200 p-6 rounded-lg shadow-lg">
          <h5 className="text-2xl font-semibold text-neutral-900 mb-4">Submit Tweet</h5>
          <p className="text-base text-neutral-600 mb-4">Enter the tweet URL to analyze its sentiment.</p>
          <TwitterSubmission onTweetSubmit={handleTweetSubmit} />
        </div>

        {/* Rating with Reasoning Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center bg-white border border-gray-200 p-6 rounded-lg shadow-lg">
          <h5 className="text-2xl font-semibold text-neutral-900 mb-4">Sentiment Analysis</h5>
          <p className="text-base text-neutral-600 mb-4">See detailed sentiment analysis of the submitted tweet.</p>
          <RatingWithReasoning tweetContent={tweetContent} scores={scores} reasoning={reasoning} />
        </div>

        {/* Chatbot Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center bg-white border border-gray-200 p-6 rounded-lg shadow-lg">
          <h5 className="text-2xl font-semibold text-neutral-900 mb-4">Chat with the Bot</h5>
          <p className="text-base text-neutral-600 mb-4">Discuss the tweet with our AI chatbot.</p>
          <Chatbot />
        </div>
      </div>

      {/* Tweet Demo Section */}
      {tweetUrl && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <TweetDemo tweetUrl={tweetUrl} />
        </div>
      )}
    </div>
  );
}

const TwitterSubmission = ({ onTweetSubmit }: { onTweetSubmit: (url: string) => void }) => {
  const [tweet, setTweet] = useState("");

  const handleSubmit = () => {
    onTweetSubmit(tweet);
  };

  return (
    <div className="flex flex-col items-start gap-4 mt-4 w-full">
      <input
        type="text"
        placeholder="Enter tweet URL"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full p-3 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 w-full"
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
    <div className="flex flex-col h-[490px] w-full">
      <div className="flex-1 overflow-y-auto mb-4 p-4 border border-neutral-300 rounded-md bg-white">
        {messages.map((message, idx) => (
          <div key={idx} className={`mb-4 flex ${message.sender === "User" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs p-3 rounded-lg ${message.sender === "User" ? "bg-blue-500 text-white" : "bg-neutral-200 text-neutral-900"}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full">
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
