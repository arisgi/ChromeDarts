import React from 'react';

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '#ff0000',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // validation
    if (!/^#[0-9|a-f|A-F]{6}$/.test(event.target.value)) {
      this.setState({
        error: 'カラーコードを選択してください。',
      });
    } else {
      this.setState({
        value: event.target.value,
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
        <p>ダーツの色を選択してください。</p>
        <select name="color" onChange={this.handleChange}>
          <option value="#ff0000">レッド</option>
          <option value="#ffa500">オレンジ</option>
          <option value="#ffff00">イエロー</option>
          <option value="#008000">グリーン</option>
          <option value="#0000ff">ブルー</option>
          <option value="#4b0082">インディゴ</option>
          <option value="#800080">パープル</option>
        </select>
        <input type="submit" value="決定" />
        {this.state.error && <p>{this.state.error}</p>}
      </form>
    );
  }
}
