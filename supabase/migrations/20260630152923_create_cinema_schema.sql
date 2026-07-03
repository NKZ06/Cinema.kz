/*
# Cinema Poster Schema

1. New Tables
- `movies` — film catalog with titles, descriptions, posters, ratings, genres
- `halls` — cinema halls with names and capacities
- `showtimes` — screening schedule linking movies to halls with date, time and price

2. Security
- Enable RLS on all tables.
- Allow anon + authenticated read/write because this is a public cinema poster app (no auth required).
*/

CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  poster_url text,
  backdrop_url text,
  year integer NOT NULL,
  rating numeric(3,1) DEFAULT 0,
  genre text NOT NULL,
  director text,
  duration_minutes integer NOT NULL,
  trailer_url text,
  age_rating text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS halls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  capacity integer NOT NULL,
  format text DEFAULT '2D',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS showtimes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  movie_id uuid NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  hall_id uuid NOT NULL REFERENCES halls(id) ON DELETE CASCADE,
  show_time timestamptz NOT NULL,
  price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE halls ENABLE ROW LEVEL SECURITY;
ALTER TABLE showtimes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_movies" ON movies;
CREATE POLICY "anon_select_movies" ON movies FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_movies" ON movies;
CREATE POLICY "anon_insert_movies" ON movies FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_movies" ON movies;
CREATE POLICY "anon_update_movies" ON movies FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_movies" ON movies;
CREATE POLICY "anon_delete_movies" ON movies FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_halls" ON halls;
CREATE POLICY "anon_select_halls" ON halls FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_halls" ON halls;
CREATE POLICY "anon_insert_halls" ON halls FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_halls" ON halls;
CREATE POLICY "anon_update_halls" ON halls FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_halls" ON halls;
CREATE POLICY "anon_delete_halls" ON halls FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_showtimes" ON showtimes;
CREATE POLICY "anon_select_showtimes" ON showtimes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_showtimes" ON showtimes;
CREATE POLICY "anon_insert_showtimes" ON showtimes FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_showtimes" ON showtimes;
CREATE POLICY "anon_update_showtimes" ON showtimes FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_showtimes" ON showtimes;
CREATE POLICY "anon_delete_showtimes" ON showtimes FOR DELETE
  TO anon, authenticated USING (true);
