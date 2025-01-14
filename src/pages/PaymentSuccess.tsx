import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar } from 'lucide-react';

export function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Your booking has been confirmed. We've sent the details to your email.
        </p>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
            <Calendar className="w-5 h-5" />
            <span>Booking #12345</span>
          </div>
          <p className="text-sm text-gray-500">
            You can view your booking details and track the service status in your bookings page.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/bookings')}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}