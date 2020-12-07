const auth = require('../../cbconfig.js');
const csv = require('csvtojson');

const nano = require('nano')(`http://admin:${auth.admin}@localhost:5984`);

async function seedCouchDB() {
  const songs = nano.use('songs');
  csv()
    .fromFile('../../seedFile.csv')
    .then((converted) => {
      songs.insert(converted);
    });
};

seedCouchDB(); // FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory