import React from 'react';
import { ExecuteButton } from './ExecuteButton';
import { ResultDisplay } from './ResultDisplay';

interface FunctionExecutorProps {
  selectedFunction: string;
  onExecute: () => Promise<void>;
  result: string | null;
  isAnimating: boolean;
  isLoading: boolean;
}

export function FunctionExecutor({ 
  selectedFunction, 
  onExecute, 
  result, 
  isAnimating,
  isLoading 
}: FunctionExecutorProps) {
  if (!selectedFunction) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <ExecuteButton
        functionName={selectedFunction}
        onClick={onExecute}
        isLoading={isLoading}
      />
      <ResultDisplay result={result} isAnimating={isAnimating} />
    </div>
  );
}