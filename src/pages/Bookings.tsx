import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { Booking } from '../types';

const bookings: Booking[] = [
  {
    id: 'booking-1',
    providerId: '1',
    clientId: 'client-1',
    serviceType: 'Home Cleaning',
    date: '2024-03-25',
    status: 'confirmed',
    price: 60,
    location: {
      address: '123 Main St, New York, NY',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    }
  }
];

export function Bookings() {
  return (
    <div className="pb-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{booking.serviceType}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>2:00 PM</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{booking.location.address}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-gray-600">Total</span>
              <span className="font-semibold text-gray-900">${booking.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}