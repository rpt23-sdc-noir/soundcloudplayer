# Project Name

> SoundCloud App - Band Profile Module

## Related Projects

  - https://github.com/lions-beside-us/soundcloudplayer
  - https://github.com/lions-beside-us/comments-service
  - https://github.com/lions-beside-us/hashtags-service
  - https://github.com/lions-beside-us/user-service
  - https://github.com/lions-beside-us/soundcloud-related-tracks

## CRUD Operations

GET /songdata/:id returns a JSON object of song data for a single song, given a "songID"

POST /song/ adds a new song to database with data from the HTTP request's body

PUT /song/:id updates a song in the database for a given "songID" with data from the request's body

DELETE /songdata/:id deletes a single song in the database using the input "songID"


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> You will need to add a file in the root directory called unsplashAccess.js, which will house the Unsplash API key (obtained from Unsplash) needed for seeding.

> A .env file containing the PostGreSQL auth data must be created. For CouchDB, a "cbconfig.js" file containing the username and password for access must also be created.


## Requirements

  - React
  - React-DOM
  - Express
  - Axios
  - PostGreSQL
  - Knex
  - Unsplash API Key (for images)

## Development

## Song Data
{
  song_id: Number,
  song_name: String,
  song_length: Number,
  song_url: String,
  song_image: String
}

### Installing Dependencies

From within the root directory:

npm install -g webpack
npm install

