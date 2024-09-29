import React from 'react';

const AnalysisContainer = ({ score, reason }: { score: number; reason: string }) => (
  <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-4 w-full max-w-md text-charcoal">
    <h2 className="text-2xl font-bold mb-2">Sentiment Score: {score}</h2>
    <p>{reason}</p>
  </div>
);

export default AnalysisContainer;
