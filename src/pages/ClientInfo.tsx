import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Phone, ArrowRight } from 'lucide-react';
import { supabase } from '../services/supabase';

export function ClientInfo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const quoteData = location.state?.quoteData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Submitting quote:', { quoteData });

    try {
      // Prepare quote data
      const quotePayload = {
        client_name: name,
        client_email: email,
        client_phone: phone,
        service_type: quoteData.quoteData.serviceType,
        space_details: quoteData.quoteData.spaceDetails,
        cleaning_level: quoteData.quoteData.cleaningLevel,
        estimated_hours: quoteData.hours,
        status: 'pending',
        lead_status: 'new',
        lead_source: 'website',
        notes: quoteData.explanation,
        created_at: new Date().toISOString()
      };

      console.log('Quote payload:', quotePayload);

      const { error } = await supabase
        .from('quotes')
        .insert(quotePayload);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      navigate('/payment/new', { 
        state: { 
          ...quoteData,
          clientInfo: { name, email, phone }
        }
      });
    } catch (error) {
      console.error('Error saving quote:', error);
      alert('Failed to save quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h1>
      <p className="text-gray-600 mb-8">Please provide your contact details to proceed with the booking</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !name || !email || !phone}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : (
            <>
              Continue to Payment
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}