import React, { Component } from 'react';
import Game from './Game';
import SplashScreen from './SplashScreen';
import './App.css';

import level from './data/levels/level-one';

class App extends Component {
  constructor() {
    super();

    this.state = {
      playing: false
    };

    console.dir(level);
  }

  startGame() {
    this.setState({ playing: true });
  }

  endGame() {
    this.setState({ playing: false });
  }

  render() {
    return (
      <div className="app">
        { this.state.playing ?
          <Game onEnd={ () => this.endGame() }/> :
          <SplashScreen onStart={ () => this.startGame() }/>
        }
      </div>
    );
  }
}

export default App;
