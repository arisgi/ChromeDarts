import React from 'react';

/* global window */

export default class DartsRoom extends React.Component {
  constructor() {
    super();
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
    this.props.handleThrow(this.state);
  }

  render() {
    return (
      <div className="darts-room">
        <button type="button" onTap={this.handleClick} />
      </div>
    );
  }
}
