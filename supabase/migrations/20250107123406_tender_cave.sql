/*
  # Smart Scheduling System

  1. New Tables
    - availability_slots: Cleaner availability windows
    - recurring_bookings: Recurring booking patterns
    - notifications: System notifications
    - service_areas: Geographic service coverage
  
  2. Security
    - RLS policies for all tables
*/

-- Create availability slots table
CREATE TABLE IF NOT EXISTS availability_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cleaner_id uuid REFERENCES cleaners(id),
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_recurring boolean DEFAULT true,
  specific_date date,
  status text DEFAULT 'available',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

-- Create recurring bookings table
CREATE TABLE IF NOT EXISTS recurring_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id),
  frequency text NOT NULL,
  interval integer NOT NULL DEFAULT 1,
  start_date date NOT NULL,
  end_date date,
  day_of_week integer[] NOT NULL,
  status text DEFAULT 'active',
  last_generated_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id uuid NOT NULL,
  recipient_type text NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  data jsonb,
  read boolean DEFAULT false,
  sent_at timestamptz DEFAULT now(),
  read_at timestamptz
);

-- Create service areas table
CREATE TABLE IF NOT EXISTS service_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cleaner_id uuid REFERENCES cleaners(id),
  zip_code text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  country text NOT NULL,
  radius numeric NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add geolocation columns to bookings
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS location_lat numeric,
ADD COLUMN IF NOT EXISTS location_lng numeric,
ADD COLUMN IF NOT EXISTS address_zip_code text;

-- Enable RLS
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurring_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to availability slots"
  ON availability_slots FOR SELECT
  USING (true);

CREATE POLICY "Allow read access to recurring bookings"
  ON recurring_bookings FOR SELECT
  USING (true);

CREATE POLICY "Allow read access to notifications"
  ON notifications FOR SELECT
  USING (true);

CREATE POLICY "Allow read access to service areas"
  ON service_areas FOR SELECT
  USING (true);

-- Add sample data
INSERT INTO availability_slots (
  cleaner_id,
  day_of_week,
  start_time,
  end_time
)
SELECT 
  id,
  generate_series(1, 5),  -- Monday to Friday
  '09:00:00'::time,
  '17:00:00'::time
FROM cleaners
WHERE status = 'available';

INSERT INTO service_areas (
  cleaner_id,
  zip_code,
  city,
  state,
  country,
  radius
)
SELECT 
  id,
  '10001',
  'New York',
  'NY',
  'USA',
  10
FROM cleaners
WHERE status = 'available';

-- Create indexes
CREATE INDEX availability_slots_cleaner_id_idx ON availability_slots(cleaner_id);
CREATE INDEX availability_slots_day_of_week_idx ON availability_slots(day_of_week);
CREATE INDEX recurring_bookings_booking_id_idx ON recurring_bookings(booking_id);
CREATE INDEX notifications_recipient_id_idx ON notifications(recipient_id);
CREATE INDEX service_areas_zip_code_idx ON service_areas(zip_code);
CREATE INDEX service_areas_cleaner_id_idx ON service_areas(cleaner_id);

-- Create function to find available cleaners
CREATE OR REPLACE FUNCTION find_available_cleaners(
  p_service_date date,
  p_start_time time,
  p_end_time time,
  p_zip_code text,
  p_service_id uuid
)
RETURNS TABLE (
  cleaner_id uuid,
  distance numeric,
  rating numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    0::numeric as distance, -- In a real implementation, calculate actual distance
    c.rating
  FROM cleaners c
  JOIN availability_slots a ON c.id = a.cleaner_id
  JOIN service_areas sa ON c.id = sa.cleaner_id
  WHERE 
    c.status = 'available'
    AND a.day_of_week = EXTRACT(DOW FROM p_service_date)
    AND a.start_time <= p_start_time
    AND a.end_time >= p_end_time
    AND sa.zip_code = p_zip_code
    AND sa.active = true
  ORDER BY 
    c.rating DESC,
    distance ASC;
END;
$$ LANGUAGE plpgsql;

-- Create function to generate recurring bookings
CREATE OR REPLACE FUNCTION generate_recurring_bookings()
RETURNS void AS $$
DECLARE
  r recurring_bookings%ROWTYPE;
BEGIN
  FOR r IN 
    SELECT * FROM recurring_bookings 
    WHERE status = 'active' 
    AND (end_date IS NULL OR end_date > CURRENT_DATE)
    AND (last_generated_date IS NULL OR last_generated_date < CURRENT_DATE + interval '30 days')
  LOOP
    -- Generate next 30 days of bookings
    -- In a real implementation, this would create actual booking records
    UPDATE recurring_bookings 
    SET last_generated_date = CURRENT_DATE + interval '30 days'
    WHERE id = r.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;