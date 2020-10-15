import React from 'react';
import ReactDOM from 'react-dom';
import { Howl, Howler } from 'howler';
import $ from 'jquery';
import '../clientstyles.css'

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentSong: '',
      currentPicture: '',
      currentSongName: '',
      currentHashtags: '',
      currentBandID: ''
    }
    // this.url = "https://rpt23-fec-soundcloud.s3-us-west-2.amazonaws.com/Djenty+Metal+Town%2C+USA.mp3";
    this.songId = window.location.pathname.substring(1);

  }

  initialize() {
    console.log(this.id);
    $.ajax({
      type: "GET",
      url: `http://localhost:1000/songdata/${this.songId}`,
      success: (res) => {
        this.setState({
          currentSong: res.songURL,
          currentPicture: res.songImage,
          currentSongName: res.songName
         })
        this.audio = new Howl({
          src: [this.state.currentSong]
        })
        console.log(this.state);
      }
    })
  }

  componentDidMount() {
    this.initialize();
    console.log(this.state);
  }

  // componentWillUnmount() {
  //   this.audio.removeEventListener('ended', () => this.setState({ playing: false }));
  // }

  togglePlay() {
    this.setState({ playing: !this.state.playing }, () => {
      this.state.playing ? this.audio.play() : this.audio.pause();
    });
  }

  render() {
    return (
      <div className="frankie-top-player">
        <p>{this.state.currentSongName}</p>
        <button className="frankie-top-player-button" onClick={() => { this.togglePlay() }}>{this.state.playing ? 'Pause' : 'Play'}</button>
        <img className="songPicture" src={this.state.currentPicture}></img>
      </div>
    );
  }
}

ReactDOM.render(
  <Player />,
  document.getElementById('frankie-player')
);