import React from 'react';

interface OnboardingProgressProps {
  totalSteps: number;
  currentStep: number;
}

export function OnboardingProgress({ totalSteps, currentStep }: OnboardingProgressProps) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentStep
              ? 'w-6 bg-pink-500'
              : index < currentStep
              ? 'bg-pink-200'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}