"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Submit a Tweet",
      description: "Enter a tweet to analyze its sentiment.",
      skeleton: <TwitterSubmission />,
      className:
        "col-span-12 md:col-span-6 row-span-1 border-b border-neutral-300 dark:border-neutral-700",
    },
    {
      title: "Chat with the Bot",
      description: "Discuss the tweet with our AI chatbot.",
      skeleton: <Chatbot />,
      className:
        "col-span-12 md:col-span-6 row-span-3 border-l border-neutral-300 dark:border-neutral-700",
    },
    {
      title: "Sentiment Score",
      description: "See the sentiment score of the submitted tweet.",
      skeleton: <SentimentScore />,
      className:
        "col-span-12 md:col-span-6 row-span-1 border-b border-neutral-300 dark:border-neutral-700",
    },
    {
      title: "Sentiment Reasoning",
      description: "Understand why the tweet received that sentiment score.",
      skeleton: <SentimentReasoning />,
      className:
        "col-span-12 md:col-span-6 row-span-1 border-neutral-300 dark:border-neutral-700",
    },
  ];

  return (
    <div className="relative  py-10 lg:py-40 max-w-7xl mx-auto font-sans">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl leading-tight max-w-5xl mx-auto text-center tracking-tight font-semibold text-neutral-900 dark:text-neutral-100">
          Analyze Tweets with Our AI
        </h4>

        <p className="text-base lg:text-lg max-w-2xl my-4 mx-auto text-neutral-600 text-center font-normal dark:text-neutral-400">
          Submit any tweet to see its sentiment score, reasoning, and chat with
          our AI about it.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-12 grid-rows-3 gap-0 mt-12">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              className={feature.className}
            >
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
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
        `p-4 sm:p-8 relative overflow-hidden h-full`,
        className
      )}
    >
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-left tracking-tight text-neutral-900 dark:text-neutral-100 text-2xl font-semibold">
      {children}
    </p>
  );
};

const FeatureDescription = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <p className="text-base text-left text-neutral-600 font-normal dark:text-neutral-400 my-2">
      {children}
    </p>
  );
};

// Twitter Submission Component
export const TwitterSubmission = () => {
  const [tweet, setTweet] = useState("");
  const handleSubmit = () => {
    // Handle tweet submission logic here
    console.log("Submitted tweet:", tweet);
  };
  return (
    <div className="flex flex-col items-start gap-4 mt-4">
      <input
        type="text"
        placeholder="Enter tweet text or URL"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-500 dark:bg-blue-400 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors duration-200"
      >
        Submit
      </button>
    </div>
  );
};

// Sentiment Score Component
export const SentimentScore = () => {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    // Simulate fetching sentiment score
    const fetchScore = async () => {
      // Replace with actual API call
      setScore(0.75);
    };
    fetchScore();
  }, []);

  return (
    <div className="flex items-center justify-center h-full mt-4">
      {score !== null ? (
        <div className="text-center">
          <p className="text-6xl font-bold text-green-500">
            {(score * 100).toFixed(0)}%
          </p>
          <p className="mt-2 text-lg text-neutral-700 dark:text-neutral-300">
            Positive Sentiment
          </p>
        </div>
      ) : (
        <p className="text-lg text-neutral-700 dark:text-neutral-300">
          Analyzing...
        </p>
      )}
    </div>
  );
};

// Sentiment Reasoning Component
export const SentimentReasoning = () => {
  const [reasoning, setReasoning] = useState<string>("");

  useEffect(() => {
    // Simulate fetching sentiment reasoning
    const fetchReasoning = async () => {
      // Replace with actual API call
      setReasoning(
        "The tweet expresses a positive outlook with words like 'great' and 'excited'."
      );
    };
    fetchReasoning();
  }, []);

  return (
    <div className="flex items-center justify-center h-full mt-4">
      {reasoning ? (
        <p className="text-neutral-700 dark:text-neutral-300">{reasoning}</p>
      ) : (
        <p className="text-lg text-neutral-700 dark:text-neutral-300">
          Analyzing...
        </p>
      )}
    </div>
  );
};

// Chatbot Component
export const Chatbot = () => {
  const [messages, setMessages] = useState<
    { sender: string; text: string }[]
  >([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "User", text: input }]);
      // Simulate chatbot response
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
    <div className="flex flex-col h-[800px] p4">
      <div className="flex-1 overflow-y-auto mb-4 p-4 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800">
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
                  ? "bg-blue-500 dark:bg-blue-400 text-white"
                  : "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
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
          className="flex-1 p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-6 py-3 bg-blue-500 dark:bg-blue-400 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};
