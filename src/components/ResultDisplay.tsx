import React from 'react';

interface ResultDisplayProps {
  result: string | null;
  isAnimating: boolean;
}

export function ResultDisplay({ result, isAnimating }: ResultDisplayProps) {
  if (!result) return null;

  return (
    <div
      className={`bg-red-50 p-4 rounded-lg w-full text-center transition-opacity duration-300 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <p className="text-red-800">{result}</p>
    </div>
  );
}