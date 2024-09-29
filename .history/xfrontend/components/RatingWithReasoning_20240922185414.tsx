// components/RatingWithReasoning.tsx
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface RatingWithReasoningProps {
  tweetContent: string;
  score: number; // Score should be a percentage between 0 and 100
  reasoning: string;
}

export const RatingWithReasoning: React.FC<RatingWithReasoningProps> = ({ tweetContent, score, reasoning }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
      {/* Tweet Content Section */}
      <div className="w-full mb-6">
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <p className="text-black text-base">{tweetContent}</p>
        </div>
      </div>

      {/* Rating Section */}
      <div className="w-full flex flex-col items-center mb-6">
        <div className="w-24 h-24 mb-4">
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              textColor: '#333',
              pathColor: score > 50 ? '#4CAF50' : '#F44336',
              trailColor: '#d6d6d6',
              textSize: '16px',
              strokeLinecap: 'round',
            })}
          />
        </div>
        <p className="text-lg font-semibold text-gray-700">{score > 50 ? 'Positive Sentiment' : 'Negative Sentiment'}</p>
      </div>

      {/* Reasoning Section */}
      <div className="w-full bg-white rounded-lg p-4 border border-gray-200 text-gray-700 text-sm text-center">
        <p>{reasoning}</p>
      </div>
    </div>
  );
};
