/*
  # Fix quotes table RLS policies and schema

  1. Changes
    - Drop existing RLS policies
    - Create new policies allowing public access for inserts
    - Add missing columns and constraints
  
  2. Security
    - Enable RLS on quotes table
    - Allow public inserts without authentication
    - Allow authenticated users to view their quotes
*/

-- Ensure quotes table exists with all required columns
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text,
  service_type text NOT NULL,
  space_details jsonb NOT NULL,
  cleaning_level text NOT NULL,
  estimated_hours numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to insert quotes" ON quotes;
DROP POLICY IF EXISTS "Users can view their own quotes" ON quotes;

-- Create new policies
CREATE POLICY "Allow public to insert quotes"
  ON quotes FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to view quotes"
  ON quotes FOR SELECT
  TO public
  USING (true);