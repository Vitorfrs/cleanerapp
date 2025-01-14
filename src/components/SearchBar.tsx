import React from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="bg-white p-2 rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for services..."
            className="w-full pl-10 pr-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all text-sm"
          />
        </div>
        <div className="flex-1 relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Location"
            className="w-full pl-10 pr-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all text-sm"
          />
        </div>
        <div className="flex-1 relative col-span-2 sm:col-span-1">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Select date"
            className="w-full pl-10 pr-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all text-sm"
          />
        </div>
        <button className="col-span-2 sm:col-span-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
          Search
        </button>
      </div>
    </div>
  );
}