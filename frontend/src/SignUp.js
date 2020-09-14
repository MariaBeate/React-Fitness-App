import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordRepeat = this.onChangePasswordRepeat.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      credentials: {
        id: "",
        username: "",
        password: "",
        password_repeat: "",
      },
    };
  }

  componentDidMount() {}
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangePasswordRepeat(e) {
    this.setState({
      password_repeat: e.target.value,
    });
  }
  handleSignUp() {
    //essen.preventDefault();
    fetch("http://localhost:9000/api/sign-up", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        password_repeat: this.state.password_repeat,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.props.en);
    if (!this.props.en) {
      return (
        <div className="form">
          <div className="heading">Registrierung</div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              onChange={this.onChangeUsername}
              name="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              onChange={this.onChangePassword}
              name="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password_repeat">Passwort wiederholen</label>
            <input
              type="password"
              className="form-control"
              id="password_repeat"
              required
              onChange={this.onChangePasswordRepeat}
              name="password_repeat"
            />
          </div>
          <button onClick={this.handleSignUp} className="button success">
            Registrieren
          </button>
        </div>
      );
    } else {
      return (
        <div className="form">
          <div className="heading">Register</div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              onChange={this.onChangeUsername}
              name="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              onChange={this.onChangePassword}
              name="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password_repeat">Repeat password</label>
            <input
              type="password"
              className="form-control"
              id="password_repeat"
              required
              onChange={this.onChangePasswordRepeat}
              name="password_repeat"
            />
          </div>
          <button onClick={this.handleSignUp} className="button success">
            Sign up
          </button>
        </div>
      );
    }
  }
}
