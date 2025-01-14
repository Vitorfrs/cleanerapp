import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  TrendingUp,
  Award,
  Shield,
  Briefcase,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';
import type { Cleaner } from '../../types/admin';

// Mock data for different cleaners
const mockCleaners: Record<string, Cleaner> = {
 '1': {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  phone: '+1 234-567-8901',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  services: ['Residential', 'Commercial'],
  rating: 4.8,
  availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
  status: 'available',
  activeBookings: 2,
  completedJobs: 156,
  verificationStatus: {
    backgroundCheck: true,
    identityVerified: true,
    trainingCompleted: true
  },
  recentReviews: [
    {
      id: '1',
      rating: 5,
      comment: 'Excellent service! Very thorough and professional.',
      clientName: 'John D.',
      date: '2024-03-15'
    },
    {
      id: '2',
      rating: 5,
      comment: 'Sarah is amazing! My house has never been cleaner.',
      clientName: 'Emma S.',
      date: '2024-03-10'
    }
  ],
  performanceMetrics: {
    onTimeRate: 98,
    satisfactionRate: 96,
    returnClientRate: 85
  }
 },
 '2': {
  id: '2',
  name: 'Michael Chen',
  email: 'michael@example.com',
  phone: '+1 234-567-8902',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  services: ['Residential', 'House Keeping'],
  rating: 4.9,
  availability: ['Monday', 'Wednesday', 'Friday'],
  status: 'busy',
  activeBookings: 1,
  completedJobs: 89,
  verificationStatus: {
    backgroundCheck: true,
    identityVerified: true,
    trainingCompleted: false
  },
  recentReviews: [
    {
      id: '1',
      rating: 5,
      comment: 'Michael is very professional and detail-oriented.',
      clientName: 'Alice R.',
      date: '2024-03-18'
    },
    {
      id: '2',
      rating: 4,
      comment: 'Great work overall, very reliable.',
      clientName: 'Bob M.',
      date: '2024-03-14'
    }
  ],
  performanceMetrics: {
    onTimeRate: 95,
    satisfactionRate: 94,
    returnClientRate: 82
  }
 }
};

export function CleanerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const cleaner = id ? mockCleaners[id] : null;

  if (!cleaner) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          Cleaner not found
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Completed Jobs', value: cleaner.completedJobs, icon: CheckCircle },
    { label: 'Active Bookings', value: cleaner.activeBookings, icon: Calendar },
    { label: 'Rating', value: cleaner.rating, icon: Star },
    { label: 'Success Rate', value: `${cleaner.performanceMetrics.satisfactionRate}%`, icon: TrendingUp }
  ];

  const verificationItems = [
    { label: 'Background Check', verified: cleaner.verificationStatus.backgroundCheck, icon: Shield },
    { label: 'Identity Verified', verified: cleaner.verificationStatus.identityVerified, icon: Briefcase },
    { label: 'Training Completed', verified: cleaner.verificationStatus.trainingCompleted, icon: Award }
  ];

  return (
    <div className="p-4 sm:p-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Cleaners</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="relative h-40 sm:h-48 bg-gradient-to-r from-pink-500 to-purple-500">
          <div className="absolute -bottom-16 left-4 sm:left-6 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
            <div className="relative">
            <img
              src={cleaner.photo}
              alt={cleaner.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-4 border-white shadow-sm"
            />
              <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-lg ${
                cleaner.status === 'available' ? 'bg-green-500' : 'bg-yellow-500'
              } text-white flex items-center justify-center`}>
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mb-4 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{cleaner.name}</h1>
              <div className="flex items-center gap-2 text-white/90">
                <Star className="w-4 h-4 fill-current" />
                <span>{cleaner.rating} rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-24 sm:pt-20 p-4 sm:p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4 bg-gray-50 rounded-xl">
                <stat.icon className="w-6 h-6 text-pink-500 mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact & Availability */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                    <Mail className="w-5 h-5" />
                    <span className="break-all">{cleaner.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>{cleaner.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>New York, NY</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cleaner.availability.map((day) => (
                    <div key={day} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-pink-500" />
                    <span className="font-medium text-gray-900">On-Time Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{cleaner.performanceMetrics.onTimeRate}%</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ThumbsUp className="w-5 h-5 text-pink-500" />
                    <span className="font-medium text-gray-900">Satisfaction</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{cleaner.performanceMetrics.satisfactionRate}%</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-pink-500" />
                    <span className="font-medium text-gray-900">Return Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{cleaner.performanceMetrics.returnClientRate}%</div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h2>
              <div className="space-y-3">
                {verificationItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <item.icon className={`w-5 h-5 ${item.verified ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className={`font-medium ${item.verified ? 'text-gray-900' : 'text-gray-500'}`}>
                      {item.label}
                    </span>
                    {item.verified ? (
                      <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Services & Achievements */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Services</h2>
                <div className="grid grid-cols-2 gap-2">
                  {cleaner.services.map((service) => (
                    <div key={service} className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="w-5 h-5 text-pink-500" />
                    <div>
                      <div className="font-medium text-gray-900">Top Rated Cleaner</div>
                      <div className="text-sm text-gray-600">Maintained 4.8+ rating for 6 months</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-pink-500" />
                    <div>
                      <div className="font-medium text-gray-900">100+ Jobs Completed</div>
                      <div className="text-sm text-gray-600">Successfully completed over 100 bookings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="lg:col-span-2 mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cleaner.recentReviews.map((review) => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString(undefined, { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{review.comment}</p>
                    <p className="text-sm text-gray-500">- {review.clientName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}