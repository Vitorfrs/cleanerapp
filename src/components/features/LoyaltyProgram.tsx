import React from 'react';
import { Trophy, Gift, Percent, Star } from 'lucide-react';

interface LoyaltyTier {
  name: string;
  pointsRequired: number;
  benefits: string[];
  discount: number;
  icon: React.ElementType;
}

const tiers: LoyaltyTier[] = [
  {
    name: 'Bronze',
    pointsRequired: 0,
    benefits: ['5% off regular bookings', 'Priority support'],
    discount: 5,
    icon: Star
  },
  {
    name: 'Silver',
    pointsRequired: 1000,
    benefits: ['10% off regular bookings', 'Free supplies upgrade', 'Flexible rescheduling'],
    discount: 10,
    icon: Trophy
  },
  {
    name: 'Gold',
    pointsRequired: 5000,
    benefits: ['15% off all services', 'Premium cleaning products', 'Same-day service'],
    discount: 15,
    icon: Gift
  },
  {
    name: 'Platinum',
    pointsRequired: 10000,
    benefits: ['20% off everything', 'Dedicated account manager', 'Custom scheduling'],
    discount: 20,
    icon: Percent
  }
];

interface LoyaltyProgramProps {
  currentPoints: number;
  currentTier: string;
}

export function LoyaltyProgram({ currentPoints, currentTier }: LoyaltyProgramProps) {
  const nextTier = tiers.find(tier => tier.pointsRequired > currentPoints);
  const pointsToNext = nextTier ? nextTier.pointsRequired - currentPoints : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Rewards Status</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Current Points</span>
          <span className="text-2xl font-bold text-pink-500">{currentPoints}</span>
        </div>
        
        {nextTier && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
                style={{ width: `${(currentPoints / nextTier.pointsRequired) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {pointsToNext} points until {nextTier.name}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isCurrentTier = tier.name.toLowerCase() === currentTier.toLowerCase();
          const isLocked = tier.pointsRequired > currentPoints;

          return (
            <div
              key={tier.name}
              className={`p-4 rounded-xl border-2 transition-all ${
                isCurrentTier
                  ? 'border-pink-500 bg-pink-50'
                  : isLocked
                  ? 'border-gray-200 opacity-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isCurrentTier ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-gray-900">{tier.name}</span>
              </div>

              <ul className="space-y-2">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}