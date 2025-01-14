import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface Place {
  description: string;
  place_id: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string) => void;
  placeholder?: string;
  className?: string;
}

export function AddressAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Enter your address",
  className = ""
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.length > 2) {
      try {
        // In a real implementation, this would call the Google Places API
        // For demo purposes, we'll use mock suggestions
        const mockSuggestions = [
          { description: `${inputValue} Street, New York, NY`, place_id: '1' },
          { description: `${inputValue} Avenue, Brooklyn, NY`, place_id: '2' },
          { description: `${inputValue} Road, Queens, NY`, place_id: '3' },
        ];
        setSuggestions(mockSuggestions);
        setIsOpen(true);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: Place) => {
    onChange(suggestion.description);
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 ${className}`}
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{suggestion.description}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}