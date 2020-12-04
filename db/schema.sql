DROP DATABASE IF EXISTS songs;
CREATE DATABASE songs;

-- connect to database
\c songs;

CREATE TABLE song_list (
  song_id SERIAL PRIMARY KEY,
  song_name TEXT NOT NULL,
  song_length INTEGER NOT NULL,
  song_url TEXT NOT NULL,
  song_image TEXT NOT NULL
);

-- UPLOAD SCHEMA COMMAND:
-- psql -U postgres < db/schema.sql