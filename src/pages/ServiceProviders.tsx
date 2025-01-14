import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProviderCard } from '../components/ProviderCard';
import type { ServiceProvider } from '../types';

const providers: ServiceProvider[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 4.8,
    reviewCount: 127,
    services: ['Home Cleaning', 'Office Cleaning'],
    pricePerDay: 60,
    description: 'Professional cleaner with 5+ years of experience. Specialized in eco-friendly cleaning solutions.',
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
  },
  {
    id: '2',
    name: 'Clean Pro Services',
    photo: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
    reviewCount: 243,
    services: ['Commercial', 'Office Cleaning'],
    pricePerDay: 120,
    description: 'Full-service commercial cleaning company with trained and certified staff.',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
];

export function ServiceProviders() {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = {
    '1': 'Home Cleaning',
    '2': 'Office Cleaning',
    '3': 'Commercial',
    '4': 'Vehicle Wash',
  }[id ?? ''] || 'Unknown Service';

  const filteredProviders = providers.filter(
    provider => provider.services.includes(service)
  );

  const handleBookNow = (providerId: string) => {
    navigate(`/booking/${providerId}`);
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

      <h1 className="text-2xl font-bold text-gray-900 mb-6">{service} Providers</h1>
      
      <div className="space-y-4">
        {filteredProviders.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            onBookNow={() => handleBookNow(provider.id)}
          />
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No providers available for this service.</p>
        </div>
      )}
    </div>
  );
}