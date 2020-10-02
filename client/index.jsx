

class Player extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentSong: '',
      songs: []
    }
  }
  render() {
    <button>play</button>
  }
}

ReactDom.render(
  <Player />,
  document.getElementById('Frankie_Player')
);