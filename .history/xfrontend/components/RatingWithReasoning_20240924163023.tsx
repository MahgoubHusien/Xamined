import React from 'react';

interface RatingWithReasoningProps {
  tweetContent: string;
  scores: { positive: number; neutral: number; negative: number };
  reasoning: string;
}

export const RatingWithReasoning: React.FC<RatingWithReasoningProps> = ({
  tweetContent,
  scores,
  reasoning,
}) => {
  const { positive, neutral, negative } = scores;

  const totalScore = positive + neutral + negative;

  return (
    <div className="flex flex-col items-center justify-center bg-neutral-800 rounded-lg shadow-lg p-6 w-full max-w-sm text-white">
      {/* Sentiment Overview Section */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative flex items-center justify-center w-32 h-32">
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
              strokeDasharray={`${(negative / totalScore) * 100}, 100`}
              strokeDashoffset="0"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
            />
            {/* Neutral Segment */}
            <path
              className="text-yellow-500"
              strokeDasharray={`${(neutral / totalScore) * 100}, 100`}
              strokeDashoffset={`-${(negative / totalScore) * 100}`}
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
            />
            {/* Positive Segment */}
            <path
              className="text-green-500"
              strokeDasharray={`${(positive / totalScore) * 100}, 100`}
              strokeDashoffset={`-${(negative / totalScore) * 100 + (neutral / totalScore) * 100}`}
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
          <div className="font-semibold text-white">{negative.toFixed(1)}%</div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-yellow-500">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            Neutral
          </div>
          <div className="font-semibold text-white">{neutral.toFixed(1)}%</div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-green-500">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            Positive
          </div>
          <div className="font-semibold text-white">{positive.toFixed(1)}%</div>
        </div>
      </div>

      {/* Reasoning Section */}
      <div className="w-full bg-neutral-700 rounded-lg p-4 border border-neutral-600 text-sm text-center">
        <p>{reasoning}</p>
      </div>
    </div>
  );
};
