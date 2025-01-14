import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Repeat, AlertCircle } from 'lucide-react';
import { AddressAutocomplete } from '../AddressAutocomplete';
import type { ServiceProvider } from '../../types';

interface SmartSchedulingProps {
  onSchedule: (data: SchedulingData) => void;
  loading?: boolean;
}

interface SchedulingData {
  date: string;
  time: string;
  address: string;
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';
  recurring: boolean;
}

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', 
  '13:00', '14:00', '15:00', '16:00'
];

export function SmartScheduling({ onSchedule, loading = false }: SmartSchedulingProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [frequency, setFrequency] = useState<SchedulingData['frequency']>('once');
  const [recurring, setRecurring] = useState(false);
  const [matchedProviders, setMatchedProviders] = useState<ServiceProvider[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({
      date,
      time,
      address,
      frequency,
      recurring
    });
  };

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Select Date</h3>
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          required
        />
      </div>

      {/* Time Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Select Time</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setTime(slot)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                time === slot
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Service Location</h3>
        </div>
        <AddressAutocomplete
          value={address}
          onChange={setAddress}
          placeholder="Enter your address"
          className="bg-gray-50"
        />
      </div>

      {/* Frequency */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Repeat className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Service Frequency</h3>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            id="recurring"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
          />
          <label htmlFor="recurring" className="text-gray-700">
            Make this a recurring service
          </label>
        </div>

        {recurring && (
          <div className="grid grid-cols-4 gap-2">
            {(['once', 'weekly', 'biweekly', 'monthly'] as const).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setFrequency(freq)}
                className={`p-3 rounded-lg text-sm font-medium capitalize transition-colors ${
                  frequency === freq
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Smart Matching Info */}
      {matchedProviders.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">
                {matchedProviders.length} cleaners available
              </p>
              <p className="text-green-600 text-sm mt-1">
                We'll match you with the best rated cleaner in your area
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !date || !time || !address}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Finding the best match...' : 'Schedule Service'}
      </button>
    </div>
  );
}