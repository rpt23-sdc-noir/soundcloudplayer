require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');
const knex = require('../knexConnection.js');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const port = 3005;

// REDIS
const redis = require('redis');
const client = redis.createClient();

// Middleware/Compression

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

// CHECK CACHE

checkCache = (req, res, next) => {
  const { id } = req.params;
// get value to pair with song_id key
  client.get(id, (err, data) => {
    console.log('ID: ', id);
    console.log('Data: ', data);
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    if (data !== null) {
      res.status(200).send({
        success: true,
        data: data
      });
    } else {
      // proceed to next middleware function
      next();
    }
  });
};

// ---------------- CRUD FOR POSTGRESQL --------------- //

// CREATE

app.post('/song', async (req, res) => {
  try {
    var song = await knex('song_list').insert(req.body);
    // console.log('CREATE SONG request data: ', req.body);
    res.status(201).json({
      status: 'Success',
      data: req.body
    });
  } catch (error) {
    console.log(chalk.red('Error creating new song: ', error));
    res.status(400).json({
      status: 'Failed',
      data: error
    });
  }
});

// READ
app.get('/songdata/:id', checkCache, async (req, res) => {
// app.get('/songdata/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id > 10000000 || typeof Number(id) !== 'number') {
      res.status(404).json({
        status: 'Failed for invalid song_id',
        data: null
      });
    } else {
      var song = await knex('song_list').where({ song_id: id });
      client.setex(id, 3600, JSON.stringify(song)); // REDIS -> Key/Value pair set to expire in 1 hour (3600s)
      res.status(200).json({
        status: 'Success',
        data: song
      });
    }
  } catch (error) {
    console.log(chalk.red('Error retrieving song: ', error));
    res.status(500).json({
      status: 'Failed',
      data: null
    })
  }
});

// UPDATE

app.put('/song/:id', async (req, res) => {
  try {
    var updatedSong = await knex('song_list').where({song_id: req.params.id}).update(req.body);
    res.status(200).json({
      status: 'Success',
      data: req.body
    });
  } catch (error) {
    console.log(chalk.red('Error updating song: ', error));
    res.status(400).json({
      status: 'Failed',
      data: error
    });
  }
});

// DELETE

app.delete('/songdata/:id', async (req, res) => {
  var { id } = req.params;
  try {
    if (typeof Number(id) !== 'number') {
      res.status(404).json({
        status: 'Failed for invalid song_id',
        data: null
      });
    } else {
      var deletedSong = await knex('song_list').where({ song_id: req.params.id}).del();
      res.status(200).json({
        status: 'Deleted requested song!',
        data: null
      });
    }
  } catch (error) {
    console.log(chalk.red('Error deleting the desired song: ', error));
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
  console.log(chalk.magenta('Server is listening at http://localhost:' + port));
});

module.exports = app;