-- Configure storage bucket with proper settings
UPDATE storage.buckets 
SET 
  public = true,
  file_size_limit = 5242880, -- 5MB limit
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
WHERE id = 'backgrounds';

-- Drop existing storage policies
DROP POLICY IF EXISTS "Public can view background images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload background images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update background images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete background images" ON storage.objects;

-- Create storage policies
CREATE POLICY "Public can view background images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'backgrounds');

CREATE POLICY "Admins can manage background images"
  ON storage.objects
  USING (
    bucket_id = 'backgrounds' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    bucket_id = 'backgrounds' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );