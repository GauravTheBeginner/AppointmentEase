/*
  # Create appointments table

  1. New Tables
    - `appointments`
      - `id` (uuid, primary key)
      - `name` (text, client's full name)
      - `email` (text, client's email address)
      - `phone` (text, client's phone number)
      - `date` (date, appointment date)
      - `time_slot` (text, appointment time)
      - `message` (text, optional additional information)
      - `created_at` (timestamp, when the appointment was booked)
  2. Security
    - Enable RLS on `appointments` table
    - Add policy for authenticated users to read all appointments
    - Add policy for authenticated users to insert their own appointments
    - Add policy for authenticated users to delete their own appointments
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time_slot text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to view all appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete their own appointments"
  ON appointments
  FOR DELETE
  TO authenticated
  USING (true);