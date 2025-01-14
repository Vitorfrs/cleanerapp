import React from 'react';
import type { OnboardingStep } from '../../types';

interface OnboardingStepProps {
  step: OnboardingStep;
  isActive: boolean;
}

export function OnboardingStep({ step, isActive }: OnboardingStepProps) {
  return (
    <div className={`flex-shrink-0 w-full transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-md mx-auto px-4">
        <div className="aspect-[4/3] relative mb-8 rounded-2xl overflow-hidden">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
          {step.title}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 text-center leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}