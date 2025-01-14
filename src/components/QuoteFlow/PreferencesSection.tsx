import React from 'react';
import { Sun, Moon, Sunrise, Box, Leaf, Key, Clipboard, Shield, Clock, Calendar } from 'lucide-react';

interface PreferencesSectionProps {
  preferences: {
    timePreference: string;
    providesEquipment: boolean;
    ecoFriendly: boolean;
    isEndOfLease: boolean;
    houseKeepingLevel: 'none' | 'basic' | 'full';
    securityAccess?: boolean;
    afterHoursService?: boolean;
    regularSchedule?: boolean;
  };
  spaceType: string;
  onPreferenceChange: (field: keyof PreferencesSectionProps['preferences'], value: any) => void;
}

export function PreferencesSection({ preferences, spaceType, onPreferenceChange }: PreferencesSectionProps) {
  const timeSlots = [
    { id: 'morning', label: 'Morning', icon: Sunrise, time: '8AM - 12PM' },
    { id: 'afternoon', label: 'Afternoon', icon: Sun, time: '12PM - 4PM' },
    { id: 'evening', label: 'Evening', icon: Moon, time: '4PM - 8PM' },
  ];

  const isCommercial = spaceType.startsWith('commercial-');

  return (
    <div className="space-y-6">
      {/* Time Preference */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Preferred Time</h3>
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map(({ id, label, icon: Icon, time }) => (
            <button
              key={id}
              onClick={() => onPreferenceChange('timePreference', id)}
              className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                preferences.timePreference === id
                  ? 'bg-pink-50 border-2 border-pink-500'
                  : 'bg-white border-2 border-gray-100 hover:border-pink-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${
                preferences.timePreference === id ? 'text-pink-500' : 'text-gray-400'
              }`} />
              <div className="text-center">
                <span className="block text-sm font-medium">{label}</span>
                <span className="text-xs text-gray-500">{time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Equipment & Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <button
          onClick={() => onPreferenceChange('providesEquipment', !preferences.providesEquipment)}
          className={`flex-1 p-4 rounded-xl flex items-center gap-3 transition-all ${
            preferences.providesEquipment
              ? 'bg-pink-50 border-2 border-pink-500'
              : 'bg-white border-2 border-gray-100 hover:border-pink-200'
          }`}
        >
          <Box className={`w-5 h-5 ${
            preferences.providesEquipment ? 'text-pink-500' : 'text-gray-400'
          }`} />
          <div className="text-left">
            <span className="block text-sm font-medium">Equipment Provided</span>
            <span className="text-xs text-gray-500">I'll provide cleaning supplies</span>
          </div>
        </button>

        <button
          onClick={() => onPreferenceChange('ecoFriendly', !preferences.ecoFriendly)}
          className={`flex-1 p-4 rounded-xl flex items-center gap-3 transition-all ${
            preferences.ecoFriendly
              ? 'bg-pink-50 border-2 border-pink-500'
              : 'bg-white border-2 border-gray-100 hover:border-pink-200'
          }`}
        >
          <Leaf className={`w-5 h-5 ${
            preferences.ecoFriendly ? 'text-pink-500' : 'text-gray-400'
          }`} />
          <div className="text-left">
            <span className="block text-sm font-medium">Eco-Friendly</span>
            <span className="text-xs text-gray-500">Use green cleaning products</span>
          </div>
        </button>

        <button
          onClick={() => onPreferenceChange('isEndOfLease', !preferences.isEndOfLease)}
          className={`flex-1 p-4 rounded-xl flex items-center gap-3 transition-all ${
            preferences.isEndOfLease
              ? 'bg-pink-50 border-2 border-pink-500'
              : 'bg-white border-2 border-gray-100 hover:border-pink-200'
          }`}
        >
          <Key className={`w-5 h-5 ${
            preferences.isEndOfLease ? 'text-pink-500' : 'text-gray-400'
          }`} />
          <div className="text-left">
            <span className="block text-sm font-medium">End of Lease</span>
            <span className="text-xs text-gray-500">Property handover cleaning</span>
          </div>
        </button>
      </div>
      
      {/* Commercial-specific preferences */}
      {isCommercial && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <button
            onClick={() => onPreferenceChange('securityAccess', !preferences.securityAccess)}
            className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
              preferences.securityAccess
                ? 'bg-pink-50 border-2 border-pink-500'
                : 'bg-white border-2 border-gray-100 hover:border-pink-200'
            }`}
          >
            <Shield className={`w-5 h-5 ${
              preferences.securityAccess ? 'text-pink-500' : 'text-gray-400'
            }`} />
            <div className="text-left">
              <span className="block text-sm font-medium">Security Access</span>
              <span className="text-xs text-gray-500">Secure entry protocol</span>
            </div>
          </button>

          <button
            onClick={() => onPreferenceChange('afterHoursService', !preferences.afterHoursService)}
            className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
              preferences.afterHoursService
                ? 'bg-pink-50 border-2 border-pink-500'
                : 'bg-white border-2 border-gray-100 hover:border-pink-200'
            }`}
          >
            <Clock className={`w-5 h-5 ${
              preferences.afterHoursService ? 'text-pink-500' : 'text-gray-400'
            }`} />
            <div className="text-left">
              <span className="block text-sm font-medium">After Hours</span>
              <span className="text-xs text-gray-500">Service outside business hours</span>
            </div>
          </button>

          <button
            onClick={() => onPreferenceChange('regularSchedule', !preferences.regularSchedule)}
            className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
              preferences.regularSchedule
                ? 'bg-pink-50 border-2 border-pink-500'
                : 'bg-white border-2 border-gray-100 hover:border-pink-200'
            }`}
          >
            <Calendar className={`w-5 h-5 ${
              preferences.regularSchedule ? 'text-pink-500' : 'text-gray-400'
            }`} />
            <div className="text-left">
              <span className="block text-sm font-medium">Regular Schedule</span>
              <span className="text-xs text-gray-500">Fixed cleaning schedule</span>
            </div>
          </button>
        </div>
      )}

      {/* House Keeping Level - Only show for residential */}
      {!isCommercial && (
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">House Keeping Level</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onPreferenceChange('houseKeepingLevel', 'none')}
            className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
              preferences.houseKeepingLevel === 'none'
                ? 'bg-pink-50 border-2 border-pink-500'
                : 'bg-white border-2 border-gray-100 hover:border-pink-200'
            }`}
          >
            <span className="text-sm font-medium">No House Keeping</span>
          </button>
          
          <button
            onClick={() => onPreferenceChange('houseKeepingLevel', 'basic')}
            className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
              preferences.houseKeepingLevel === 'basic'
                ? 'bg-pink-50 border-2 border-pink-500'
                : 'bg-white border-2 border-gray-100 hover:border-pink-200'
            }`}
          >
            <Clipboard className={`w-5 h-5 ${
              preferences.houseKeepingLevel === 'basic' ? 'text-pink-500' : 'text-gray-400'
            }`} />
            <div className="text-left">
              <span className="block text-sm font-medium">Basic House Keeping</span>
              <span className="text-xs text-gray-500">Essential maintenance tasks</span>
            </div>
          </button>
          
          <button
            onClick={() => onPreferenceChange('houseKeepingLevel', 'full')}
            className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
              preferences.houseKeepingLevel === 'full'
                ? 'bg-pink-50 border-2 border-pink-500'
                : 'bg-white border-2 border-gray-100 hover:border-pink-200'
            }`}
          >
            <Clipboard className={`w-5 h-5 ${
              preferences.houseKeepingLevel === 'full' ? 'text-pink-500' : 'text-gray-400'
            }`} />
            <div className="text-left">
              <span className="block text-sm font-medium">Full House Keeping</span>
              <span className="text-xs text-gray-500">Complete maintenance service</span>
            </div>
          </button>
        </div>
      </div>
      )}
    </div>
  );
}