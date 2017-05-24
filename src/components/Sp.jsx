import React from 'react';
import LoginForm from './LoginForm';

export default class Sp extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false,
    };
  }

  render() {
    return (
      <div>
        {this.state.login === false && <LoginForm />}
      </div>
    );
  }
}
