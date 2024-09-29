// components/RatingWithReasoning.tsx
import React from 'react';

interface RatingWithReasoningProps {
  tweetContent: string;
  scores: { positive: number; neutral: number; negative: number }; // Update to accept scores object
  reasoning: string;
}

export const RatingWithReasoning: React.FC<RatingWithReasoningProps> = ({
  tweetContent,
  scores,
  reasoning,
}) => {
  const { positive, neutral, negative } = scores;

  // Calculate the stroke offset for each segment
  const totalScore = positive + neutral + negative;
  const positiveOffset = (positive / totalScore) * 100;
  const neutralOffset = (neutral / totalScore) * 100;
  const negativeOffset = (negative / totalScore) * 100;

  return (
    <div className="flex flex-col items-center justify-center bg-neutral-900 rounded-lg shadow-lg p-4 w-full max-w-sm text-white">
      {/* Multi-Segment Circle */}
      <div className="relative w-40 h-40 mb-4">
        <svg width="100%" height="100%" viewBox="0 0 36 36" className="transform rotate-90">
          {/* Background circle */}
          <path
            className="text-neutral-700"
            strokeDasharray="100, 100"
            strokeDashoffset="0"
            d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
          />
          {/* Negative segment */}
          <path
            className="text-red-500"
            strokeDasharray={`${negativeOffset}, 100`}
            strokeDashoffset="0"
            d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
          />
          {/* Neutral segment */}
          <path
            className="text-yellow-500"
            strokeDasharray={`${neutralOffset}, 100`}
            strokeDashoffset={`-${negativeOffset}`}
            d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
          />
          {/* Positive segment */}
          <path
            className="text-green-500"
            strokeDasharray={`${positiveOffset}, 100`}
            strokeDashoffset={`-${negativeOffset - neutralOffset}`}
            d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-lg font-semibold text-white">Sentiment</p>
        </div>
      </div>
      {/* Score Labels */}
      <div className="flex justify-between w-full px-4 mb-4">
        <div className="text-red-500 text-sm">Negative: {negative.toFixed(1)}%</div>
        <div className="text-yellow-500 text-sm">Neutral: {neutral.toFixed(1)}%</div>
        <div className="text-green-500 text-sm">Positive: {positive.toFixed(1)}%</div>
      </div>
      {/* Reasoning Section */}
      <div className="w-full bg-neutral-800 rounded-lg p-4 border border-neutral-700 text-sm text-center">
        <p>{reasoning}</p>
      </div>
    </div>
  );
};
