import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Star, Calendar, Phone } from 'lucide-react';
import type { Cleaner } from '../../types/admin';

// Temporary mock data
const mockCleaners: Cleaner[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 234-567-8901',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    services: ['Residential', 'Commercial'],
    rating: 4.8,
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    status: 'available',
    activeBookings: 2,
    completedJobs: 156
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1 234-567-8902',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    services: ['Residential', 'House Keeping'],
    rating: 4.9,
    availability: ['Monday', 'Wednesday', 'Friday'],
    status: 'busy',
    activeBookings: 1,
    completedJobs: 89
  }
];

export function Cleaners() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Cleaner['status'] | 'all'>('all');
  const navigate = useNavigate();

  const filteredCleaners = mockCleaners.filter(cleaner => {
    const matchesSearch = 
      cleaner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cleaner.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || cleaner.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Cleaner['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'busy':
        return 'bg-yellow-100 text-yellow-700';
      case 'offline':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cleaners</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cleaners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Cleaner['status'] | 'all')}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
          <button className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
            <Plus className="w-5 h-5" />
            Add Cleaner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredCleaners.map((cleaner) => (
          <div key={cleaner.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <img
                src={cleaner.photo}
                alt={cleaner.name}
                className="w-20 h-20 rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cleaner.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{cleaner.rating}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cleaner.status)}`}>
                    {cleaner.status.charAt(0).toUpperCase() + cleaner.status.slice(1)}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    {cleaner.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {cleaner.availability.join(', ')}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {cleaner.services.map((service) => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm">
                    <span className="text-gray-500">Active Bookings: </span>
                    <span className="font-medium text-gray-900">{cleaner.activeBookings}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Completed Jobs: </span>
                    <span className="font-medium text-gray-900">{cleaner.completedJobs}</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/admin/cleaners/${cleaner.id}`)}
                    className="text-sm font-medium text-pink-500 hover:text-pink-600"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredCleaners.length === 0 && (
          <div className="col-span-2 p-8 text-center text-gray-500 bg-white rounded-xl">
            No cleaners found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}