const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');
const knex = require('../knexConnection.js');
const bodyParser = require('body-parser');
const port = 3005;

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

// ---------------- CRUD FOR POSTGRESQL --------------- //

app.get('/songdata/:id', async (req, res) => {
  try {
    var id = req.params.id;
    if (id > 10000001 || id < 0) {
      res.status(404).json({
        status: 'Not Found',
        data: null
      });
    }
    var song = await knex('songs').where({ song_id: id });
    res.status(200).json({
      status: 'Success',
      data: song
    });
  } catch (error) {
    console.log('Error retrieving song: ', error);
    res.status(500).json({
      status: 'Failed',
      data: null
    })
  }
});

app.post('/song', async (req, res) => {
  try {
    var song = await knex('songs').insert(req.body);
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
    var updatedSong = await knex('songs').where({song_id: req.params.id}).update(req.body);
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
    if (id > 10000001 || id < 0) {
      res.status(404).json({
        status: 'Failed for invalid song_id',
        data: null
      });
    }
    var deletedSong = await knex('songs').where({ song_id: req.params.id}).del();
    res.status(200).json({
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