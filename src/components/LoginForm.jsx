import React from 'react';

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });

    // error message
    if (event.target.value.length >= 10) {
      this.setState({
        error: '10文字以内で入力してください。',
      });
    } else {
      this.setState({
        error: '',
      });
    }
  }

  handleSubmit(event) {
    this.props.handleLogin(event.target.children[0].value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
        {this.state.error && <p>{this.state.error}</p>}
      </form>
    );
  }
}
