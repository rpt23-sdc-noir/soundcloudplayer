var express = require('express');
var songData = require('../songData');
var path = require('path');
var app = express();
var cors = require('cors');
var expressStaticGzip = require('express-static-gzip');
var port = 3005;
var Song = require('../models/songSchema.js');
var bodyParser = require('body-parser');

// ----------------------------------------------------- //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static('client'));
app.use('/', expressStaticGzip(path.join(__dirname, '../client'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
    res.setHeader("Cache-Control", "client, max-age=31536000");
  }
}));

app.use(cors());

// ----------------- CRUD API REQUESTS ------------------ //

app.get('/songdata/:id', async (req, res) => {
  try {
    var id = req.params.id;
    if (id > 100 || id < 0) {
      throw new Error(`songID: ${id} does not exist`);
    }
    var song = await Song.findOne({ songID: id });
    res.status(200).json({
      status: "Success",
      data: song
    });
  } catch (error) {
    console.log(error)
  }
});

// app.get('/songsByBandID/:id', async (req, res) => {
//   try {
//     var bandID = req.params.id;
//     if (bandID > 30 || bandID < 0) {
//       res.end('BAND ID DOES NOT EXIST');
//     } else {
//       var findSongsByBand = await songData.findSongsByBand(bandID)
//       res.send(findSongsByBand);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

app.post('/song', async (req, res) => {
  try {
    var song = await Song.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: song
    });
  } catch (error) {
    console.log('Error creating new song: ', error);
    res.status(400).json({
      status: 'Failed',
      data: error
    });
  }
});

app.put('/song/:id', async (req, res) => {
  try {
    var updatedSong = await songData.updateSong(req.params.id, req.body);
    res.status(200).json({
      status: 'Success',
      data: updatedSong
    });
  } catch (error) {
    console.log('Error updating song: ', error);
    res.status(400).json({
      status: 'Failed',
      data: error
    });
  }
});

app.delete('/songdata/:id', async (req, res) => {
  try {
    var deletedSong = await songData.deleteSong(req.params.id);
    res.status(202).json({
      status: 'Deleted requested song!',
      data: null
    });
  } catch (error) {
    console.log('Error deleting the desired song: ', error);
    res.status(400).json({
      status: 'Failed',
      data: error
    });
  }
});

// ---------------------------------------------------- //

app.get('/:current', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.listen(port, () => {
  console.log('Server is listening at http://localhost:' + port)
});

module.exports = app;