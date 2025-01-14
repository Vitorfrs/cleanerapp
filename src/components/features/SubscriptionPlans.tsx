import React from 'react';
import { Check, Star, Building2, Home } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  icon: React.ElementType;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 149,
    description: 'Perfect for regular home maintenance',
    icon: Home,
    features: [
      'Monthly deep cleaning',
      '10% off additional services',
      'Standard cleaning supplies',
      'Weekend availability',
      'Basic support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 249,
    description: 'Enhanced cleaning experience',
    icon: Star,
    popular: true,
    features: [
      'Bi-weekly cleaning',
      '20% off additional services',
      'Premium eco-friendly supplies',
      'Priority scheduling',
      '24/7 premium support',
      'Same-day service available',
      'Satisfaction guarantee'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    price: 599,
    description: 'Tailored for commercial spaces',
    icon: Building2,
    features: [
      'Weekly cleaning service',
      'Customized cleaning plan',
      'Commercial-grade supplies',
      'Dedicated account manager',
      'Quality assurance reports',
      'Emergency cleaning service',
      'Multi-location support'
    ]
  }
];

export function SubscriptionPlans() {
  return (
    <div className="py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Perfect Plan
        </h2>
        <p className="text-gray-600">
          Subscribe to regular cleaning services and save while maintaining a consistently clean space
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          
          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-sm transition-all hover:shadow-lg ${
                plan.popular ? 'border-2 border-pink-500' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-pink-500" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-pink-500 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-medium transition-colors ${
                    plan.popular
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}