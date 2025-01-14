/*
  # Update quotes table for lead generation

  1. Changes
    - Add lead status and source tracking
    - Add follow-up fields
    - Enable public access for lead capture
  
  2. Security
    - Allow public inserts without authentication
    - Restrict management to admin users
*/

-- Update quotes table with lead management fields
ALTER TABLE quotes
ADD COLUMN IF NOT EXISTS lead_status text DEFAULT 'new',
ADD COLUMN IF NOT EXISTS lead_source text DEFAULT 'website',
ADD COLUMN IF NOT EXISTS last_contact timestamptz,
ADD COLUMN IF NOT EXISTS next_follow_up timestamptz,
ADD COLUMN IF NOT EXISTS notes text,
ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES profiles(id);

-- Enable RLS
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to insert quotes" ON quotes;
DROP POLICY IF EXISTS "Allow public to view quotes" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated users to insert quotes" ON quotes;
DROP POLICY IF EXISTS "Users can view their own quotes" ON quotes;

-- Create new policies
CREATE POLICY "Allow public to submit quotes"
  ON quotes FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow admins to manage quotes"
  ON quotes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );