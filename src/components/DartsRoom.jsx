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

  render() {
    return (
      <div>
        {this.state.orientation.x && <p>orientation x : {this.state.orientation.x}</p>}
        {this.state.orientation.y && <p>orientation y : {this.state.orientation.y}</p>}
        {this.state.orientation.z && <p>orientation z : {this.state.orientation.z}</p>}
        {this.state.acceleration.x && <p>acceleration x : {this.state.acceleration.x}</p>}
        {this.state.acceleration.y && <p>acceleration y : {this.state.acceleration.y}</p>}
        {this.state.acceleration.z && <p>acceleration z : {this.state.acceleration.z}</p>}
      </div>
    );
  }
}
