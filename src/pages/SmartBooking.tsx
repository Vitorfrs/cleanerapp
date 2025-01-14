import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SmartScheduling } from '../components/scheduling/SmartScheduling';

export function SmartBooking() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSchedule = async (data: any) => {
    setLoading(true);
    try {
      // In a real app, call API to find and book cleaner
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/booking-confirmation');
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Smart Scheduling
        </h1>
        <p className="text-gray-600">
          Let us match you with the perfect cleaner based on your schedule and location
        </p>
      </div>

      <SmartScheduling
        onSchedule={handleSchedule}
        loading={loading}
      />
    </div>
  );
}