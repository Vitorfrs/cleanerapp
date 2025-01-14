/*
  # Create background images table

  1. New Tables
    - `background_images`
      - `id` (uuid, primary key)
      - `url` (text)
      - `title` (text)
      - `order` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `background_images` table
    - Add policies for authenticated users
*/

-- Create background_images table
CREATE TABLE IF NOT EXISTS background_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  title text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE background_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to background_images"
  ON background_images FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to manage background_images"
  ON background_images FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );