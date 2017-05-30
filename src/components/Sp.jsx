import React from 'react';
import io from 'socket.io-client';
import LoginForm from './LoginForm';
import DartsRoom from './DartsRoom';

export default class Sp extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false,
      name: '名無し',
      errorMessage: '',
      throwData: {
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
      },
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleThrow = this.handleThrow.bind(this);

    this.socket = io();
  }

  handleLogin(name) {
    this.socket.emit('login', name);

    // variable to avoid binding of this
    const socket = this.socket;
    let loginName = this.state.name;

    this.socket.on('success', () => {
      this.setState({
        login: true,
        name,
      });
    });

    this.socket.on('reject', () => {
      this.setState({
        errorMessage: 'ダーツルームは満席です。',
      });
    });
  }

  handleThrow(data) {
    this.setState({
      throwData: {
        orientation: {
          x: data.orientation.x,
          y: data.orientation.y,
          z: data.orientation.z,
        },
        acceleration: {
          x: data.acceleration.x,
          y: data.acceleration.y,
          z: data.acceleration.z,
        },
      },
    });

    this.socket.emit('throw', this.state.throwData);
  }

  render() {
    return (
      <div>
        {this.state.login === false && <LoginForm handleLogin={this.handleLogin} errorMessage={this.state.errorMessage} />}
        {this.state.login === true && <DartsRoom handleThrow={this.handleThrow} />}
      </div>
    );
  }
}
