import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Submit a Tweet",
      description: "Enter a tweet to analyze its sentiment.",
      skeleton: <TwitterSubmission />,
      className:
        "col-span-12 md:col-span-6 row-span-1 border-b md:border-b-0 md:border-r dark:border-neutral-800",
    },
    {
      title: "Chat with the Bot",
      description: "Discuss the tweet with our AI chatbot.",
      skeleton: <Chatbot />,
      className:
        "col-span-12 md:col-span-6 row-span-3 dark:border-neutral-800",
    },
    {
      title: "Sentiment Score",
      description: "See the sentiment score of the submitted tweet.",
      skeleton: <SentimentScore />,
      className:
        "col-span-12 md:col-span-6 row-span-1 border-b md:border-b-0 md:border-r dark:border-neutral-800",
    },
    {
      title: "Sentiment Reasoning",
      description:
        "Understand why the tweet received that sentiment score.",
      skeleton: <SentimentReasoning />,
      className:
        "col-span-12 md:col-span-6 row-span-1 dark:border-neutral-800",
    },
  ];

  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto bg-gray-900 text-white overflow-hidden">
      {/* Background and text color updated to match provided code */}
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-extrabold">
          Analyze Tweets with Our AI
        </h4>

        <p className="text-lg lg:text-xl max-w-2xl my-4 mx-auto text-neutral-300 text-center font-normal">
          Submit any tweet to see its sentiment score, reasoning, and chat with
          our AI about it.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-12 grid-rows-3 gap-0 mt-12 xl:border rounded-md border-neutral-700">
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

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-2xl md:text-3xl font-bold">
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
    <p
      className={cn(
        "text-base md:text-lg max-w-4xl text-left mx-auto",
        "text-neutral-300 font-normal my-2"
      )}
    >
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
    <div className="flex flex-col items-start gap-4">
      <input
        type="text"
        placeholder="Enter tweet text or URL"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full p-2 border border-neutral-600 rounded-md bg-gray-800 text-white"
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
    <div className="flex items-center justify-center h-full">
      {score !== null ? (
        <div className="text-center">
          <p className="text-6xl font-bold text-green-400">
            {(score * 100).toFixed(0)}%
          </p>
          <p className="mt-2 text-lg text-neutral-300">
            Positive Sentiment
          </p>
        </div>
      ) : (
        <p className="text-lg text-neutral-300">Analyzing...</p>
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
    <div className="flex items-center justify-center h-full">
      {reasoning ? (
        <p className="text-neutral-300">{reasoning}</p>
      ) : (
        <p className="text-lg text-neutral-300">Analyzing...</p>
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto mb-4 p-2 border border-neutral-600 rounded-md bg-gray-800">
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
                  : "bg-gray-700 text-white"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-neutral-600 rounded-md bg-gray-800 text-white"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};
