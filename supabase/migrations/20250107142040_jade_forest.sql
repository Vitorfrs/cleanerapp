/*
  # Fix quotes table RLS policies

  1. Changes
    - Add RLS policies for quotes table to allow inserts and selects
    - Ensure client_phone column exists
  
  2. Security
    - Enable RLS on quotes table
    - Allow authenticated users to insert quotes
    - Allow authenticated users to view their own quotes
*/

-- Ensure quotes table exists with client_phone
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

-- Create policies
CREATE POLICY "Allow authenticated users to insert quotes"
  ON quotes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own quotes"
  ON quotes FOR SELECT
  TO authenticated
  USING (client_email = auth.jwt()->>'email');