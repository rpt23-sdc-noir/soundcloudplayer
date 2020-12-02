const mongoose = require('mongoose');
const database = require('../songData');
const seeding = require('../seedingScript');
const Song = require('../models/songSchema.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index.js');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// TEST DATABASE

describe('findSong function', () => {
  it('Should GET song data for song with id of 1', async () => {
    var songData = await database.findSong(1);
    songData.should.be.a('object');
  });
});

// Test .post (CREATE)

describe('Should save (CREATE) a song', () => {
  it('Should save a new song to the database', (done) => {
    chai.request(app)
      .post('/song')
      .set('Content-Type', 'application/json')
      .send({
        "songID": 101,
        "songLength": 203,
        "songName": "New Song Test",
        "songURL": "I am a URL",
        "songImage": "I am a song image"
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equals("Success");
        expect(res.body.data).to.be.an("object");
        expect(res.body.data.songID).to.be.eql(101);
        expect(res.body.data.songName).to.be.a("string");
        expect(res.body.data.songID).to.be.a("number");
        done();
      });
  });
});

// Test .get (READ)

describe('Should find (READ) a song', () => {
  it('Should return a song with a songID of 1', (done) => {
    chai.request(app)
      .get('/songdata/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("Success");
        expect(res.body.data).to.be.an("object");
        expect(res.body.data.songID).to.be.eql(1);
        expect(res.body.data.songName).to.be.a("string");
        expect(res.body.data.songID).to.be.a("number");
        done();
      });
  });
});

// Test .put (UPDATE)

describe('Should update (UPDATE) a song', () => {
  it('Should replace the songName property with a new song name', (done) => {
    chai.request(app)
      .put('/song/1')
      .set('Content-Type', 'application/json')
      .send({
        "songName": 'New Song Name Test'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("Success");
        expect(res.body.data).to.be.an("object");
        expect(res.body.data.songID).to.be.eql(1);
        expect(res.body.data.songName).to.be.a("string");
        expect(res.body.data.songName).to.be.eql("New Song Name Test");
        expect(res.body.data.songID).to.be.a("number");
        done();
      });
  });
});

// Test .delete (DELETE)

describe('Delete Single Song', () => {
  it('Should DELETE one song in DB at input songID', async () => {
    chai.request(app)
      .delete('/songdata/1')
      .end((err, res) => {
        expect(res.body.status).to.be.eql('Deleted requested song!')
        expect(res.body.data).to.be.eql(null);
      })
  });
});

// Test DELETE ALL

describe('deleteSongs function', () => {
  it('Should DELETE all songs in DB', async () => {
    var deleted = await database.deleteSongs();
    var count = await database.countSongs();
    count.should.be.eql(0);
  });
});