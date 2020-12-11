const database = require('../db/pg_db.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index.js');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Test .post (CREATE)

describe('Should Save (CREATE) a Song', () => {
  it('Should save a new song to the database', (done) => {
    chai.request(app)
      .post('/song')
      .set('Content-Type', 'application/json')
      .send({
        "song_id": 10000001,
        "song_name": "Test Song",
        "song_length": 203,
        "song_url": "I am a URL",
        "song_image": "I am a song image"
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.an("object");
        expect(res.body.data.song_id).to.be.eql(10000001);
        expect(res.body.data.song_name).to.be.a("string");
        expect(res.body.data.song_id).to.be.a("number");
        done();
      });
  });
});

// Test .get (READ)

describe('Should Find (READ) a Song', () => {
  it('Should return a song with a song_id of 1', (done) => {
    chai.request(app)
      .get('/songdata/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data[0].song_id).to.be.eql(1);
        expect(res.body.data[0]).to.be.an("object");
        expect(res.body.data[0].song_name).to.be.a("string");
        expect(res.body.data[0].song_id).to.be.a("number");
        done();
      });
  });
});

// Test .put (UPDATE)

describe('Should Update (UPDATE) a Song', () => {
  it('Should replace the song_name property with a new song name', (done) => {
    chai.request(app)
      .put('/song/47')
      .set('Content-Type', 'application/json')
      .send({
        "song_name": 'New Song Name Test'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an("object");
        expect(res.body.data.song_name).to.be.a("string");
        expect(res.body.data.song_name).to.be.eql("New Song Name Test");
        done();
      });
  });
});

// Test .delete (DELETE)

describe('Delete Single Song', () => {
  it('Should DELETE one song in DB at input song_id', async () => {
    chai.request(app)
      .delete('/songdata/10000001')
      .end((err, res) => {
        expect(res.body.status).to.be.eql('Deleted requested song!')
        expect(res.body.data).to.be.eql(null);
      })
  });
});

// Invalid song_id GET request (READ)

describe('Invalid "song_id" Request', () => {
  it('Should return an error for an invalid song_id request', async() => {
    chai.request(app)
      .get('/songdata/10000002')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.be.eql('Failed for invalid song_id');
      });
  })
})