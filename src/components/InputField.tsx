import React from 'react';
import { motion } from 'framer-motion';

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function InputField({ 
  label, 
  placeholder, 
  type = 'text', 
  value, 
  onChange,
  error 
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
      <label className="text-sm font-medium text-rose-200">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg 
          bg-white/5 border text-rose-100
          focus:ring-2 outline-none 
          transition-all duration-200 placeholder:text-rose-200/30 backdrop-blur-md
          ${error 
            ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' 
            : 'border-white/10 focus:border-red-400/30 focus:ring-red-400/20'
          }
        `}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xs text-red-400 mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}