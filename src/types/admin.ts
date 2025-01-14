export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
  createdAt: string;
}

export interface Quote {
  id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  serviceType: string;
  space_details: {
    type: string;
    bedrooms: number;
    bathrooms: number;
    floors: number;
  };
  cleaning_level: string;
  estimated_hours: number;
  status: 'pending' | 'assigned' | 'completed' | 'cancelled';
  assigned_cleaner_id?: string;
  created_at: string;
  scheduled_date?: string;
  lead_status: string;
  lead_source?: string;
  notes?: string;
}

export interface Cleaner {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  services: string[];
  rating: number;
  availability: string[];
  status: 'available' | 'busy' | 'offline';
  activeBookings: number;
  completedJobs: number;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'payout';
  category: 'cleaning' | 'supplies' | 'commission' | 'salary' | 'other';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description: string;
  customer?: string;
  cleaner?: string;
  paymentMethod?: string;
  fees?: number;
  taxRate?: number;
  reference?: string;
}

export interface FinancialMetrics {
  revenue: number;
  expenses: number;
  profit: number;
  growth: number;
  projectedRevenue: number;
  averageBookingValue: number;
  topServices: Array<{
    name: string;
    revenue: number;
    bookings: number;
  }>;
  revenueByCategory: Record<string, number>;
}