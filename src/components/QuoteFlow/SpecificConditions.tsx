import React from 'react';
import { AlertTriangle, ArrowUp, Car, Calendar } from 'lucide-react';

interface SpecificConditionsProps {
  conditions: {
    dirtLevel: 'normal' | 'heavy';
    hasHighAreas: boolean;
    hasParking: boolean;
    urgentService: boolean;
  };
  onConditionChange: (field: keyof SpecificConditionsProps['conditions'], value: any) => void;
}

export function SpecificConditions({ conditions, onConditionChange }: SpecificConditionsProps) {
  return (
    <div className="space-y-6">
      {/* Dirt Level */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Space Condition</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onConditionChange('dirtLevel', 'normal')}
            className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
              conditions.dirtLevel === 'normal'
                ? 'bg-pink-50 border-2 border-pink-500'
                : 'bg-white border-2 border-gray-100 hover:border-pink-200'
            }`}
          >
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-medium">Normal Cleaning</span>
          </button>
          
          <button
            onClick={() => onConditionChange('dirtLevel', 'heavy')}
            className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
              conditions.dirtLevel === 'heavy'
                ? 'bg-pink-50 border-2 border-pink-500'
                : 'bg-white border-2 border-gray-100 hover:border-pink-200'
            }`}
          >
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium">Heavy Duty</span>
          </button>
        </div>
      </div>

      {/* Additional Conditions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onConditionChange('hasHighAreas', !conditions.hasHighAreas)}
          className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
            conditions.hasHighAreas
              ? 'bg-pink-50 border-2 border-pink-500'
              : 'bg-white border-2 border-gray-100 hover:border-pink-200'
          }`}
        >
          <ArrowUp className={`w-5 h-5 ${
            conditions.hasHighAreas ? 'text-pink-500' : 'text-gray-400'
          }`} />
          <span className="text-sm font-medium">High Areas</span>
        </button>

        <button
          onClick={() => onConditionChange('hasParking', !conditions.hasParking)}
          className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
            conditions.hasParking
              ? 'bg-pink-50 border-2 border-pink-500'
              : 'bg-white border-2 border-gray-100 hover:border-pink-200'
          }`}
        >
          <Car className={`w-5 h-5 ${
            conditions.hasParking ? 'text-pink-500' : 'text-gray-400'
          }`} />
          <span className="text-sm font-medium">Parking Available</span>
        </button>

        <button
          onClick={() => onConditionChange('urgentService', !conditions.urgentService)}
          className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
            conditions.urgentService
              ? 'bg-pink-50 border-2 border-pink-500'
              : 'bg-white border-2 border-gray-100 hover:border-pink-200'
          }`}
        >
          <Calendar className={`w-5 h-5 ${
            conditions.urgentService ? 'text-pink-500' : 'text-gray-400'
          }`} />
          <span className="text-sm font-medium">Urgent Service</span>
        </button>
      </div>
    </div>
  );
}