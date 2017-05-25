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
    };
    this.handleLogin = this.handleLogin.bind(this);

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

      loginName = name;
    });

    this.socket.on('reject', () => {
      this.setState({
        errorMessage: 'ダーツルームは満席です。',
      });
    });

    // tell the server that I'm logged in
    this.socket.on('check-login', (users) => {
      for (let i = 0; i < 2; i += 1) {
        if (users[i] === loginName) {
          socket.emit('login-now', loginName);
        }
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.login === false && <LoginForm handleLogin={this.handleLogin} errorMessage={this.state.errorMessage} />}
        {this.state.login === true && <DartsRoom />}
      </div>
    );
  }
}
