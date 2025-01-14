/*
  # Create Tables and Add Sample Data

  1. Tables
    - cleaners
    - services
    - bookings
  
  2. Sample Data
    - Initial cleaners
    - Basic services
    - Example booking
*/

-- Create cleaners table
CREATE TABLE IF NOT EXISTS cleaners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  photo_url text,
  services text[],
  rating numeric,
  availability text[],
  status text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  base_price numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id),
  cleaner_id uuid REFERENCES cleaners(id),
  service_id uuid REFERENCES services(id),
  booking_date timestamptz NOT NULL,
  status text,
  total_price numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE cleaners ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Add sample cleaners
INSERT INTO cleaners (name, email, phone, photo_url, services, rating, availability, status)
VALUES
  (
    'Sarah Johnson',
    'sarah@example.com',
    '+1 234-567-8901',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    ARRAY['Residential', 'Commercial'],
    4.8,
    ARRAY['Monday', 'Tuesday', 'Thursday', 'Friday'],
    'available'
  ),
  (
    'Michael Chen',
    'michael@example.com',
    '+1 234-567-8902',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    ARRAY['Residential', 'House Keeping'],
    4.9,
    ARRAY['Monday', 'Wednesday', 'Friday'],
    'busy'
  );

-- Add sample services
INSERT INTO services (name, description, base_price)
VALUES
  ('Home Cleaning', 'Regular house cleaning services', 80),
  ('Office Cleaning', 'Professional office cleaning', 120),
  ('Commercial', 'Commercial space cleaning', 200),
  ('Vehicle Wash', 'Car and vehicle washing services', 60);

-- Create RLS policies
CREATE POLICY "Allow read access to cleaners"
  ON cleaners FOR SELECT
  USING (true);

CREATE POLICY "Allow read access to services"
  ON services FOR SELECT
  USING (true);

CREATE POLICY "Allow read access to bookings"
  ON bookings FOR SELECT
  USING (true);