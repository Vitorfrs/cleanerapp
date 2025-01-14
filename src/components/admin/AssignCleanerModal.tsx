import React, { useState, useEffect } from 'react';
import { X, Search, Calendar, Clock } from 'lucide-react';
import { assignCleaner } from '../../services/cleanerAssignment';
import { createAssignmentStatus } from '../../services/assignmentStatus';
import type { ServiceProvider } from '../../types';

interface AssignCleanerModalProps {
  quoteId: string;
  onClose: () => void;
  onAssigned: () => void;
}

export function AssignCleanerModal({ quoteId, onClose, onAssigned }: AssignCleanerModalProps) {
  const [cleaners, setCleaners] = useState<ServiceProvider[]>([]);
  const [selectedCleaner, setSelectedCleaner] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real app, fetch available cleaners based on quote details
    // For now, using mock data
    setCleaners([
      {
        id: 'e9b6c2a1-7654-3210-fedc-ba9876543210',
        name: 'Sarah Johnson',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        rating: 4.8,
        reviewCount: 127,
        services: ['Home Cleaning', 'Office Cleaning'],
        pricePerDay: 60,
        description: 'Professional cleaner with 5+ years of experience',
        availability: ['Monday', 'Tuesday', 'Thursday', 'Friday']
      }
    ]);
  }, [quoteId]);

  const filteredCleaners = cleaners.filter(cleaner =>
    cleaner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = async () => {
    if (!selectedCleaner || !scheduledDate || !scheduledTime) return;

    const formattedDate = new Date(scheduledDate).toISOString().split('T')[0];

    setLoading(true);
    try {
      // First create the assignment
      const result = await assignCleaner({
        quoteId,
        cleanerId: selectedCleaner,
        scheduledDate: formattedDate,
        scheduledTime
      });

      if (result.success) {
        onAssigned();
        onClose();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Assignment failed:', error);
      alert('Failed to assign cleaner. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Assign Cleaner</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cleaners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            />
          </div>

          {/* Cleaner List */}
          <div className="grid grid-cols-1 gap-4 max-h-60 overflow-y-auto">
            {filteredCleaners.map((cleaner) => (
              <button
                key={cleaner.id}
                onClick={() => setSelectedCleaner(cleaner.id)}
                className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                  selectedCleaner === cleaner.id
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-100 hover:border-pink-200'
                }`}
              >
                <img
                  src={cleaner.photo}
                  alt={cleaner.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{cleaner.name}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    Rating: {cleaner.rating} ({cleaner.reviewCount} reviews)
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cleaner.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleAssign}
            disabled={loading || !selectedCleaner || !scheduledDate || !scheduledTime}
            className="w-full bg-[#C4A484] hover:bg-[#B8997D] text-white py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Assigning...' : 'Assign Cleaner'}
          </button>
        </div>
      </div>
    </div>
  );
}