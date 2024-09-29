import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Submit a Tweet",
      description: "Enter a tweet to analyze its sentiment.",
      skeleton: <TwitterSubmission />,
      className:
        "col-span-12 md:col-span-6 row-span-1 border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-600",
    },
    {
      title: "Chat with the Bot",
      description: "Discuss the tweet with our AI chatbot.",
      skeleton: <Chatbot />,
      className:
        "col-span-12 md:col-span-6 row-span-3 border-gray-300 dark:border-gray-600",
    },
    {
      title: "Sentiment Score",
      description: "See the sentiment score of the submitted tweet.",
      skeleton: <SentimentScore />,
      className:
        "col-span-12 md:col-span-6 row-span-1 border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-600",
    },
    {
      title: "Sentiment Reasoning",
      description: "Understand why the tweet received that sentiment score.",
      skeleton: <SentimentReasoning />,
      className:
        "col-span-12 md:col-span-6 row-span-1 border-gray-300 dark:border-gray-600",
    },
  ];

  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto font-sans">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Analyze Tweets with Our AI
        </h4>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-gray-700 text-center font-normal dark:text-gray-300">
          Submit any tweet to see its sentiment score, reasoning, and chat with our AI about it.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-12 grid-rows-3 gap-0 mt-12 border rounded-md border-gray-300 dark:border-gray-600">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
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

const FeatureCard = ({ children, className }) => {
  return (
    <div
      className={cn(`p-4 sm:p-8 relative overflow-hidden font-sans`, className)}
    >
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }) => {
  return (
    <p className="text-sm md:text-base max-w-4xl text-left mx-auto text-gray-700 font-normal dark:text-gray-300 max-w-sm mx-0 md:text-sm my-2">
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
    <div className="flex flex-col items-start gap-4 h-full">
      <input
        type="text"
        placeholder="Enter tweet text or URL"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1c1c1e] text-black dark:text-white"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

// Sentiment Score Component
export const SentimentScore = () => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Simulate fetching sentiment score
    const fetchScore = async () => {
      // Replace with actual API call
      setScore(0.75);
    };
    fetchScore();
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      {score !== null ? (
        <div className="text-center">
          <p className="text-6xl font-bold text-green-500">
            {(score * 100).toFixed(0)}%
          </p>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            Positive Sentiment
          </p>
        </div>
      ) : (
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Analyzing...
        </p>
      )}
    </div>
  );
};

// Sentiment Reasoning Component
export const SentimentReasoning = () => {
  const [reasoning, setReasoning] = useState("");

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
    <div className="flex items-center justify-center h-full">
      {reasoning ? (
        <p className="text-gray-700 dark:text-gray-300">{reasoning}</p>
      ) : (
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Analyzing...
        </p>
      )}
    </div>
  );
};

// Chatbot Component
export const Chatbot = () => {
  const [messages, setMessages] = useState([]);
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
    <div className="flex flex-col h-full font-sans">
      <div className="flex-1 overflow-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1c1c1e]">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              message.sender === "User" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block p-2 rounded-md ${
                message.sender === "User"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-2 flex-shrink-0">
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1c1c1e] text-black dark:text-white"
          />
          <button
            onClick={handleSend}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
