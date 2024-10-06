import React from 'react';

interface RatingWithReasoningProps {
  scores?: {
    positive: number;
    neutral: number;
    negative: number;
  };
  reasoning: string;
}

export const RatingWithReasoning: React.FC<RatingWithReasoningProps> = ({ scores = { positive: 0, neutral: 0, negative: 0 }, reasoning }) => {
  const totalScore = scores.positive + scores.neutral + scores.negative;

  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-[#15202B] dark:text-[#E1E8ED] rounded-lg shadow-md p-6 w-full h-full max-w-md text-black border border-gray-300 dark:border-[#38444D]">
      {totalScore === 0 ? (
        <p>No sentiment data available</p>
      ) : (
        <>
          {/* Sentiment Overview Section */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative flex items-center justify-center w-40 h-40">
              <svg width="100%" height="100%" viewBox="0 0 36 36" className="transform rotate-90">
                {/* Full Background Circle */}
                <path
                  className="text-neutral-700 dark:text-[#38444D]"
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
                <p className="text-lg font-bold text-black dark:text-white">Sentiment</p>
                <p className="text-xs text-gray-400 dark:text-[#8899A6]">Overview</p>
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
              <div className="font-semibold text-black dark:text-white">{scores.negative.toFixed(1)}%</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-yellow-500">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                Neutral
              </div>
              <div className="font-semibold text-black dark:text-white">{scores.neutral.toFixed(1)}%</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-green-500">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                Positive
              </div>
              <div className="font-semibold text-black dark:text-white">{scores.positive.toFixed(1)}%</div>
            </div>
          </div>

          {/* Reasoning Section */}
          <div className="w-full bg-gray-100 dark:bg-[#202E3A] rounded-lg p-4 border border-gray-300 dark:border-[#38444D] text-sm text-left min-h-[150px] max-h-[150px] overflow-y-scroll scrollbar-hide">
            <p className="whitespace-pre-line text-black dark:text-[#E1E8ED]">
              {reasoning}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
