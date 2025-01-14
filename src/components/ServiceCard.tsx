import React from 'react';
import { Service } from '../types';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  icon: LucideIcon;
  onClick: () => void;
  isSelected?: boolean;
}

export function ServiceCard({ service, icon: Icon, onClick, isSelected }: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
        isSelected
          ? 'border-[#C4A484] bg-white shadow-lg transform hover:shadow-xl'
          : 'border-gray-100 bg-white hover:border-[#C4A484] hover:shadow-lg hover:bg-[#C4A484]/10'
      }`}
    >
      <div className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl mb-3 transition-all duration-300 ${
        isSelected
          ? 'bg-[#C4A484]'
          : 'bg-gray-50 group-hover:bg-[#C4A484]/20'
      }`}>
        <Icon className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors ${
          isSelected ? 'text-white' : 'text-[#C4A484]'
        }`} />
      </div>
      <span className={`text-base sm:text-lg font-medium ${
        isSelected ? 'text-[#C4A484]' : 'text-gray-700'
      }`}>
        {service.name}
      </span>
      <p className="text-sm text-gray-500 mt-2 transition-opacity duration-300">
        {service.description}
      </p>
    </button>
  );
}