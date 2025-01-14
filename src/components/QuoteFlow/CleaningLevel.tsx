import React from 'react';
import { Check } from 'lucide-react';

export interface CleaningLevelOption {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
}

interface CleaningLevelProps {
  levels: CleaningLevelOption[];
  selectedLevel: string;
  onSelect: (levelId: string) => void;
  serviceType: string;
}

export function CleaningLevel({ levels, selectedLevel, onSelect, serviceType }: CleaningLevelProps) {
  const filteredLevels = levels.filter(level => {
    if (serviceType === 'House Keeping') {
      return level.category === 'House Keeping';
    }
    return level.category === 'all';
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {filteredLevels.map((level) => (
        <button
          key={level.id}
          onClick={() => onSelect(level.id)}
          className={`p-4 rounded-xl text-left transition-all ${
            selectedLevel === level.id
              ? 'bg-pink-50 border-2 border-pink-500 shadow-sm'
              : 'bg-white border-2 border-gray-100 hover:border-pink-200'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{level.name}</h3>
            {selectedLevel === level.id && (
              <Check className="w-5 h-5 text-pink-500" />
            )}
          </div>
          <p className="text-sm text-gray-600 mb-3">{level.description}</p>
          <ul className="space-y-2">
            {level.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                {feature}
              </li>
            ))}
          </ul>
        </button>
      ))}
    </div>
  );
}