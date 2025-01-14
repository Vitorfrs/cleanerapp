/*
  # Create Admin User Migration
  
  1. Creates admin user with service role privileges
  2. Creates corresponding profile entry
*/

-- Create admin user function
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void AS $$
DECLARE
  admin_uid UUID;
BEGIN
  -- Check if user exists first
  SELECT id INTO admin_uid
  FROM auth.users
  WHERE email = 'vitorfribeiro@gmail.com'
  LIMIT 1;

  -- Create user if doesn't exist
  IF admin_uid IS NULL THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      created_at,
      updated_at
    )
    SELECT
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'vitorfribeiro@gmail.com',
      crypt('Admin@123', gen_salt('bf')),
      now(),
      '{"role": "admin", "name": "Vitor Ribeiro"}'::jsonb,
      now(),
      now()
    RETURNING id INTO admin_uid;
  END IF;

  -- Ensure profile exists
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    admin_uid,
    'vitorfribeiro@gmail.com',
    'Vitor Ribeiro',
    'admin'
  )
  ON CONFLICT (id) DO UPDATE
  SET role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Execute the function
SELECT create_admin_user();

-- Drop the function after use
DROP FUNCTION create_admin_user();