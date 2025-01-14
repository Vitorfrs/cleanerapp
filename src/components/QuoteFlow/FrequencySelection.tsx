import React from 'react';
import { Calendar, Repeat, Clock, CalendarClock } from 'lucide-react';

export interface FrequencyOption {
  id: string;
  name: string;
  description: string;
  icon: 'once' | 'weekly' | 'biweekly' | 'monthly';
}

const iconMap = {
  once: Calendar,
  weekly: Repeat,
  biweekly: Clock,
  monthly: CalendarClock,
};

interface FrequencySelectionProps {
  selectedFrequency: string;
  onSelect: (id: string) => void;
}

export function FrequencySelection({ selectedFrequency, onSelect }: FrequencySelectionProps) {
  const frequencies: FrequencyOption[] = [
    { id: 'once', name: 'One Time', description: 'Single cleaning service', icon: 'once' },
    { id: 'weekly', name: 'Weekly', description: 'Regular weekly service', icon: 'weekly' },
    { id: 'biweekly', name: 'Biweekly', description: 'Every two weeks', icon: 'biweekly' },
    { id: 'monthly', name: 'Monthly', description: 'Once per month', icon: 'monthly' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {frequencies.map((freq) => {
        const Icon = iconMap[freq.icon];
        return (
          <button
            key={freq.id}
            onClick={() => onSelect(freq.id)}
            className={`p-4 rounded-xl flex flex-col items-center gap-3 transition-all ${
              selectedFrequency === freq.id
                ? 'bg-pink-50 border-2 border-pink-500'
                : 'bg-white border-2 border-gray-100 hover:border-pink-200'
            }`}
          >
            <Icon className={`w-8 h-8 ${
              selectedFrequency === freq.id ? 'text-pink-500' : 'text-gray-400'
            }`} />
            <div className="text-center">
              <span className={`block text-sm font-medium ${
                selectedFrequency === freq.id ? 'text-pink-500' : 'text-gray-700'
              }`}>
                {freq.name}
              </span>
              <span className="text-xs text-gray-500">{freq.description}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}