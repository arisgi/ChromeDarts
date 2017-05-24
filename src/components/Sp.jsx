import React from 'react';
import io from 'socket.io-client';
import LoginForm from './LoginForm';

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

  render() {
    return (
      <div>
        {this.state.login === false && <LoginForm handleLogin={this.handleLogin} errorMessage={this.state.errorMessage} />}
      </div>
    );
  }
}
