var Song = require('../songData');
var seeding = require('../seedingScript')

beforeEach(async () => {
  await Song.deleteSongs();
  await seeding.seederboi();
})
describe('seedingScript function', () => {
  it('Should seed 100 songs into MongoDB', async() => {
    var counted = await Song.countSongs();
    counted.should.be.eql(100);
  })
})

describe('findSong function', () => {
  it('Should GET song data for song with id of 1', async() => {
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

