import React, { Component, PropTypes } from 'react';

class Map extends Component {
  render() {
    const {
      levelPositions,
      completedLevels,
      onSelectLevel
    } = this.props;

    const nextLevelIndex = Object.keys(completedLevels).length;

    return (
      <div>
        {
          levelPositions.slice(0, nextLevelIndex).map(({ x, y }, index) => (
            <div key={index}>
              {index}, {completedLevels[index]}
              <button onClick={() => onSelectLevel(index)}>Play</button>
            </div>
          ))
        }
        <div>
          <button onClick={() => onSelectLevel(nextLevelIndex)}>
            Play level {nextLevelIndex}
          </button>
        </div>
      </div>
    );
  }
}

Map.PropTypes = {
  levelPositions: PropTypes.array,
  completedLevels: PropTypes.object,
  onSelectLevel: PropTypes.func
};

export default Map;