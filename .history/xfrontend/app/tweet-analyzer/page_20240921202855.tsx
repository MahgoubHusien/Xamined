import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChatBot  from "@/components/chatbot"; // Assuming you have a chatbot component
import { MyTweet } from "@/components/my-tweet"; // Custom tweet component with sentiment logic

export default function SentimentAnalysisPage() {
  const [tweetId, setTweetId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tweetUrl = formData.get("tweetUrl") as string;
    const id = tweetUrl.split("/").pop() || "";
    setTweetId(id);
  };

  return (
    <div className="container mx-auto py-16 px-8 grid lg:grid-cols-2 gap-8">
      {/* Tweet Input and Analysis Section */}
      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="text-lg font-semibold" htmlFor="tweetUrl">
            Enter Tweet Link:
          </label>
          <input
            type="url"
            name="tweetUrl"
            id="tweetUrl"
            placeholder="https://twitter.com/user/status/1234567890"
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Analyze Tweet
          </button>
        </form>

        {tweetId && (
          <div>
            {/* Sentiment Analysis */}
            <h2 className="text-2xl font-bold mb-4">Tweet Sentiment Analysis</h2>
            <MyTweet id={tweetId} />

            {/* Sentiment Reasoning */}
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
              <h3 className="text-xl font-semibold">Sentiment Reasoning:</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                The sentiment of the tweet is positive because it uses words like "love" and "great".
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Chatbot Section */}
      <div className="border-l pl-8 space-y-4">
        <h2 className="text-2xl font-bold">Chat with our AI</h2>
        <ChatBot />
      </div>
    </div>
  );
}
