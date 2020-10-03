var express = require('express');
var bodyParser = require('body-parser');
var songData = require('../songData');
var path = require('path');
var app = express();
var port = 3000;

app.use(express.static(path.join(__dirname + '../client')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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