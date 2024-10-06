import React, { useState } from "react";
import { RatingWithReasoning } from "@/components/ui/RatingWithReasoning";
import { TweetDemo } from "@/components/ui/tweet";
import Chatbot from "@/components/ui/chatbot";

const FeaturesPage = () => {
  const [tweetContent, setTweetContent] = useState<string>("");
  const [tweetUrl, setTweetUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [scores, setScores] = useState<{ positive: number; neutral: number; negative: number }>({
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const [reasoning, setReasoning] = useState<string>("");

  const fetchTweetContent = async (url: string) => {
    const tweetId = url.split("/").pop(); 

    if (!tweetId) {
      console.error("Tweet ID is undefined.");
      return;
    }

    try {
      setLoading(true);
      console.log(`Fetching tweet and sentiment for ID: ${tweetId}`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/tweets/sentiment/${tweetId}`);
      
      if (response.ok) {
        const data = await response.json();
        setTweetContent(data.tweetContent || "");
        setScores(data.sentimentAnalysis || { positive: 0, neutral: 0, negative: 0 });
        setReasoning(data.reasoning || "");
      } else if (response.status === 404) {
        console.log("Tweet not found in the database, fetching from external source.");
        const newTweetContent = await fetchTweetDataFromExternalAPI(url);
        if (newTweetContent) {
          console.log("Tweet content fetched from external source, analyzing...");
          await analyzeAndSaveTweet(tweetId, newTweetContent);
        } else {
          setTweetContent("");
        }
      } else {
        setTweetContent("");
      }
    } catch (error) {
      console.error("Error occurred while fetching tweet content:", error);
      setTweetContent("");
    } finally {
      setLoading(false);
    }
  };

  const fetchTweetDataFromExternalAPI = async (url: string) => {
    const tweetId = url.split("/").pop();
    try {
      const response = await fetch(`/api/tweet/${tweetId}`);
      if (response.ok) {
        const data = await response.json();
        return data.tweet.text;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching tweet content from external API:", error);
      return null;
    }
  };

  const analyzeAndSaveTweet = async (tweetId: string, content: string) => {
    try {
      const sentimentResponse = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      });
      const sentimentData = await sentimentResponse.json();

      setScores({
        positive: sentimentData.Positive * 100 || 0,
        neutral: sentimentData.Neutral * 100 || 0,
        negative: sentimentData.Negative * 100 || 0,
      });

      const prompt = `The tweet is: "${content}". The sentiment analysis results are: Positive: ${sentimentData.Positive * 100}%, Neutral: ${sentimentData.Neutral * 100}%, Negative: ${sentimentData.Negative * 100}%. The tweet is: "${tweetContent}".
      Explain why the sentiment is the way it is. Check if there is any sarcasm or slang that could affect the analysis. Please just use regular font and do not bolden any words.
      `;

      const chatGPTResponse = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const chatGPTData = await chatGPTResponse.json();
      setReasoning(chatGPTData.response);

      const savedTweetResponse = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/tweets/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tweetId,
          tweetContent: content,
          sentimentAnalysis: sentimentData,
          reasoning: chatGPTData.response,
        }),
      });

      const savedTweet = await savedTweetResponse.json();
      setTweetContent(savedTweet.tweetContent);
    } catch (error) {
      console.error("Error analyzing and saving tweet:", error);
    }
  };

  const handleTweetSubmit = (url: string) => {
    setTweetUrl(url);
    fetchTweetContent(url);
  };

  return (
    <div className="relative py-10 lg:py-20 max-w-7xl mx-auto font-sans px-4 md:px-8 dark:text-white">
      <div className="text-center mb-12 mt-10">
        <h4 className="text-3xl lg:text-5xl leading-tight tracking-tight font-semibold text-neutral-900 dark:text-white">
          Analyze Tweets with Our AI
        </h4>
        <p className="text-base lg:text-lg mt-4 text-neutral-600 dark:text-neutral-300">
          Submit any tweet URL to see its sentiment score, reasoning, and chat with our AI about it.
        </p>
      </div>

      {loading ? (
        <div className="text-center">
          <p className="text-lg font-semibold text-neutral-600 dark:text-neutral-300">
            Loading, please wait...
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-6">
          <FeatureContainer title="Tweet URL" description="Analyze sentiment of the tweet">
            {tweetUrl ? (
              <div className="w-full">
                <p className="text-center text-neutral-700 dark:text-neutral-300 -mt-3">Submitted Tweet:</p>
                <div className="rounded-lg -mt-3">
                  <TweetDemo tweetUrl={tweetUrl} />
                </div>
              </div>
            ) : (
              <TwitterSubmission onTweetSubmit={handleTweetSubmit} />
            )}
          </FeatureContainer>

          <FeatureContainer title="Sentiment Analysis" description="Get detailed tweet sentiment">
            <RatingWithReasoning scores={scores} reasoning={reasoning} />
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
    <div className="w-full md:w-[30%] flex-shrink-0 p-4 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg h-[600px] md:h-[600px] flex flex-col justify-start items-center">
      <div className="mb-4 text-center">
        <h5 className="text-xl font-semibold text-neutral-900 dark:text-white">{title}</h5>
        <p className="text-sm text-neutral-500 dark:text-neutral-300">{description}</p>
      </div>
      <div className="flex-grow w-full flex items-center justify-center">{children}</div>
    </div>
  );
};

const TwitterSubmission = ({
  onTweetSubmit,
}: {
  onTweetSubmit: (url: string) => void;
}) => {
  const [tweet, setTweet] = useState("");

  const handleSubmit = () => {
    if (tweet.trim()) {
      onTweetSubmit(tweet);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
        className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
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
