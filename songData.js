var Song = require('./models/songSchema.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/player', {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Could not connect to Mongo server...');
  console.log(err);
});

db.on('open', (ref) => {
  console.log('Connected to Mongo server...');
});

// ------- CREATE/SAVE -------- //

var saveSong = async (songData, callback) => {
  try {
    let song = new Song(songData);
    var saved = await song.save(( ) => {
      return('Song saved');
    })
  } catch (error) {
    console.error(error);
  }
};

// --------- DELETE ----------- //

var deleteSongs = async () => {
  try {
    var deleted = await Song.deleteMany({});
    return (deleted);
  } catch (error) {
    console.error(error);
  }
};

var deleteSong = async (id) => {
  try {
    var deletedSong = await Song.deleteOne({songID: id});
    return deletedSong;
  } catch (error) {
    console.error(error);
  }
};

// --------- FIND ----------- //

var findSong = async (id) => {
  try {
    var found = await Song.findOne({ songID: id });
    return found;
  } catch (error) {
    console.error(error);
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

// ----------- COUNT ------------- //

var countSongs = async () => {
  try {
    var counted = await Song.countDocuments({ });
    return counted;
  } catch(error) {
    return('Error in counting songs in DB');
  }
}

// ----------- UPDATE ------------- //

var updateSong = async (id, data) => {
  try {
    var updated = await Song.findOneAndUpdate({ songID: id }, data, { new: true });
    return updated;
  } catch (error) {
    return ('Error updating song: ', error);
  }
}

// ----------- EXPORTS ------------ //


module.exports = {
  saveSong,
  deleteSongs,
  deleteSong,
  findSong,
  countSongs,
  findSongsByBand,
  updateSong
}