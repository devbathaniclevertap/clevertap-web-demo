import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FunctionSelectorProps {
  selectedFunction: string;
  onFunctionSelect: (func: string) => void;
}

const functions = [
  'getClevertapId',
  'onUserLogin',
  'recordEvent'
];

export function FunctionSelector({ selectedFunction, onFunctionSelect }: FunctionSelectorProps) {
  return (
    <div className="relative w-full max-w-xs mx-auto">
      <select
        value={selectedFunction}
        onChange={(e) => onFunctionSelect(e.target.value)}
        className="w-full px-4 py-2 text-white bg-red-600 rounded-lg appearance-none cursor-pointer hover:bg-red-700 transition-colors duration-200"
      >
        <option value="" disabled>Select Function</option>
        {functions.map((func) => (
          <option key={func} value={func}>
            {func}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
    </div>
  );
}