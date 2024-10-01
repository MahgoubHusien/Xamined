import React, { useState, useEffect } from 'react';

interface RatingWithReasoningProps {
  tweetContent: string;
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
    if (!tweetContent) {
      console.log("No tweet content provided.");
      setReasoning("Please insert a tweet for rating.");
      setScores({ positive: 0, neutral: 0, negative: 0 });
      setLoading(false);
      return;
    }
  
    const fetchSentimentAnalysis = async () => {
      try {
        console.log("Fetching sentiment analysis for:", tweetContent);
        const sentimentResponse = await fetch(`${API_URL}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: tweetContent }),
        });
  
        if (!sentimentResponse.ok) {
          console.log("Error fetching sentiment analysis:", sentimentResponse.status);
          throw new Error(`Error fetching sentiment analysis: ${sentimentResponse.status}`);
        }
  
        const sentimentData = await sentimentResponse.json();
        console.log("Sentiment analysis data received:", sentimentData);
  
        const positiveScore = sentimentData.Positive * 100 || 0;
        const neutralScore = sentimentData.Neutral * 100 || 0;
        const negativeScore = sentimentData.Negative * 100 || 0;
  
        setScores({
          positive: positiveScore,
          neutral: neutralScore,
          negative: negativeScore,
        });
  
        const prompt = `
          The tweet is: "${tweetContent}".
          The sentiment analysis results are: Positive: ${positiveScore.toFixed(2)}%, Neutral: ${neutralScore.toFixed(2)}%, Negative: ${negativeScore.toFixed(2)}%.
          Explain why the sentiment is the way it is. Check if there is any sarcasm or slang that could affect the analysis. Please just use regular font and do not bolden any words.
        `;
  
        const chatGPTResponse = await fetch(`${API_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
  
        if (!chatGPTResponse.ok) {
          console.log("Error fetching ChatGPT reasoning:", chatGPTResponse.status);
          throw new Error(`Error fetching ChatGPT reasoning: ${chatGPTResponse.status}`);
        }
  
        const chatGPTData = await chatGPTResponse.json();
        console.log("ChatGPT response received:", chatGPTData);
  
        setReasoning(chatGPTData.response);
      } catch (error) {
        console.error("Error fetching sentiment analysis or reasoning:", error);
        setReasoning('Error fetching sentiment analysis or reasoning.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchSentimentAnalysis();
  }, [tweetContent]);
  
  
  
  const totalScore = scores.positive + scores.neutral + scores.negative;

  return (
    <div className="flex flex-col items-center justify-center bg-neutral-800 rounded-lg shadow-lg p-6 w-full h-full max-w-md text-white">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
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
        <div className="w-full bg-neutral-700 rounded-lg p-4 border border-neutral-600 text-sm text-left min-h-[150px] max-h-[150px] overflow-y-scroll scrollbar-hide">
          <p className="whitespace-pre-line">
            {reasoning}
          </p>
        </div>
        </>
      )}
    </div>
  );
};
