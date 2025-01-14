import React, { useState } from 'react';
import { Home, Briefcase, Building2, Car, Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ServiceCard } from './components/ServiceCard';
import { ProviderCard } from './components/ProviderCard';
import { Onboarding } from './components/Onboarding/Onboarding';
import type { Service, ServiceProvider } from './types';

const ONBOARDING_COMPLETED_KEY = 'onboarding_completed';

const services: Service[] = [
  { id: '1', name: 'Home Cleaning', icon: 'home', description: 'Regular house cleaning services' },
  { id: '2', name: 'Office Cleaning', icon: 'briefcase', description: 'Professional office cleaning' },
  { id: '3', name: 'Commercial', icon: 'building', description: 'Commercial space cleaning' },
  { id: '4', name: 'Vehicle Wash', icon: 'car', description: 'Car and vehicle washing services' },
];

const featuredProviders: ServiceProvider[] = [
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

const iconMap = {
  home: Home,
  briefcase: Briefcase,
  building: Building2,
  car: Car,
};

function App() {
  const [showOnboarding, setShowOnboarding] = useState(
    !localStorage.getItem(ONBOARDING_COMPLETED_KEY)
  );

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    setShowOnboarding(false);
  };

  const handleServiceClick = (serviceId: string) => {
    console.log('Service clicked:', serviceId);
  };

  const handleBookNow = (providerId: string) => {
    console.log('Book now clicked:', providerId);
  };

  return (
    showOnboarding ? (
      <Onboarding onComplete={handleOnboardingComplete} />
    ) : (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
        {/* Header */}
        <Header />

        {/* Search */}
        <SearchBar />

        {/* Services */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Our Services</h2>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                icon={iconMap[service.icon as keyof typeof iconMap]}
                onClick={() => handleServiceClick(service.id)}
              />
            ))}
          </div>
        </div>

        {/* Featured Providers */}
        <div className="mt-6 sm:mt-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Featured Providers</h2>
            <button className="text-pink-500 font-medium hover:text-pink-600 transition-colors">
              View all
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {featuredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onBookNow={() => handleBookNow(provider.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  );
}

export default App;
