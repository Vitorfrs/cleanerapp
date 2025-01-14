export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface CommercialSpaceDetails {
  businessName: string;
  spaceType: 'office' | 'retail' | 'industrial' | 'warehouse' | 'other';
  squareFootage: number;
  intendedUse: string;
  occupants: number;
  leaseTerm: string;
  specialRequirements: string[];
}

export interface CommercialSpaceDetails {
  businessName: string;
  spaceType: 'office' | 'retail' | 'industrial' | 'warehouse' | 'other';
  squareFootage: number;
  intendedUse: string;
  occupants: number;
  leaseTerm: string;
  specialRequirements: string[];
}

export interface ServiceProvider {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  services: string[];
  pricePerDay: number;
  description: string;
  availability: string[];
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Booking {
  id: string;
  providerId: string;
  clientId: string;
  serviceType: string;
  date: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
  price: number;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}