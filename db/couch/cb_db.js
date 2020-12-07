const config = require('../../cbconfig.js'); // imports auth info
// Use port 5984
const nano = require('nano')(`http://admin:${config.admin}@localhost:5984`);
// http://admin:mypassword@localhost:5984 --> interpolate auth info from config file
async function initializeDB() {
  // drop db
  await nano.db.destroy('songs');
  // create db
  await nano.db.create('songs');
  // connect to db
  const songs = nano.use('songs');
  // insert data
  // const createData = await songs.insert({ happy: true }, 'rabbit');
  // return promise from insert
  // return createData;
};

initializeDB(); // creates the database
