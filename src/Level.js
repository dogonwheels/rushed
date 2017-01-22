import React, { Component, PropTypes } from 'react';

class Level extends Component {
  render() {
    const {
      name,
      onLose,
      onWin
    } = this.props;

    return (
      <div>
        { name }
        <button onClick={() => onLose()}>Lose</button>
        <button onClick={() => onWin(1)}>Win - 1*</button>
        <button onClick={() => onWin(2)}>Win - 2*</button>
        <button onClick={() => onWin(3)}>Win - 3*</button>
      </div>
    );
  }
}

Level.PropTypes = {
  name: PropTypes.string,
  definition: PropTypes.object,
  onLose: PropTypes.func,
  onWin: PropTypes.func
};

export default Level;
