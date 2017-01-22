import React, { Component } from 'react';

class SplashScreen extends Component {
  render() {
    return (
      <div onClick={this.props.onStart}>Click to start</div>
    );
  }
}

export default SplashScreen;