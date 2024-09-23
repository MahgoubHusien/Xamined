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
  // Determine colors based on score
  const isPositive = score > 50;
  const progressColor = isPositive ? '#4CAF50' : '#F44336';
  const sentimentLabel = isPositive ? 'Positive Sentiment' : 'Negative Sentiment';

  return (
    <div className="flex flex-col items-center justify-center bg-neutral-900 rounded-lg shadow-lg p-4 w-full max-w-sm text-white">
      {/* Score Section */}
      <div className="w-20 h-20 mb-4">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textColor: '#fff',
            pathColor: progressColor,
            trailColor: '#444',
            textSize: '16px',
            strokeLinecap: 'round',
          })}
        />
      </div>
      {/* Sentiment Label */}
      <p className="text-lg font-semibold mb-4">{sentimentLabel}</p>
      {/* Reasoning Section */}
      <div className="w-full bg-neutral-800 rounded-lg p-4 border border-neutral-700 text-sm text-center">
        <p>{reasoning}</p>
      </div>
    </div>
  );
};
