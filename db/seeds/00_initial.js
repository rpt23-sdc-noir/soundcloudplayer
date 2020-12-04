const knex = require('../../knexConnection.js');
const axios = require('axios');
const key = require('../../unsplashAccess.js');

exports.seed = async (knex) => {
  try {
    await knex.raw("COPY song_list FROM '/Users/cam_christensen/hack_reactor/SDC/soundcloudplayer/seedFile.csv' DELIMITER ',' CSV HEADER;");
  } catch (error) {
    console.log('Error seeding database: ', error);
  }
};

// npm run seed