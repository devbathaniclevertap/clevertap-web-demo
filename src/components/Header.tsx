import React from 'react';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-3 justify-center">
      <Sparkles className="w-8 h-8 text-red-600 animate-pulse" />
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Welcome to CleverTap Testing
      </h1>
    </div>
  );
}