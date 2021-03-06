import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.setState({ isLoggedIn: this.props.isLoggedIn });
    }
  }
  render() {
    if (this.props.isLoggedIn === true) {
      return <Redirect to="/" />;
    } else if (!this.props.en) {
      return (
        <div className="form">
          <div className="heading">Login</div>
          <div className="form-group">
            <label htmlFor="username">Benutzername</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              onChange={this.props.onChangeUsername}
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
              onChange={this.props.onChangePassword}
              name="password"
            />
          </div>
          <button onClick={this.props.handleLogin} className="button success">
            Login
          </button>
        </div>
      );
    } else {
      return (
        <div className="form">
          <div className="heading">Login</div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              onChange={this.props.onChangeUsername}
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
              onChange={this.props.onChangePassword}
              name="password"
            />
          </div>
          <button onClick={this.props.handleLogin} className="button success">
            Login
          </button>
        </div>
      );
    }
  }
}
