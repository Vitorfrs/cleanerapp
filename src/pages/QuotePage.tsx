import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { QuoteForm } from '../components/QuoteFlow/QuoteForm';

const serviceNames: Record<string, string> = {
  '1': 'Residential Cleaning',
  '2': 'Commercial Cleaning',
  '3': 'House Keeping'
};

interface QuoteResult {
  hours: number;
  explanation: string;
  quoteData?: {
    spaceDetails: any;
    cleaningLevel: string;
    serviceType: string;
    frequency: string;
  };
}

export function QuotePage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

  const serviceName = serviceId ? serviceNames[serviceId] : 'Unknown Service';

  const handleQuoteGenerated = (hours: number, explanation: string, quoteData: any) => {
    setQuoteResult({ 
      hours, 
      explanation,
      quoteData: {
        ...quoteData,
        serviceType: serviceName
      }
    });
  };

  const handleContinue = () => {
    navigate('/client-info', { 
      state: { 
        quoteData: quoteResult
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto pt-40 pb-20 px-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-12 hover:text-[#C4A484] transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-serif text-gray-900 mb-4">
        Get a Quote for {serviceName}
      </h1>
      <p className="text-gray-600 mb-16">
        Fill in the details below and upload photos of your space for an AI-powered instant quote
      </p>

      {!quoteResult ? (
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <QuoteForm
            serviceType={serviceName}
            onQuoteGenerated={handleQuoteGenerated}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-[#C4A484]" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Estimated Time: {quoteResult.hours} hours
              </h2>
              <p className="text-gray-600">
                ${(quoteResult.hours * 40).toFixed(2)} (at $40/hour)
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Analysis Details</h3>
            <p className="text-gray-600">{quoteResult.explanation}</p>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
            >
              Book Now
            </button>
            <button
              onClick={() => setQuoteResult(null)}
              className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              Get Another Quote
            </button>
          </div>
        </div>
      )}
    </div>
  );
}