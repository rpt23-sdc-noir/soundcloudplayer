const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/player');

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Could not connect to Mongo server...');
  console.log(err);
});

db.on('open', (ref) => {
  console.log('Connected to Mongo server...');
});

const songDataSchema = new mongoose.Schema({
  songName: String,
  songLength: Number,
  songID: Number,
  songURL: String
});

const Song = mongoose.model('Song', songDataSchema);

var saveSong = (songData, callback) => {
  let song = new Song(songData);
  song.save((err, data) => {
    if (err) {
      console.log('Error in saving song to db');
      callback(err);
    } else {
      console.log(`Song, "${song.songName}" saved to DB`);
      callback(null, data);
    }
  })
};

var deleteSongs = (callback) => {
  Song.deleteMany({ }, (err, song) => {
    if (err) {
      console.log(`Error in deleting songs in DB!`);
      callback(err);
    } else {
      callback(null, 'Songs deleted from DB');
    }
  })
};

module.exports = {
  saveSong,
  deleteSongs
}