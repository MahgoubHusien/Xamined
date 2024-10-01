import React, { useState } from "react";
import { RatingWithReasoning } from "@/components/ui/RatingWithReasoning";
import { TweetDemo } from "@/components/ui/tweet";
import Chatbot from "@/components/ui/chatbot";

const FeaturesPage = () => {
  const [tweetContent, setTweetContent] = useState("");
  const [tweetUrl, setTweetUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTweetContent = async (url: string) => {
    const tweetId = url.split("/").pop();

    try {
      setLoading(true);
      const response = await fetch(`/api/tweet/${tweetId}`);
      if (response.ok) {
        const data = await response.json();

        if (data && data.tweet && data.tweet.text) {
          setTweetContent(data.tweet.text);
        } else {
          setTweetContent("");
        }
      } else {
        setTweetContent("");
      }
    } catch (error) {
      setTweetContent("");
    } finally {
      setLoading(false);
    }
  };

  const handleTweetSubmit = (url: string) => {
    setTweetUrl(url);
    fetchTweetContent(url);
  };

  return (
    <div className="relative py-10 lg:py-20 max-w-7xl mx-auto font-sans px-4 md:px-8">
      <div className="text-center mb-12 mt-10">
        <h4 className="text-3xl lg:text-5xl leading-tight tracking-tight font-semibold text-neutral-900">
          Analyze Tweets with Our AI
        </h4>
        <p className="text-base lg:text-lg mt-4 text-neutral-600">
          Submit any tweet URL to see its sentiment score, reasoning, and chat with our AI about it.
        </p>
      </div>

      {loading ? (
        <div className="text-center">
          <p className="text-lg font-semibold text-neutral-600">Loading, please wait...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-6">
          <FeatureContainer title="Tweet URL" description="Analyze sentiment of the tweet">
            {tweetUrl ? (
              <div className="w-full">
                <p className="text-center text-neutral-700 -mt-3">Submitted Tweet:</p>
                <div className="rounded-lg -mt-3">
                  <TweetDemo tweetUrl={tweetUrl} />
                </div>
              </div>
            ) : (
              <TwitterSubmission onTweetSubmit={handleTweetSubmit} />
            )}
          </FeatureContainer>

          <FeatureContainer title="Sentiment Analysis" description="Get detailed tweet sentiment">
            <RatingWithReasoning tweetContent={tweetContent} />
          </FeatureContainer>

          <FeatureContainer title="Chat with the Bot" description="Discuss the tweet with AI">
            <Chatbot />
          </FeatureContainer>
        </div>
      )}
    </div>
  );
};

const FeatureContainer = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full md:w-[30%] flex-shrink-0 p-4 bg-white border border-gray-200 rounded-lg shadow-lg h-[600px] md:h-[600px] flex flex-col justify-start items-center">
      <div className="mb-4 text-center">
        <h5 className="text-xl font-semibold text-neutral-900">{title}</h5>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
      <div className="flex-grow w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const TwitterSubmission = ({ onTweetSubmit }: { onTweetSubmit: (url: string) => void }) => {
  const [tweet, setTweet] = useState("");

  const handleSubmit = () => {
    if (tweet.trim()) {
      onTweetSubmit(tweet);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4 w-full">
      <input
        type="text"
        placeholder="Enter tweet URL"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-3 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-lg font-semibold"
      >
        Submit
      </button>
    </div>
  );
};

export default FeaturesPage;
