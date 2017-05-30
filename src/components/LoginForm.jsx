import React from 'react';

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      error: '',
      disabled: true,
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

    // validation
    if (!event.target.value || event.target.value.length > 10) {
      this.setState({
        disabled: true,
      });
    } else {
      this.setState({
        disabled: false,
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
        <input type="submit" value="Submit" disabled={this.state.disabled} />
        {this.state.error && <p>{this.state.error}</p>}
      </form>
    );
  }
}
