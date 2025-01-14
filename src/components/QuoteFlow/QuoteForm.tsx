import React, { useState, useCallback } from 'react';
import { FrequencySelection } from './FrequencySelection';
import { PreferencesSection } from './PreferencesSection';
import { SpecificConditions } from './SpecificConditions';
import { ImageUpload } from './ImageUpload';
import { CleaningLevel, type CleaningLevelOption } from './CleaningLevel';
import { SpaceDetails, type SpaceOption } from './SpaceDetails';
import { analyzeSpaceAndEstimateHours } from '../../services/openai';
import { Loader2, ArrowRight } from 'lucide-react';

enum Step {
  SpaceType,
  Frequency,
  CleaningLevel,
  Preferences,
  Photos,
  Review
}

const cleaningLevels: CleaningLevelOption[] = [
  {
    id: 'basic',
    category: 'all',
    name: 'Basic Clean',
    description: 'Essential cleaning for regular maintenance',
    features: ['Dusting', 'Vacuuming', 'Surface wiping', 'Trash removal']
  },
  {
    id: 'deep',
    category: 'all',
    name: 'Deep Clean',
    description: 'Thorough cleaning for a fresh start',
    features: ['Basic clean features', 'Deep carpet cleaning', 'Interior windows', 'Cabinet cleaning']
  },
  {
    id: 'premium',
    category: 'all',
    name: 'Premium Clean',
    description: 'Complete top-to-bottom cleaning',
    features: ['Deep clean features', 'Appliance cleaning', 'Wall washing', 'Organization']
  },
  {
    id: 'endoflease',
    category: 'End of Lease Cleaning',
    name: 'Bond Clean',
    description: 'Comprehensive cleaning to ensure bond return',
    features: [
      'Deep cleaning of all rooms',
      'Carpet steam cleaning',
      'Full kitchen deep clean',
      'Window tracks and frames',
      'Light fixtures and switches',
      'Skirting boards and door frames'
    ]
  },
  {
    id: 'housekeeping-light',
    category: 'House Keeping',
    name: 'Light Maintenance',
    description: 'Regular light cleaning and tidying',
    features: [
      'Bed making',
      'Light dusting',
      'Bathroom wipe down',
      'Kitchen surfaces',
      'Quick vacuum'
    ]
  },
  {
    id: 'housekeeping-full',
    category: 'House Keeping',
    name: 'Full Service',
    description: 'Complete housekeeping service',
    features: [
      'All light maintenance tasks',
      'Laundry service',
      'Ironing',
      'Grocery shopping',
      'Plant care',
      'Pet care assistance'
    ]
  }
];

const spaceOptions: SpaceOption[] = [
  { id: 'apartment', name: 'Apartment', icon: 'door' },
  { id: 'house', name: 'House', icon: 'home' },
  { id: 'office', name: 'Office', icon: 'building' }
];

interface QuoteFormProps {
  serviceType: string;
  onQuoteGenerated: (hours: number, explanation: string) => void;
}

export function QuoteForm({ serviceType, onQuoteGenerated }: QuoteFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const [spaceType, setSpaceType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [spaceDetails, setSpaceDetails] = useState({
    bedrooms: 0,
    bathrooms: 0,
    floors: 1
  });
  const [preferences, setPreferences] = useState({
    timePreference: 'morning',
    providesEquipment: false,
    ecoFriendly: false,
    isEndOfLease: false,
    houseKeepingLevel: 'none' as 'none' | 'basic' | 'full',
    securityAccess: false,
    afterHoursService: false,
    regularSchedule: false
  });
  const [conditions, setConditions] = useState({
    dirtLevel: 'normal' as 'normal' | 'heavy',
    hasHighAreas: false,
    hasParking: false,
    urgentService: false
  });
  const [cleaningLevel, setCleaningLevel] = useState('');
  const [currentStep, setCurrentStep] = useState(Step.SpaceType);
  const [loading, setLoading] = useState(false);
  const [hasAcceptedResponsibility, setHasAcceptedResponsibility] = useState(false);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);

  const handleSubmit = async () => {
    if (!spaceType || !cleaningLevel || !frequency) {
      alert('Please complete all steps');
      return;
    }

    setLoading(true);
    try {
      // Calculate commercial rates if applicable
      const isCommercial = spaceType === 'commercial';
      const commercialMultiplier = isCommercial ? 1.5 : 1;
      
      // Prepare space details for database
      const spaceDetailsData = {
        type: spaceType,
        ...(isCommercial ? {
          businessName: spaceDetails.businessName,
          spaceType: spaceDetails.spaceType,
          squareFootage: spaceDetails.squareFootage,
          intendedUse: spaceDetails.intendedUse,
          occupants: spaceDetails.occupants,
          leaseTerm: spaceDetails.leaseTerm,
          specialRequirements: spaceDetails.specialRequirements
        } : {
        ...(isCommercial ? {
          businessName: spaceDetails.businessName,
          spaceType: spaceDetails.spaceType,
          squareFootage: spaceDetails.squareFootage,
          intendedUse: spaceDetails.intendedUse,
          occupants: spaceDetails.occupants,
          leaseTerm: spaceDetails.leaseTerm,
          specialRequirements: spaceDetails.specialRequirements
        } : {
        bedrooms: spaceDetails.bedrooms,
        bathrooms: spaceDetails.bathrooms,
        floors: spaceDetails.floors
        }),
        }),
        frequency,
        preferences: {
          timePreference: preferences.timePreference,
          providesEquipment: preferences.providesEquipment,
          ecoFriendly: preferences.ecoFriendly,
          isEndOfLease: preferences.isEndOfLease,
          houseKeepingLevel: preferences.houseKeepingLevel
        },
        conditions: {
          dirtLevel: conditions.dirtLevel,
          hasHighAreas: conditions.hasHighAreas,
          hasParking: conditions.hasParking,
          urgentService: conditions.urgentService
        },
        images: images.length
      };

      const description = `
        ${spaceType} space requiring ${cleaningLevel} cleaning (${frequency})
        Details:
        ${isCommercial ? `
        - Business: ${spaceDetails.businessName}
        - Space Type: ${spaceDetails.spaceType}
        - Square Footage: ${spaceDetails.squareFootage} sq ft
        - Occupants: ${spaceDetails.occupants}
        - Special Requirements: ${spaceDetails.specialRequirements?.join(', ') || 'None'}
        ` : `
        ${isCommercial ? `
        - Business: ${spaceDetails.businessName}
        - Space Type: ${spaceDetails.spaceType}
        - Square Footage: ${spaceDetails.squareFootage} sq ft
        - Occupants: ${spaceDetails.occupants}
        - Special Requirements: ${spaceDetails.specialRequirements?.join(', ') || 'None'}
        ` : `
        - Bedrooms: ${spaceDetails.bedrooms}
        - Bathrooms: ${spaceDetails.bathrooms}
        - Floors: ${spaceDetails.floors}
        `}
        `}
        
        Preferences:
        - Time: ${preferences.timePreference}
        - Equipment: ${preferences.providesEquipment ? 'Client provides' : 'Need supplies'}
        - Products: ${preferences.ecoFriendly ? 'Eco-friendly required' : 'Standard products'},
        - End of Lease: ${preferences.isEndOfLease ? 'Yes' : 'No'}
        - House Keeping Level: ${preferences.houseKeepingLevel}
        
        Conditions:
        - Dirt Level: ${conditions.dirtLevel}
        - High Areas: ${conditions.hasHighAreas ? 'Yes' : 'No'}
        - Parking: ${conditions.hasParking ? 'Available' : 'Not available'}
        - Urgent: ${conditions.urgentService ? 'Yes' : 'No'}
      `;
      const result = await analyzeSpaceAndEstimateHours(
        description,
        images,
        serviceType
      );
      
      // Pass complete data to parent
      onQuoteGenerated(
        result.hours, 
        result.explanation,
        {
          spaceDetails: spaceDetailsData,
          cleaningLevel,
          serviceType,
          frequency
        }
      );
    } catch (error) {
      alert('Failed to generate quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case Step.SpaceType:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Tell us about your space</h2>
            <SpaceDetails
              options={spaceOptions}
              selectedOption={spaceType}
              onSelect={setSpaceType}
              spaceDetails={spaceDetails}
              onDetailsChange={(field, value) => 
                setSpaceDetails(prev => ({ ...prev, [field]: value }))
              }
            />
          </div>
        );
      case Step.Frequency:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">How often do you need cleaning?</h2>
            <FrequencySelection
              selectedFrequency={frequency}
              onSelect={setFrequency}
            />
          </div>
        );
      case Step.CleaningLevel:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Choose your cleaning level</h2>
            <CleaningLevel
              serviceType={serviceType}
              levels={cleaningLevels}
              selectedLevel={cleaningLevel}
              onSelect={setCleaningLevel}
            />
          </div>
        );
      case Step.Preferences:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Preferences</h2>
            <PreferencesSection
              preferences={preferences}
              spaceType={spaceType}
              onPreferenceChange={(field, value) =>
                setPreferences(prev => ({ ...prev, [field]: value }))
              }
            />
            <SpecificConditions
              conditions={conditions}
              onConditionChange={(field, value) =>
                setConditions(prev => ({ ...prev, [field]: value }))
              }
            />
          </div>
        );
      case Step.Photos:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Add photos of your space</h2>
            <ImageUpload
              images={images}
              hasAcceptedResponsibility={hasAcceptedResponsibility}
              onAcceptResponsibility={setHasAcceptedResponsibility}
              onImagesChange={setImages}
            />
          </div>
        );
      case Step.Review:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Review Details</h2>
            <div className="bg-white rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Space Type</span>
                <span className="font-medium">{spaceType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Frequency</span>
                <span className="font-medium">{frequency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Space Details</span>
                <span className="font-medium">
                  {spaceDetails.bedrooms} bed, {spaceDetails.bathrooms} bath, {spaceDetails.floors} floor(s)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cleaning Level</span>
                <span className="font-medium">{cleaningLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time Preference</span>
                <span className="font-medium">{preferences.timePreference}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Special Conditions</span>
                <span className="font-medium">
                  {conditions.dirtLevel === 'heavy' ? 'Heavy Duty' : 'Normal'}
                  {conditions.hasHighAreas ? ', High Areas' : ''}
                  {conditions.urgentService ? ', Urgent' : ''}
                </span>
              </div>
              {images.length > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Photos</span>
                  <span className="font-medium">{images.length} uploaded</span>
                </div>
              )}
            </div>
          </div>
        );
    }
  };
  const canProceed = () => {
    switch (currentStep) {
      case Step.SpaceType:
        if (spaceType.startsWith('commercial-')) {
          return spaceType && 
            spaceDetails.businessName && 
            spaceDetails.spaceType && 
            spaceDetails.squareFootage;
        }
        return spaceType && 
          (spaceDetails.bedrooms > 0 || spaceDetails.bathrooms > 0);
      case Step.Frequency:
        return frequency;
      case Step.CleaningLevel:
        return cleaningLevel;
      case Step.Preferences:
        return preferences.timePreference;
      case Step.Photos:
        return images.length > 0 || hasAcceptedResponsibility;
      default:
        return true;
    }
  };

  return (
    <div className="space-y-8">
      {renderStep()}
      
      <div className="flex justify-end">
        <button
          onClick={currentStep === Step.Review ? handleSubmit : nextStep}
          disabled={!canProceed() || loading}
          className="flex items-center gap-2 bg-[#C4A484] hover:bg-[#B8997D] text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Space...
            </>
          ) : currentStep === Step.Review ? (
            'Generate Quote'
          ) : (
            <>
              Next
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}