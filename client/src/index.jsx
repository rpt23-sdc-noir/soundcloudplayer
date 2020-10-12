import React from 'react';
import ReactDOM from 'react-dom';
import {Howl, Howler} from 'howler';
import $ from 'jquery';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentSong: 'https://rpt23-fec-soundcloud.s3-us-west-2.amazonaws.com/Djenty+Metal+Town%2C+USA.mp3',
      currentPicture: '',
      currentSongName: '',
      currentHashtags: ''
    }
    // this.url = "https://rpt23-fec-soundcloud.s3-us-west-2.amazonaws.com/Djenty+Metal+Town%2C+USA.mp3";
    this.audio = new Howl({
      src: [this.state.currentSong]
    })
  }

  initialize() {
    $.ajax({
      type:"GET",
      url: 'https://localhost:1000/songdata/1',
      success: (res) => {
        console.log(res);
      }
    })
  }

  componentDidMount() {
    this.initialize();
    console.log('initialized');
  }

  // componentWillUnmount() {
  //   this.audio.removeEventListener('ended', () => this.setState({ playing: false }));
  // }

  togglePlay() {
    this.setState({ playing: !this.state.playing }, () => {
      this.state.playing ? this.audio.play() : this.audio.pause();
    });
    // audio.play()
  }

  render () {
    return (
      <div className="frankie-top-player">
        <button className="frankie-top-player-button" onClick={() => {this.togglePlay()}}>{this.state.playing ? 'Pause' : 'Play'}</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Player />,
  document.getElementById('frankie-player')
);