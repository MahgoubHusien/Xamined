// components/RatingWithReasoning.tsx
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Define the properties that this component will accept
interface RatingWithReasoningProps {
  tweetContent: string;
  score: number; // Score should be a percentage between 0 and 100
  reasoning: string;
}

export const RatingWithReasoning: React.FC<RatingWithReasoningProps> = ({ tweetContent, score, reasoning }) => {
  return (
    <div className="flex flex-row items-center justify-center bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
      {/* Tweet Content Section */}
      <div className="w-2/3 pr-6">
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <p className="text-black text-base">{tweetContent}</p>
        </div>
      </div>

      {/* Rating and Reasoning Section */}
      <div className="w-1/3 flex flex-col items-center">
        {/* Circular Progress Bar */}
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
        {/* Reasoning Section */}
        <div className="text-gray-700 text-sm text-center">
          <p>{reasoning}</p>
        </div>
      </div>
    </div>
  );
};
