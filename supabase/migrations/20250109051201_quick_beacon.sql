-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to background_images" ON background_images;
DROP POLICY IF EXISTS "Allow authenticated users to manage background_images" ON background_images;
DROP POLICY IF EXISTS "Allow admin insert to background_images" ON background_images;
DROP POLICY IF EXISTS "Allow admin update to background_images" ON background_images;
DROP POLICY IF EXISTS "Allow admin delete from background_images" ON background_images;

-- Create new policies with proper admin access
CREATE POLICY "Allow public read access to background_images"
  ON background_images FOR SELECT
  USING (true);

CREATE POLICY "Allow admin full access to background_images"
  ON background_images
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Enable storage for background images if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('backgrounds', 'backgrounds', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies
DROP POLICY IF EXISTS "Allow public read access to backgrounds" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin access to backgrounds" ON storage.objects;

CREATE POLICY "Allow public read access to backgrounds"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'backgrounds');

CREATE POLICY "Allow admin full access to backgrounds"
  ON storage.objects
  USING (
    bucket_id = 'backgrounds' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      JOIN profiles ON profiles.id = auth.users.id
      WHERE auth.users.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    bucket_id = 'backgrounds' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      JOIN profiles ON profiles.id = auth.users.id
      WHERE auth.users.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );