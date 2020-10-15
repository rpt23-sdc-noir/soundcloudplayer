var Song = require('../songData');
var seeding = require('../seedingScript');
var request = require('supertest');
var express = require('express');
var chai = require('chai');
var should = chai.should();

var app = express();

app.get('/songdata', (req, res) => {
  res.status(200)
})

beforeEach(async () => {
  await Song.deleteSongs();
  await seeding.seederboi();
})
describe('seedingScript function', () => {
  it('Should seed 100 songs into MongoDB', async () => {
    var counted = await Song.countSongs();
    counted.should.be.eql(100);
  })
})

describe('findSong function', () => {
  it('Should GET song data for song with id of 1', async () => {
    var songData = await Song.findSong(1)
    songData.should.be.a('object');
  })
})
describe('deleteSongs function', () => {
  it('Should DELETE all songs in DB', async () => {
    var deleted = await Song.deleteSongs()
    var count = await Song.countSongs();
    count.should.be.eql(0);
  })
})

//need a test to show if db is down
//need test to consider if user inputs wrong song id
//need test to consider success (probs use find song)

describe('GET /songdata/:id', () => {
  it('Should respond with a JSON object', (done) => {
    request(app)
      .get('/songdata/' + 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(200)
    done();
  })
});

// describe('GET /songsByBandID/:id', () => {
//   it('Should respond with a JSON object with atleast one song with bandID', (done) => {
//     request(app)
//       .get('/songsByBandID/' + 3)
//       .set('Accept', 'application/json')
//       .expect('Content-Type', "text/html; charset=utf-8")
//       .expect(200)
//     done();
//   })
// });

describe(`Should only get data for valid id's`, () => {
  it('Should respond with a 400 if incorrect song id', (done) => {
    request(app)
    .get('/songdata/0')
    .expect(404)
    .end((err, res) => {
      if(err) {
        done(err)
      } else {
        done();
      }
    })
  })
})

// describe(`Should only get data for valid band id's`, () => {
//   it('Should respond with a 400 if incorrect song id', (done) => {
//     request(app)
//     .get('/songsByBandID/0')
//     .expect(404)
//     .end((err, res) => {
//       if(err) {
//         done(err)
//       } else {
//         done();
//       }
//     })
//   })
// })

describe(`Shouldn't be able to save anything to DB from POST`, () => {
  it('Should response with a 100 for bad request', (done) => {
    request(app)
    .post('/songdata')
    .send({"id" : 1})
    .expect(404)
    .end((err, res) => {
      if(err) {
        done(err)
      } else {
        done(err)
      }
    })
  })
})