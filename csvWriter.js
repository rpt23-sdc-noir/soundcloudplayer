const axios = require('axios');
const key = require('./unsplashAccess.js');
const fs = require('fs');
const csv = require('csv-write-stream');
const writeDoc = csv();
// var testData = 100;
var scaledData = 10000000;

const createCSV = async () => {

  var names = [
    '2 A.m.',
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
    'Wrathchild'
  ];

  var gotPhotos = await axios.get(`https://api.unsplash.com/search/photos/?query=music&client_id=${key.api_key}`)
  .then((res) => {
    return res.data.results
  }).catch((err) => {
    console.log('Error retrieving photos from Unsplash API: ', err);
  });

  var photos = gotPhotos.map(photo => {
    return photo.urls.raw
  });

  // Average Song length on SoundCloud is 3-5 minutes
  var min = Math.ceil(180); // 3 minutes converted to seconds
  var max = Math.floor(300); // 5 minutes

  writeDoc.pipe(fs.createWriteStream('seedFile.csv'));
  for (var i = 0; i <= scaledData; i++) {
    writeDoc.write({
      song_id: i + 1,
      song_name: names[Math.floor(Math.random() * ((names.length - 1)))],
      song_length: Math.floor(Math.random() * (max - min) + min),
      song_url: 'https://rpt23-fec-soundcloud.s3-us-west-2.amazonaws.com/Djenty+Metal+Town%2C+USA.mp3',
      song_image: photos[Math.floor(Math.random() * ((photos.length - 1)))]
    });
  }
  writeDoc.end();
};

createCSV();
