import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-8 transform transition-all duration-300 hover:shadow-2xl">
      {children}
    </div>
  );
}