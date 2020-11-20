const mongoose = require('mongoose');

const songDataSchema = new mongoose.Schema({
  songName: String,
  songLength: Number,
  songID: Number,
  songURL: String,
  songImage: String,
  bandID: Number
});

const Song = mongoose.model('Song', songDataSchema);

module.exports = Song;