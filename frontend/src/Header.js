import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//import { Button } from "reactstrap";
import logo from "./assets/images/logo.png";
import "./style.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      en: this.props.en, //if true = english rendering
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.setState({ isLoggedIn: this.props.isLoggedIn });
    }
    if (prevProps.en !== this.props.en) {
      this.setState({ en: this.props.en });
    }
  }

  render() {
    if (this.props.isLoggedIn === true) {
      return (
        <div className="header">
          <div className="container">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="navbar">
              <ul>
                <li>
                  <NavLink to="/" exact activeStyle={{ color: "#fff" }}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/FitnessplanAdmin"
                    exact
                    activeStyle={{ color: "#fff" }}
                  >
                    Fitnessplan
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/FitnessInfoAdmin"
                    exact
                    activeStyle={{ color: "#fff" }}
                  >
                    Fitness Info
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    exact
                    activeStyle={{ color: "#fff" }}
                    onClick={this.props.handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
                <button id="EN" name="EN" onClick={this.props.handleLanguageEN}>
                  EN
                </button>
                <button id="DE" name="DE" onClick={this.props.handleLanguageDE}>
                  DE
                </button>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="container">
            <div className="logo">
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
            </div>
            <div className="navbar">
              <ul>
                <li>
                  <NavLink to="/" exact activeStyle={{ color: "#fff" }}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Fitnessplan"
                    exact
                    activeStyle={{ color: "#fff" }}
                  >
                    Fitnessplan
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/FitnessInfo"
                    exact
                    activeStyle={{ color: "#fff" }}
                  >
                    Fitness Info
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/SignUp" exact activeStyle={{ color: "#fff" }}>
                    Sign up
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Login" exact activeStyle={{ color: "#fff" }}>
                    Login
                  </NavLink>
                </li>
                <button id="EN" name="EN" onClick={this.props.handleLanguageEN}>
                  EN
                </button>
                <button id="DE" name="DE" onClick={this.props.handleLanguageDE}>
                  DE
                </button>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Header;
