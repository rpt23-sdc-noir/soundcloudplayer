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

> You will need to add a file in the root directory called unsplashAccess.js, which will house the Unsplash API key needed for seeding.


## Requirements

  - React
  - React-DOM
  - Express
  - Axios

## Development

### Installing Dependencies

From within the root directory:

npm install -g webpack
npm install

