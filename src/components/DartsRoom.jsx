import React from 'react';

/* global window, document */

export default class DartsRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: {
        x: null,
        y: null,
        z: null,
      },
      acceleration: {
        x: null,
        y: null,
        z: null,
      },
    };
    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this);
    this.handleDeviceMotion = this.handleDeviceMotion.bind(this);
    this.handleClick = this.handleClick.bind(this);

    window.addEventListener('deviceorientation', this.handleDeviceOrientation);
    window.addEventListener('devicemotion', this.handleDeviceMotion);

    this.btnStyle = {
      background: this.props.color,
    };
  }

  handleDeviceOrientation(event) {
    this.setState({
      orientation: {
        x: event.beta,
        y: event.gamma,
        z: event.alpha,
      },
    });
  }

  handleDeviceMotion(event) {
    this.setState({
      acceleration: {
        x: event.acceleration.x,
        y: event.acceleration.y,
        z: event.acceleration.z,
      },
    });
  }

  handleClick() {
    if (this.state.acceleration.y > 0) {
      this.props.handleThrow(this.state);
      document.getElementById('audio').play();
    }
  }

  render() {
    return (
      <div className="darts-room">
        <button style={this.btnStyle} type="button" onClick={this.handleClick} />
        <audio id="audio">
          <source src="/audio/throw.mp3" type="audio/mp3" />
        </audio>
      </div>
    );
  }
}
