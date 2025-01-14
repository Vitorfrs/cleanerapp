-- Drop existing policies
DROP POLICY IF EXISTS "Public can view background images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage background images" ON storage.objects;

-- Configure storage bucket with proper settings
UPDATE storage.buckets 
SET 
  public = true,
  file_size_limit = 5242880, -- 5MB limit
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
WHERE id = 'backgrounds';

-- Create storage policies
CREATE POLICY "Public can view background images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'backgrounds');

CREATE POLICY "Admins can manage background images"
  ON storage.objects
  FOR ALL
  USING (
    bucket_id = 'backgrounds' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Drop existing background_images policies
DROP POLICY IF EXISTS "Public can view background_images" ON background_images;
DROP POLICY IF EXISTS "Admins can manage background_images" ON background_images;

-- Create background_images policies
CREATE POLICY "Public can view background_images"
  ON background_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage background_images"
  ON background_images
  FOR ALL
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );