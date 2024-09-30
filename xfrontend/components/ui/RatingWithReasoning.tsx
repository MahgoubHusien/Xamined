import React, { useState, useEffect } from 'react';

interface RatingWithReasoningProps {
  tweetContent: string;
  scores: { positive: number; neutral: number; negative: number };
  reasoning: string;
}


export const RatingWithReasoning: React.FC<RatingWithReasoningProps> = ({ tweetContent }) => {
  const [scores, setScores] = useState<{ positive: number; neutral: number; negative: number }>({
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const [reasoning, setReasoning] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL;

  useEffect(() => {
    const fetchSentimentAnalysis = async () => {
      try {
        // Step 1: Send tweet to sentiment analysis API
        const sentimentResponse = await fetch(`${API_URL}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: tweetContent }),
        });
        const sentimentData = await sentimentResponse.json();
        setScores({
          positive: sentimentData.find((d: any) => d.label === 'Positive').score * 100,
          neutral: sentimentData.find((d: any) => d.label === 'Neutral').score * 100,
          negative: sentimentData.find((d: any) => d.label === 'Negative').score * 100,
        });

        // Step 2: Send the tweet and sentiment score to ChatGPT to get reasoning
        const prompt = `
          The tweet is: "${tweetContent}".
          The sentiment analysis results are: Positive: ${scores.positive}%, Neutral: ${scores.neutral}%, Negative: ${scores.negative}%.
          Explain why the sentiment is the way it is. Check if there is any sarcasm or slang that could affect the analysis.
        `;
        const chatGPTResponse = await fetch(`${API_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
        const chatGPTData = await chatGPTResponse.json();
        setReasoning(chatGPTData.response);
      } catch (error) {
        setReasoning('Error fetching sentiment analysis or reasoning.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSentimentAnalysis();
  }, [tweetContent]);

  const totalScore = scores.positive + scores.neutral + scores.negative;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-neutral-800 rounded-lg shadow-lg p-6 w-full h-full max-w-md text-white">
      {/* Sentiment Overview Section */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative flex items-center justify-center w-40 h-40">
          <svg width="100%" height="100%" viewBox="0 0 36 36" className="transform rotate-90">
            {/* Full Background Circle */}
            <path
              className="text-neutral-700"
              strokeDasharray="100, 100"
              strokeDashoffset="0"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
            />
            {/* Negative Segment */}
            <path
              className="text-red-500"
              strokeDasharray={`${(scores.negative / totalScore) * 100}, 100`}
              strokeDashoffset="0"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
            />
            {/* Neutral Segment */}
            <path
              className="text-yellow-500"
              strokeDasharray={`${(scores.neutral / totalScore) * 100}, 100`}
              strokeDashoffset={`-${(scores.negative / totalScore) * 100}`}
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
            />
            {/* Positive Segment */}
            <path
              className="text-green-500"
              strokeDasharray={`${(scores.positive / totalScore) * 100}, 100`}
              strokeDashoffset={`-${(scores.negative / totalScore) * 100 + (scores.neutral / totalScore) * 100}`}
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
            />
          </svg>
          {/* Centered Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-lg font-bold text-white">Sentiment</p>
            <p className="text-xs text-gray-400">Overview</p>
          </div>
        </div>
      </div>

      {/* Score Labels */}
      <div className="flex flex-col w-full px-4 mb-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            Negative
          </div>
          <div className="font-semibold text-white">{scores.negative.toFixed(1)}%</div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-yellow-500">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            Neutral
          </div>
          <div className="font-semibold text-white">{scores.neutral.toFixed(1)}%</div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-green-500">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            Positive
          </div>
          <div className="font-semibold text-white">{scores.positive.toFixed(1)}%</div>
        </div>
      </div>

      {/* Reasoning Section */}
      <div className="w-full bg-neutral-700 rounded-lg p-4 border border-neutral-600 text-sm text-left min-h-[150px] max-h-[250px] overflow-y-auto scrollbar-hide">
        <p>{reasoning}</p>
      </div>
    </div>
  );
};
