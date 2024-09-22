// components/CircularProgress.tsx
import React from 'react';

type Props = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
};

const CircularProgress = ({
  percentage,
  size = 100,
  strokeWidth = 10,
  color = '#4CAF50',
}: Props) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="mx-auto">
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-300"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="1.5rem"
        fontWeight="bold"
        fill={color}
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgress;
