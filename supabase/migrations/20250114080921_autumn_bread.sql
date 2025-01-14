-- Drop ALL existing policies first
DROP POLICY IF EXISTS "Public can view background images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage background images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can insert background images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update background images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete background images" ON storage.objects;

DROP POLICY IF EXISTS "Public can view background_images" ON background_images;
DROP POLICY IF EXISTS "Admins can manage background_images" ON background_images;
DROP POLICY IF EXISTS "Admins can insert background_images" ON background_images;
DROP POLICY IF EXISTS "Admins can update background_images" ON background_images;
DROP POLICY IF EXISTS "Admins can delete background_images" ON background_images;

-- Configure storage bucket
UPDATE storage.buckets 
SET 
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
WHERE id = 'backgrounds';

-- Create simplified storage policies
CREATE POLICY "Public can view background images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'backgrounds');

CREATE POLICY "Admins can manage background images"
  ON storage.objects
  FOR ALL
  USING (
    bucket_id = 'backgrounds' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create simplified background_images policies
CREATE POLICY "Public can view background_images"
  ON background_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage background_images"
  ON background_images
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );