import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { AddressAutocomplete } from '../components/AddressAutocomplete';

export function Booking() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, create booking and get bookingId
    const bookingId = 'test-booking-id';
    navigate(`/payment/${bookingId}`);
  };

  return (
    <div className="pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Select Date</h2>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            required
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Select Time</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  selectedTime === time
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Address</h2>
          </div>
          <AddressAutocomplete
            value={address}
            onChange={setAddress}
            placeholder="Start typing your address..."
            className="bg-gray-50"
          />
        </div>
      </form>

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}