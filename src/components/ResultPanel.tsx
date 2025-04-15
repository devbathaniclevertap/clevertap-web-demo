import React from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultPanelProps {
  result: string | null;
  isLoading: boolean;
}

export function ResultPanel({ result, isLoading }: ResultPanelProps) {
  if (!result && !isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg border border-white/10"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-rose-300 animate-spin" />
            <p className="text-sm sm:text-base text-rose-200">Executing function...</p>
          </>
        ) : result?.includes('Error') ? (
          <>
            <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
            <p className="text-sm sm:text-base text-red-400">{result}</p>
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-300" />
            <p className="text-sm sm:text-base text-rose-300">{result}</p>
          </>
        )}
      </div>
    </motion.div>
  );
}