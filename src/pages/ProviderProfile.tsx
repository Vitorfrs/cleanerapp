import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';

export function ProviderProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, fetch provider data based on id
  const provider = {
    id,
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviewCount: 127,
    services: ['Home Cleaning', 'Office Cleaning'],
    pricePerDay: 60,
    description: 'Professional cleaner with 5+ years of experience. Specialized in eco-friendly cleaning solutions.',
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    location: '123 Main St, New York, NY',
    workingHours: '8:00 AM - 6:00 PM',
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

      <div className="relative rounded-xl overflow-hidden h-48 sm:h-64 mb-4">
        <img
          src={provider.photo}
          alt={provider.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="text-gray-600">
            {provider.rating} ({provider.reviewCount} reviews)
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{provider.location}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>{provider.workingHours}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>{provider.availability.join(', ')}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Services</h2>
          <div className="flex flex-wrap gap-2">
            {provider.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
          <p className="text-gray-600">{provider.description}</p>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-pink-500">${provider.pricePerDay}</p>
            <p className="text-gray-500">per day</p>
          </div>
          <button
            onClick={() => navigate(`/booking/${provider.id}`)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}