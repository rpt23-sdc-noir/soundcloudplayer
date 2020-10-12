var express = require('express');
var songData = require('../songData');
var app = express();
var port = 1000;

app.use(express.static('client'));

// INCLUDE "try" AND "catch" IN THE ASYNC AWAIT BELOW

app.get('/songdata/:id', async (req, res) => {
  try {
    var id = req.params.id;
    if (id > 100 || id < 0) {
      res.end('SONG DOES NOT EXIST');
    } else {
      var findSongByID = await songData.findSong(id)
      res.send(findSongByID);
    }
  } catch (error) {
    console.log(error)
  }
});

app.listen(port, () => {
  console.log('Server is listening at http://localhost:' + port)
});