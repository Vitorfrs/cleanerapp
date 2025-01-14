/*
  # Test Database Setup

  1. Tables
    - test_users
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - created_at (timestamp)
    
  2. Security
    - Enable RLS
    - Add policies for authenticated access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create test users table
CREATE TABLE IF NOT EXISTS test_users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE test_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated read access"
  ON test_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert"
  ON test_users FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert test data
INSERT INTO test_users (email, name)
VALUES 
  ('test1@example.com', 'Test User 1'),
  ('test2@example.com', 'Test User 2')
ON CONFLICT (email) DO NOTHING;