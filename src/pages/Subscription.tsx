import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SubscriptionPlans } from '../components/features/SubscriptionPlans';
import { LoyaltyProgram } from '../components/features/LoyaltyProgram';

export function Subscription() {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="max-w-6xl mx-auto">
        <SubscriptionPlans />
        
        <div className="px-4 mt-8">
          <LoyaltyProgram 
            currentPoints={750}
            currentTier="bronze"
          />
        </div>
      </div>
    </div>
  );
}