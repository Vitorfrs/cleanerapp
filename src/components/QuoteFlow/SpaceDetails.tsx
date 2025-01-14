import React from 'react';
import { Home, Building2, DoorOpen, Store, Factory, Warehouse } from 'lucide-react';

const residentialSpaceTypes = [
  { id: 'apartment', name: 'Apartment', icon: 'door', category: 'residential' },
  { id: 'house', name: 'House', icon: 'home', category: 'residential' }
];

const commercialSpaceTypes = [
  { id: 'commercial-office', name: 'Commercial Office', icon: 'building' },
  { id: 'commercial-retail', name: 'Retail Space', icon: 'store' },
  { id: 'commercial-industrial', name: 'Industrial Space', icon: 'factory' },
  { id: 'commercial-warehouse', name: 'Warehouse', icon: 'warehouse' },
  { id: 'commercial-construction', name: 'Post Construction', icon: 'building' }
];

export interface SpaceOption {
  id: string;
  name: string;
  icon: 'home' | 'building' | 'door' | 'store' | 'factory' | 'warehouse';
}

const iconMap = {
  home: Home,
  building: Building2,
  door: DoorOpen,
  store: Store,
  factory: Factory,
  warehouse: Warehouse,
};

const allSpaceTypes = [
  { id: 'apartment', name: 'Apartment', icon: 'door', category: 'residential' },
  { id: 'house', name: 'House', icon: 'home', category: 'residential' },
];

interface SpaceDetailsProps {
  options: SpaceOption[];
  selectedOption: string;
  onSelect: (optionId: string) => void;
  spaceDetails: {
    bedrooms: number;
    bathrooms: number;
    floors: number;
    businessName?: string;
    spaceType?: string;
    squareFootage?: number;
    intendedUse?: string;
    occupants?: number;
    leaseTerm?: string;
    specialRequirements?: string[];
  };
  onDetailsChange: (field: keyof SpaceDetailsProps['spaceDetails'], value: number) => void;
}

export function SpaceDetails({
  options,
  selectedOption,
  onSelect,
  spaceDetails,
  onDetailsChange,
}: SpaceDetailsProps) {
  const renderCounter = (
    label: string,
    value: number,
    field: keyof SpaceDetailsProps['spaceDetails']
  ) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-3">
        <button
          onClick={() => value > 0 && onDetailsChange(field, value - 1)}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
        >
          -
        </button>
        <span className="w-12 text-center font-medium">{value}</span>
        <button
          onClick={() => onDetailsChange(field, value + 1)}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  );
  
  const renderCommercialForm = () => (
    <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-4">
      <h3 className="font-medium text-gray-900 mb-4">Commercial Space Details</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business/Company Name
        </label>
        <input
          type="text"
          value={spaceDetails.businessName || ''}
          onChange={(e) => onDetailsChange('businessName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          placeholder="Enter business name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type of Commercial Space
        </label>
        <select
          value={spaceDetails.spaceType || ''}
          onChange={(e) => onDetailsChange('spaceType', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
        >
          <option value="">Select type</option>
          {commercialSpaceTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Square Footage
        </label>
        <input
          type="number"
          value={spaceDetails.squareFootage || ''}
          onChange={(e) => onDetailsChange('squareFootage', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          placeholder="Enter square footage"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Occupants
        </label>
        <input
          type="number"
          value={spaceDetails.occupants || ''}
          onChange={(e) => onDetailsChange('occupants', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          placeholder="Enter number of occupants"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Special Requirements
        </label>
        <div className="space-y-2">
          {[
            'Parking',
            'Loading Dock', 
            'Security System',
            '24/7 Access',
            'Storage Space',
            'Debris Removal',
            'Paint Protection',
            'Window Cleaning',
            'Floor Protection'
          ].map((req) => (
            <label key={req} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={spaceDetails.specialRequirements?.includes(req) || false}
                onChange={(e) => {
                  const current = spaceDetails.specialRequirements || [];
                  const updated = e.target.checked
                    ? [...current, req]
                    : current.filter(r => r !== req);
                  onDetailsChange('specialRequirements', updated);
                }}
                className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
              />
              <span className="text-sm text-gray-700">{req}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        {/* Residential Section */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-lg font-semibold text-gray-900">
              Residential Properties
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {residentialSpaceTypes.map((option) => {
            const Icon = iconMap[option.icon];
            return (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={`p-6 rounded-xl flex flex-col items-center gap-4 transition-all ${
                  selectedOption === option.id
                    ? 'bg-pink-50 border-2 border-pink-500 shadow-lg'
                    : 'bg-white border-2 border-gray-100 hover:border-pink-200 hover:shadow-md'
                }`}
              >
                <Icon className={`w-12 h-12 ${
                  selectedOption === option.id ? 'text-pink-500' : 'text-gray-400'
                }`} />
                <span className={`text-base font-medium ${
                  selectedOption === option.id ? 'text-pink-500' : 'text-gray-700'
                }`}>
                  {option.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Commercial Section */}
        <div className="space-y-4 mt-12">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-lg font-semibold text-gray-900">
                Commercial Properties
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            {commercialSpaceTypes.map((option) => {
              const Icon = iconMap[option.icon];
              return (
                <button
                  key={option.id}
                  onClick={() => onSelect(option.id)}
                  className={`p-6 rounded-xl flex flex-col items-center gap-4 transition-all ${
                    selectedOption === option.id
                      ? 'bg-pink-50 border-2 border-pink-500 shadow-lg'
                      : 'bg-white border-2 border-gray-100 hover:border-pink-200 hover:shadow-md'
                  }`}
                >
                  <Icon className={`w-12 h-12 ${
                    selectedOption === option.id ? 'text-pink-500' : 'text-gray-400'
                  }`} />
                  <span className={`text-base font-medium ${
                    selectedOption === option.id ? 'text-pink-500' : 'text-gray-700'
                  }`}>
                    {option.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {selectedOption && (
          selectedOption.startsWith('commercial-') ? (
            renderCommercialForm()
          ) : (
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <h3 className="font-medium text-gray-900 mb-4">Space Details</h3>
              <div className="grid grid-cols-3 gap-4">
                {renderCounter('Bedrooms', spaceDetails.bedrooms, 'bedrooms')}
                {renderCounter('Bathrooms', spaceDetails.bathrooms, 'bathrooms')}
                {renderCounter('Floors', spaceDetails.floors, 'floors')}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}