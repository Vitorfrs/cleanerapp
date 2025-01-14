-- Create admin role if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_roles WHERE rolname = 'admin'
  ) THEN
    CREATE ROLE admin;
  END IF;
END
$$;

-- Grant necessary permissions to admin role
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO admin;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO admin;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
$$;

-- Create policy helper function
CREATE OR REPLACE FUNCTION public.admin_check()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT 
    CASE WHEN auth.jwt() IS NULL THEN false
    ELSE (
      SELECT EXISTS (
        SELECT 1
        FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
        AND id IN (
          SELECT id FROM auth.users 
          WHERE auth.users.id = auth.uid()
        )
      )
    )
    END;
$$;

-- Update RLS policies to use admin check function
ALTER TABLE background_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view background_images" ON background_images;
DROP POLICY IF EXISTS "Admins can insert background_images" ON background_images;
DROP POLICY IF EXISTS "Admins can update background_images" ON background_images;
DROP POLICY IF EXISTS "Admins can delete background_images" ON background_images;

CREATE POLICY "Public can view background_images"
  ON background_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert background_images"
  ON background_images FOR INSERT
  WITH CHECK (admin_check());

CREATE POLICY "Admins can update background_images"
  ON background_images FOR UPDATE
  USING (admin_check());

CREATE POLICY "Admins can delete background_images"
  ON background_images FOR DELETE
  USING (admin_check());

-- Update storage policies
DROP POLICY IF EXISTS "Public can view background images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload background images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update background images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete background images" ON storage.objects;

CREATE POLICY "Public can view background images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'backgrounds');

CREATE POLICY "Admins can upload background images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'backgrounds' AND admin_check());

CREATE POLICY "Admins can update background images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'backgrounds' AND admin_check());

CREATE POLICY "Admins can delete background images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'backgrounds' AND admin_check());