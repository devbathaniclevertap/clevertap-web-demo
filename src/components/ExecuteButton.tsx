import React from 'react';
import { Play } from 'lucide-react';

interface ExecuteButtonProps {
  functionName: string;
  onClick: () => void;
  isLoading?: boolean;
}

export function ExecuteButton({ functionName, onClick, isLoading = false }: ExecuteButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="group flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Play className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
      {isLoading ? 'Executing...' : `Execute ${functionName}`}
    </button>
  );
}