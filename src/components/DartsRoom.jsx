import React from 'react';

/* global window */

export default class DartsRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      acceleration: {
        x: null,
        y: null,
        z: null,
      },
    };
    this.handleDeviceMotion = this.handleDeviceMotion.bind(this);

    window.addEventListener('devicemotion', this.handleDeviceMotion);
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
        {this.state.acceleration.x && <p>acceleration x : {this.state.acceleration.x}</p>}
        {this.state.acceleration.y && <p>acceleration y : {this.state.acceleration.y}</p>}
        {this.state.acceleration.z && <p>acceleration z : {this.state.acceleration.z}</p>}
      </div>
    );
  }
}
