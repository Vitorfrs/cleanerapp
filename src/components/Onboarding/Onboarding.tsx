import React, { useState } from 'react';
import type { OnboardingStep as OnboardingStepType } from '../../types';
import { OnboardingStep } from './OnboardingStep';
import { OnboardingProgress } from './OnboardingProgress';

const onboardingSteps: OnboardingStepType[] = [
  {
    id: 1,
    title: 'Find Your Perfect Cleaner',
    description: 'Browse through our network of professional cleaners and cleaning companies. Compare ratings, prices, and services to find your ideal match.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    title: 'Book with Confidence',
    description: 'Schedule your cleaning service with just a few taps. Choose your preferred date, time, and customize your cleaning requirements.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 3,
    title: 'Enjoy Professional Service',
    description: 'Relax while experienced professionals take care of your space. All our cleaners are vetted and background-checked for your peace of mind.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=1000',
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep === onboardingSteps.length - 1) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center overflow-hidden py-8">
        <div 
          className="flex transition-transform duration-500 ease-out w-full"
          style={{ transform: `translateX(-${currentStep * 100}%)` }}
        >
          {onboardingSteps.map((step, index) => (
            <OnboardingStep
              key={step.id}
              step={step}
              isActive={currentStep === index}
            />
          ))}
        </div>
      </div>

      <div className="px-4 pb-8 space-y-6">
        <OnboardingProgress
          totalSteps={onboardingSteps.length}
          currentStep={currentStep}
        />

        <div className="flex flex-col gap-3 max-w-md mx-auto w-full">
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3.5 rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          </button>
          {currentStep < onboardingSteps.length - 1 && (
            <button
              onClick={handleSkip}
              className="text-gray-500 font-medium hover:text-gray-700 transition-colors py-2"
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}