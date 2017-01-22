import React, { Component } from 'react';
import levels from './data/levels';
import Level from './Level';
import Map from './Map';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      isSelectingLevel: true,
      completedLevels: {},
      currentLevelIndex: null
    }
  }

  selectLevel() {
    this.setState({
      isSelectingLevel: true,
      currentLevelIndex: null
    })
  }

  playLevel(currentLevelIndex) {
    this.setState({
      isSelectingLevel: false,
      currentLevelIndex
    })
  }

  nextLevel(score) {
    const previousScore = this.state.completedLevels[this.state.currentLevelIndex] || 0;
    const completedLevels = {
      ...this.state.completedLevels,
      [this.state.currentLevelIndex]: Math.max(previousScore, score)
    };

    const currentLevelIndex = this.state.currentLevelIndex + 1;

    this.setState({
      completedLevels,
      currentLevelIndex,
    });
  }

  render() {
    const {
      isSelectingLevel,
      completedLevels,
      currentLevelIndex
    } = this.state;

    const currentLevel = levels[currentLevelIndex];

    return (
      <div className="game">
        { isSelectingLevel ?
            <div>
              <Map
                levelPositions={levels}
                completedLevels={completedLevels}
                onSelectLevel={(levelIndex) => this.playLevel(levelIndex)}
              />
              <div onClick={this.props.onEnd}>Go back to splash</div>
            </div> :
            <Level
              name={currentLevel.name}
              definition={currentLevel.definition}
              onLose={() => this.selectLevel()}
              onWin={(previousScore) => this.nextLevel(previousScore)}
            />
        }
      </div>
    );
  }
}

export default Game;