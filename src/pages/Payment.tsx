import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';

export function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, process payment
    navigate('/payment-success');
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

      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-6 h-6 text-gray-900" />
        <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              required
            />
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              required
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Cardholder Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            required
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
          <Lock className="w-4 h-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </form>

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}