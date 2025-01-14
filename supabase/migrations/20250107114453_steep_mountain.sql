/*
  # Fix Admin User Creation

  1. Changes
    - Creates admin user safely
    - Ensures profile exists
    - Updates RLS policies
    - Adds email index
*/

-- Create the admin profile first
INSERT INTO public.profiles (
  id,
  email,
  name,
  role,
  created_at,
  updated_at
)
SELECT 
  id,
  'vitorfribeiro@gmail.com',
  'Vitor Ribeiro',
  'admin',
  now(),
  now()
FROM auth.users
WHERE email = 'vitorfribeiro@gmail.com'
ON CONFLICT (email) DO UPDATE 
SET 
  role = 'admin',
  updated_at = now();

-- Update RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON profiles;
CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);