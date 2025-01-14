import React from 'react';
import { Star } from 'lucide-react';
import { ServiceProvider } from '../types';

interface ProviderCardProps {
  provider: ServiceProvider;
  onBookNow: () => void;
}

export function ProviderCard({ provider, onBookNow }: ProviderCardProps) {
  return (
    <div className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md p-3 sm:p-4 transition-all duration-300">
      <div className="flex items-start gap-2 sm:gap-3">
        <img
          src={provider.photo}
          alt={provider.name}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl object-cover shadow-sm group-hover:scale-102 transition-transform duration-300"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-base sm:text-lg text-gray-900">{provider.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">
              {provider.rating.toFixed(1)} ({provider.reviewCount} reviews)
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
            {provider.services.map((service) => (
              <span key={service} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                {service}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg sm:text-xl font-bold text-pink-500">${provider.pricePerDay}</p>
          <p className="text-gray-500 text-xs sm:text-sm">per day</p>
        </div>
      </div>
      
      <p className="mt-2 sm:mt-3 text-gray-600 text-xs sm:text-sm leading-relaxed">{provider.description}</p>
      
      <div className="mt-3 sm:mt-4 flex gap-2">
        <button
          onClick={onBookNow}
          className="flex-1 bg-[#C4A484] hover:bg-[#B8997D] text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 text-sm"
        >
          Book Now
        </button>
        <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all text-sm">
          View Profile
        </button>
      </div>
      <div className="mt-2 sm:mt-3 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Available today
        </div>
        <span className="text-xs">{provider.availability.join(', ')}</span>
      </div>
    </div>
  );
}