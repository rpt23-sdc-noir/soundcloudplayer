const songData = require('./songData.js');
var key = require('./unsplashAccess.js');
var axios = require('axios');


var seederboi = async () => {
  // almost every Iron Maiden track name to randomly choose from
  var names = ['2 A.m.',
    '2 Minutes To Midnight',
    '22 Acacia Avenue',
    'Aces High',
    'Afraid To Shoot Strangers',
    'Age Of Innocence',
    'Alexander The Great',
    'Another Life',
    'Back In The Village',
    'Be Quick Or Be Dead',
    'Black Bart Blues',
    'Blood Brothers',
    "Blood On The World's Hand",
    'Brave New World',
    'Bring Your Daughter To The Slaughter',
    'Bring Your Daughter...to The Slaughter',
    'Can I Play With Madness',
    'Caught Somewhere In Time',
    'Chains Of Misery',
    'Charlotte The Harlot',
    "Childhood's End",
    'Children Of The Damned',
    'Como Estais Amigos',
    'Dance Of Death',
    'Deja—vu',
    'Die With Your Boots On',
    'Doctor, Doctor',
    "Don't Look To The Eyes Of A Stranger",
    'Dream Of Mirrors',
    'Drifter',
    'Face Inthe Sand',
    'Fates Warning',
    'Fear Is The Key',
    'Fear Of The Dark',
    'Fear Of The Dark (live At Rock In Rio)',
    'Flash Of The Blade',
    'Flight Of Icarus',
    'Fortunes Of War',
    'From Here To Eternity',
    'Futureal',
    'Gangland',
    'Gates Of Tomorrow',
    'Ghost Of The Navigator',
    'Hallowed Be Thy Name',
    'Heaven Can Wait',
    'Holy Smoke',
    'Hooks In You',
    'Infinite Dreams',
    'Innocent Exile',
    'Innocent Exile (live)',
    'Invaders',
    'Invasion',
    'Iron Maiden',
    'Journeyman',
    'Judas Be My Guide',
    'Judgement Of Heaven',
    'Judgment Of Heaven',
    'Killers',
    'Killers (live)',
    'Lightning Strikes Twice',
    'Look For The Truth',
    'Lord Of The Flies',
    'Man On The Edge',
    'Massacre',
    'Moonchild',
    'Mother Russia',
    'Murders In The Rue Morgue',
    'My Generation',
    'New Frontier',
    'No More Lies',
    'No Prayer For The Dying',
    'Only The Good Die Young',
    'Out Of The Silent Planet',
    'Paschendale',
    'Phantom Of The Opera',
    'Powerslave',
    'Prodigal Son',
    'Prowler',
    'Public Enemy Number One',
    'Purgatory',
    'Quest For Fire',
    'Rainmaker',
    'Remember Tomorrow',
    'Remember Tomorrow (live)',
    'Revelations',
    'Rime Of The Ancient Mariner',
    'Run Silent Run Deep',
    'Run To The Hills',
    'Running Free',
    'Running Free (live)',
    'Sanctuary',
    'Sea Of Madness',
    'Seventh Son Of A Seventh Son',
    'Sign Of The Cross',
    'Still Life',
    'Strange World',
    'Stranger In A Strange Land',
    'Sun And Steel',
    'Tailgunner',
    'The Aftermath',
    'The Angel And The Gambler',
    'The Apparition',
    'The Assassin',
    'The Clairvoyant',
    'The Duellists',
    'The Edge Of Darkness',
    'The Educated Fool',
    'The Evil That Men Do',
    'The Fallen Angel',
    'The Fugitive',
    'The Loneliness Of The Long Distance Runner',
    'The Mercenary',
    'The Nomad',
    'The Number Of The Beast',
    'The Prisoner',
    'The Prophecy',
    'The Thin Line Between Love And Hate',
    'The Trooper',
    'The Unbeliever',
    'The Wicker Man',
    'To Tame A Land',
    'Total Eclipse',
    'Twilight Zone',
    'Virus',
    'Wasted Years',
    'Wasting Love',
    'Weekend Warrior',
    'When Two Worlds Collide',
    'Where Eagles Dare',
    'Wildest Dreams',
    'Women In Uniform',
    'Wrathchild']


  var gotPhotos = await axios.get(`https://api.unsplash.com/search/photos/?query=music&client_id=${key.api_key}`)
  .then((res) => {
    return res.data.results
  }).catch((err) => {
    console.log('Error in retrieving photos yo');
    console.log(err);
  })


  var photos = gotPhotos.map(photo => {
    return photo.urls.raw
  })


  var deleted = await songData.deleteSongs();

  // Average Song length on SoundCloud is 3-5 minutes
  var min = Math.ceil(180); // 3 minutes converted to seconds
  var max = Math.floor(300); // 5 minutes
  for (var i = 1; i <= 100; i++) {
    var id = i;
    var dataToSave = { songID: id };
    dataToSave.songLength = Math.floor(Math.random() * (max - min) + min);
    dataToSave.songName = names[Math.floor(Math.random() * ((names.length - 1)))];
    dataToSave.songURL = 'https://rpt23-fec-soundcloud.s3-us-west-2.amazonaws.com/Djenty+Metal+Town%2C+USA.mp3'
    dataToSave.songImage = photos[Math.floor(Math.random() * ((photos.length - 1)))];
    // dataToSave.bandID = Math.floor(Math.random() * (30 - 1) + 1);
    var saved = await songData.saveSong(dataToSave);
  }
}

seederboi();

module.exports = {
  seederboi
};