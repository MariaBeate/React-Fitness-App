import React, { Component } from "react";
import "./style.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      // users: {},
      users: [],
      validUser: [],
      invalidUser: [],
      errors: {},
    };
    //  this.handleChange = this.handleChange.bind(this);
    this.OnSubmitLogin = this.OnSubmitLogin.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:9000/accounts")
      .then((response) => response.json())
      .then((user) => {
        this.setState({ users: user });
      });
  }

  handleChange(e) {
    let invalidUser = this.state.invalidUser;
    invalidUser[e.target.name] = e.target.value;
    this.setState({
      invalidUser: e.target.value,
      //user_name: e.target.value,
      //password: e.target.value,
    });
  }

  OnSubmitLogin(e) {
    e.preventDefault();

    let user = this.state.user;
    //user["user_name"] = "";
    // user["password"] = "";
    // this.state.user_name = e.target.value;
    // this.state.password = e.target.value;
    if (this.state.invalidUser === this.state.users) {
      this.setState({ user: user });

      console.log("Login Correct");
    } else {
      console.log("Daten Falsch");
    }
  }

  render() {
    return (
      <div className="logincontainer">
        <h1>Login</h1>
        <div
          onClick={() => {
            if (this.props.onClose) {
              this.props.onClose(true);
            }
          }}
          className="loginclose"
        >
          X
        </div>
        {this.state.users.map((user) => (
          <div className="loginform">
            <form onSubmit={this.OnSubmitLogin} key={user.id}>
              <label>Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Max Mustermann"
                name="name"
                value={user.user_name}
                // onChange={this.handleChange}
              />
              <small className="errorMsg">{this.state.errors.email}</small>
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="password"
                value={user.password}
                // onChange={this.handleChange}
              />
              <small className="errorMsg">{this.state.errors.password}</small>

              <input type="submit" className="btn" value="Login" />
            </form>
          </div>
        ))}
      </div>
    );
  }
}

export default Login;
