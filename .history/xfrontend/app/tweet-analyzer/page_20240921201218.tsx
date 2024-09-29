"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';

import Chatbot from '@/components/chatbot';

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const tweetLink = searchParams.get('tweetLink') || '1629307668568633344';

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-charcoal p-4">
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col lg:w-2/3">
          <AnalysisContainer score={8.5} reason="Positive sentiment observed based on the overall reaction." />
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
