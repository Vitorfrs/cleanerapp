import React from 'react';
import { Sparkle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 sm:gap-3">
      <div className="relative w-8 h-8 sm:w-10 sm:h-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C4A484] to-[#B8997D] rounded-full opacity-20 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkle className="w-5 h-5 sm:w-6 sm:h-6 text-[#C4A484]" />
        </div>
        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#C4A484] to-[#B8997D] rounded-full opacity-20 blur-sm" />
      </div>
      <div>
        <h1 className="text-lg sm:text-xl tracking-wide text-gray-900">Cleaner Connect</h1>
      </div>
    </Link>
  );
}