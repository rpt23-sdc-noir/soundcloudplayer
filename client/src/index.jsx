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
      currentHashtags: [],
      currentBandID: '',
      currentBandName: '',
      currentUpload: '1 month ago'
    }
    // this.url = "https://rpt23-fec-soundcloud.s3-us-west-2.amazonaws.com/Djenty+Metal+Town%2C+USA.mp3";
    this.song_id = window.location.pathname.substring(1);
  }

  // frame() {
  //   var song = this.audio
  //   console.log(song);
  //   var seek = song.seek() || 0;
  //   var progressBar = document.getElementById('progress-bar');
  //   progressBar.style.width = (((seek / song.duration()) * 100) || 0) + '%';
  //   if (song.playing()) {
  //     requestAnimationFrame(this.frame);
  //   }

  // }


  componentDidMount() {
    $.ajax({
      type: "GET",
      url: `http://localhost:3005/songdata/${this.song_id}`,
      success: (res) => {
        console.log('Response: ', res);
        this.setState({
          currentSong: this.audio = new Howl({
            src: [res.data[0].song_url],
            // onplay: () => { requestAnimationFrame(this.frame) }
          }),
          currentPicture: res.data[0].song_image,
          currentSongName: res.data[0].song_name
        }, () => {
          console.log('Updated state: ', this.state);
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
    // $.ajax({
    //   type: "GET",
    //   url: `http://localhost:4001/hashtags/${this.songId}`,
    //   success: (res) => {
    //     var hashtags = res.data;
    //     this.state.currentHashtags = hashtags;
    //     // this.setState({
    //     //   currentHashtags: res.data
    //     // })
    //   }
    // })
    // $.ajax({
    //   type: "GET",
    //   url: `http://localhost:2000/artistBio/${this.songId}`,
    //   success: (res) => {
    //     this.setState({
    //       currentBandID: res.data.bandId,
    //       currentBandName: res.data.bandName
    //     })
    //   }
    // })
  }

  // componentWillUnmount() {
  //   this.audio.removeEventListener('ended', () => this.setState({ playing: false }));
  // }

  togglePlay() {
    console.log(this.audio);
    this.setState({ playing: !this.state.playing }, () => {
      this.state.playing ? this.audio.play() : this.audio.pause();
    });
  }

  render() {
    return (
      <div className="frankie-content">
        <div className="frankie-banner">
          <div className="frankie-song-area">
            <div className="frankie-song-info">
              <div className="frankie-top-player">
                <button className={`frankie-top-player-button ${this.state.playing}`}onClick={() =>
                  { this.togglePlay() }}></button>
                {/* <button className="frankie-top-player-button" onClick={() =>
                  { this.togglePlay() }}>
                    {this.state.playing ? 'Pause' : 'Play'}
                </button> */}
              </div>
              <div className="frankie-info-container">
                <div className="frankie-user-container">
                  <div className="frankie-userName">{this.state.currentBandName}</div>
                </div>
                <div className="frankie-songName">{this.state.currentSongName}</div>
              </div>
            </div>
            <div className="frankie-descrip-container">
              <div className="frankie-upload-container">{this.state.currentUpload}</div>
              <div className="frankie-hashtags">{this.state.currentHashtags.map(hashtag => {
                return <div className="frankie-hashtag-container">{'#' + hashtag}</div>
              })}</div>
            </div>
            <div className="frankie-pictureContainer">
              <img className="frankie-songPicture" src={this.state.currentPicture}></img>
            </div>
            <div className="frankie-progress-area">
              <div className="frankie-progress-container">
                <div className="frankie-progress-bar">progress bar goes here</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Player />,
  document.getElementById('frankie-player')
);