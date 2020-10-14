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
  songURL: String,
  songImage: String,
  bandID: Number
});

const Song = mongoose.model('Song', songDataSchema);

var saveSong = async (songData, callback) => {
  try {
    let song = new Song(songData);
    var saved = await song.save(( ) => {
      return('Song saved');
    })
  } catch(error) {
    console.error(error);
  }
};

var deleteSongs = async () => {
  try {
    var deleted = await Song.deleteMany({ });
    return (deleted);
  } catch(error) {
    console.error(error);
  }
};

var findSong = async (id) => {
  try {
    var found = await Song.findOne({ songID: id })
    return found;
  } catch (error) {
    console.error(error);
  }
}

var countSongs = async () => {
  try {
    var counted = await Song.countDocuments({ });
    return counted;
  } catch(error) {
    return('Error in counting songs in DB');
  }
}

var findSongsByBand = async (id) => {
  try {
    var found = await Song.find({ 'bandID': id});
    return found;
  } catch(error) {
    return(`Error in finding songs associated by bandID ${id}`)
  }
}

module.exports = {
  saveSong,
  deleteSongs,
  findSong,
  countSongs,
  findSongsByBand
}