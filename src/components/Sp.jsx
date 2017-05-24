import React from 'react';
import LoginForm from './LoginForm';

export default class Sp extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false,
      name: '名無し',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(name) {
    this.setState({
      login: true,
      name,
    });
  }

  render() {
    return (
      <div>
        {this.state.login === false && <LoginForm handleLogin={this.handleLogin} />}
      </div>
    );
  }
}
