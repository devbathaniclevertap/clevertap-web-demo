import React from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';

interface FunctionCardProps {
  icon: LucideIcon;
  label: string;
  isSelected: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export function FunctionCard({ icon: Icon, label, isSelected, isLoading, onClick }: FunctionCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        relative overflow-hidden rounded-xl p-4 sm:p-6 w-full
        transition-all duration-300 transform hover:scale-105
        ${isSelected 
          ? 'bg-red-500/20 border-red-400/30 shadow-xl' 
          : 'bg-white/5 hover:bg-white/10 border-white/10 shadow-md'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        group animate-fade-in backdrop-blur-md border
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        {isLoading ? (
          <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 animate-spin text-rose-300" />
        ) : (
          <Icon className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 text-rose-200" />
        )}
        <span className="text-base sm:text-lg font-medium text-center text-rose-100">{label}</span>
      </div>
    </button>
  );
}